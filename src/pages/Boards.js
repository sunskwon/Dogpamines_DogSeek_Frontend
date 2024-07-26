import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { GetAPINotToken } from '../api/RestAPIs';

import Paginations from "react-js-pagination";

import BoardList from '../components/boards/BoardList';

import styles from "./board/Board.module.css";

function Boards() {

    // 공지 토글 on
    const [isOneNoticeOpen, setIsOneNoticeOpen] = useState(false);
    const [isTwoNoticeOpen, setIsTwoNoticeOpen] = useState(false);
    const [isThreeNoticeOpen, setIsThreeNoticeOpen] = useState(false);

    // 공지 및 검색 데이터
    const [notices, setNotices] = useState([]);
    const [noticePage, setNoticePage] = useState(1);

    // 자유 및 검색 데이터
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [postPage, setPostPage] = useState(1);
    const [loaded, setLoaded] = useState(false); // 데이터 로드 상태

    // 검색
    const [search, setSearch] = useState('');

    // 공지사항 토글
    const toggleOneModal = () => setIsOneNoticeOpen(prevState => !prevState);
    const toggleTwoModal = () => setIsTwoNoticeOpen(prevState => !prevState);
    const toggleThreeModal = () => setIsThreeNoticeOpen(prevState => !prevState);

    // navigate
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);

    const onBoardClick = async (code) => {
        try {
            const token = window.localStorage.getItem("accessToken")
            if (token != null) {
                navigate(`/post/${code}`, {
                    state: {
                        postCode: code
                    }
                });
                window.scrollTo(0, 0);
            } else {
                setModalOpen(true);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    if (modalOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    };

    const onPostWritingClick = () => {
        navigate("/board/add");
        window.scrollTo(0, 0);
    };

    // GetAPI
    const call = async () => {
        const address = '/boards';
        const response = await GetAPINotToken(address);
        const result = await response.boards;
        return result;
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!loaded) {
            call().then(res => {
                const noticeData = res.filter(post => post.postCategory === '공지')
                    .sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
                const postData = res.filter(post => post.postCategory === '자유')
                    .sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
                setNotices(noticeData);
                setPosts(postData);
                setFilteredPosts(postData); // 초기에 전체 데이터를 filteredPosts에 저장
                setLoaded(true);
            }).catch(error => {
                console.error('Error fetching data:', error);
                setNotices([]);
                setPosts([]);
            });
        }
    }, [loaded]);

    const searchPosts = () => {
        const filtered = posts.filter(post => post.postTitle.includes(search));
        setFilteredPosts(filtered);
    };

    const handleSearchInputChange = (e) => {
        setSearch(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchPosts();
        }
    };

    // 한페이지에 몇개의 게시물
    const ITEMS_PER_PAGE = 3;
    const ITEMS_PER_PAGE2 = 5;

    return (
        <>
            <BoardList />
            <div className={styles.board_container}>
                <div className={styles.notice_all}>
                    <div>
                        <p className={styles.noticeTitle}>Notices</p>
                    </div>
                </div>

                <div className={styles.toggle}>
                    {
                        modalOpen &&
                        <div className={styles.modalContainer}>
                            <div className={styles.modalContent}>
                                <div className={styles.allBox}>
                                    <div style={{ marginTop: "80px" }}>
                                        <p style={{ margin: "0", color: "#005600", fontSize: "16px", fontWeight: "600" }}>로그인이 필요한 서비스입니다</p>
                                        <p style={{ margin: "0", color: "#005600", fontSize: "16px", fontWeight: "600" }}>로그인 페이지로 이동하시겠습니까?</p>
                                    </div>
                                    <div style={{ display: "flex", width: "270px", gap: "30px", margin: "0 auto", marginTop: "60px" }}>
                                        <button className={styles.modalCancelButton} onClick={() => setModalOpen(false)}>취소</button>
                                        <button className={styles.modalCheckButton} onClick={() => navigate("/login")}>이동</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {notices.slice((noticePage - 1) * ITEMS_PER_PAGE, noticePage * ITEMS_PER_PAGE).map((notice, index) => (
                        <div key={index}>
                            <hr color="D4D4D4" />
                            <div>
                                <button
                                    className={styles.notice_toggle}
                                    onClick={() => {
                                        if (index === 0) toggleOneModal();
                                        if (index === 1) toggleTwoModal();
                                        if (index === 2) toggleThreeModal();
                                    }}>
                                    {index === 0 && (isOneNoticeOpen ? '-' : '+')}
                                    {index === 1 && (isTwoNoticeOpen ? '-' : '+')}
                                    {index === 2 && (isThreeNoticeOpen ? '-' : '+')}
                                    <span className={styles.notice_head}>{notice.postTitle}</span>
                                </button>
                            </div>
                            {index === 0 && isOneNoticeOpen && (
                                <div className={styles.notice_content}>{notice.postContext}</div>
                            )}
                            {index === 1 && isTwoNoticeOpen && (
                                <div className={styles.notice_content}>{notice.postContext}</div>
                            )}
                            {index === 2 && isThreeNoticeOpen && (
                                <div className={styles.notice_content}>{notice.postContext}</div>
                            )}
                        </div>
                    ))}
                    <hr color="D4D4D4" />
                    {/* 공지사항 페이징 */}
                    <Paginations
                        activePage={noticePage}
                        itemsCountPerPage={ITEMS_PER_PAGE}
                        totalItemsCount={notices.length}
                        pageRangeDisplayed={5}
                        prevPageText={"‹"}
                        nextPageText={"›"}
                        onChange={page => setNoticePage(page)}
                    />
                </div>

                <div className={styles.board_title}>
                    <p>Posts</p>
                    <div className={styles.search_box}>
                        <input
                            type="text"
                            className={styles.search_input}
                            name="search"
                            value={search}
                            onChange={handleSearchInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder="검색어를 입력하세요"
                        />
                        <button className={styles.button_writing} onClick={onPostWritingClick}>글쓰기</button>
                        <img onClick={searchPosts} className={styles.search_icon} src='/images/product/Search.png' alt="Search Icon" />
                    </div>
                </div>

                <div className={styles.boardboxlines}>
                    {filteredPosts.slice((postPage - 1) * ITEMS_PER_PAGE2, postPage * ITEMS_PER_PAGE2).map(post => (
                        <div className={styles.boardbox} key={post.postCode} onClick={() => onBoardClick(post.postCode)}>
                            <div className={styles.boardboxTitle}>
                                <span className={styles.titletext}>{post.postTitle}</span>
                            </div>
                            <p className={styles.boxTitle}>{post.postContext}</p>
                            <div className={styles.nick_interval}>
                                <span className={styles.nick}>{post.userNick}</span>
                                <span className={styles.post_date}>{post.postDate}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 게시물 페이징 */}
                <Paginations
                    activePage={postPage}
                    itemsCountPerPage={ITEMS_PER_PAGE2}
                    totalItemsCount={filteredPosts.length}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={page => setPostPage(page)}
                />
            </div>
        </>
    );
}

export default Boards;