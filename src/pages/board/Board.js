import React, { useState, useEffect } from 'react';
import styles from "./Board.module.css";
import { useNavigate } from 'react-router-dom';
import { GetAPI } from '../../api/RestAPIs';
import { jwtDecode } from 'jwt-decode';
import Paginations from "react-js-pagination";

function Board() {
    const decodedToken = jwtDecode(window.localStorage.getItem("accessToken"));
    const userCode = decodedToken.userCode;
    const userNick = decodedToken.userNick;
    const userAuth = decodedToken.userAuth;

    const [isOneNoticeOpen, setIsOneNoticeOpen] = useState(false);
    const [isTwoNoticeOpen, setIsTwoNoticeOpen] = useState(false);
    const [isThreeNoticeOpen, setIsThreeNoticeOpen] = useState(false);

    const [notices, setNotices] = useState([]);
    const [noticePage, setNoticePage] = useState(1);

    const [posts, setPosts] = useState([]);
    const [postPage, setPostPage] = useState(1);
    const [loaded, setLoaded] = useState(false);

    const [search, setSearch] = useState('');

    const toggleOneModal = () => setIsOneNoticeOpen(prevState => !prevState);
    const toggleTwoModal = () => setIsTwoNoticeOpen(prevState => !prevState);
    const toggleThreeModal = () => setIsThreeNoticeOpen(prevState => !prevState);

    const navigate = useNavigate();

    const onBoardClick = async (code) => {
        try {
            navigate(`/postdetail`, {
                state: {
                    postCode: code
                }
            });
            window.scrollTo(0, 0);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const onPostWritingClick = () => {
        navigate("./boardwriting");
        window.scrollTo(0, 0);
    };

    const onKakaoClick = () => {
        navigate("./boardkakao");
    };

    const fetchBoards = async () => {
        try {
            const address = `/boards`;
            const response = await GetAPI(address);
            const result = response.boards;
            return result;
        } catch (error) {
            console.error('Error fetching boards:', error);
            throw error;
        }
    };

    const searchFreeBoards = async () => {
        try {
            const searchAddress = `/boards/search?type=${search}`;
            const response = await GetAPI(searchAddress);
            const searchResults = response.boards;
            setPosts(searchResults);
        } catch (error) {
            console.error('Error searching free boards:', error);
            setPosts([]);
        }
    };

    const onClickPostSearch = () => {
        searchFreeBoards();
    };

    const onSubmitPostSearch = (e) => {
        if (e.key === "Enter") {
            searchFreeBoards();
        }
    };

    const searchPostText = (e) => setSearch(e.target.value);

    const ITEMS_PER_PAGE = 3;
    const ITEMS_PER_PAGE2 = 4;

    useEffect(() => {
        if (!loaded) {
            fetchBoards().then(res => {
                const noticeData = res.filter(post => post.postCategory === '공지')
                    .sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
                const freePostData = res.filter(post => post.postCategory === '자유')
                    .sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
                setNotices(noticeData);
                setPosts(freePostData);
                setLoaded(true);
            }).catch(error => {
                console.error('Error fetching data:', error);
                setNotices([]);
                setPosts([]);
            });
        }
    }, [loaded]);

    return (
        <div className={styles.board_container}>
            <div className={styles.board_dogImg}>
                <img src={"/images/board/dogsa.png"} alt="Dog" />
            </div>
            <div className={styles.notice_all}>
                <div>
                    <p className={styles.noticeTitle}>공지사항</p>
                </div>
            </div>

            <div className={styles.toggle}>
                {notices.length > 0 && notices.slice((noticePage - 1) * ITEMS_PER_PAGE, noticePage * ITEMS_PER_PAGE).map((notice, index) => (
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
                <p>게시판</p>
                <div className={styles.search_box}>
                    <div>
                        <input type="text" className={styles.search_input} name="search" onChange={searchPostText} onKeyPress={onSubmitPostSearch} placeholder="검색어를 입력하세요" />
                    </div>
                    <button className={styles.button_writing} onClick={onPostWritingClick}>글쓰기</button>
                    <img onClick={onClickPostSearch} className={styles.search_icon} src='/images/board/Search.svg' alt="Search Icon" />
                </div>
            </div>

            <div className={styles.boardboxlines}>
                {posts.length === 0 ? (
                    <div style={{display:"flex", flexDirection:"column", gap:"20px", margin:"0 auto", marginTop:"150px", marginBottom:"50px"}}>
                    <img src="/images/product/EmptyDogBowl.png" style={{width:"100px", margin:"0 auto"}}/>
                    <p style={{margin:"0", textAlign:"center", fontWeight:"bold"}}>적합한 게시물 존재하지 않습니다!</p>
                    <p style={{margin:"0", textAlign:"center", fontWeight:"bold"}}>다시 시도해주세요!</p>
                </div>
                ) : (
                    posts.slice((postPage - 1) * ITEMS_PER_PAGE2, postPage * ITEMS_PER_PAGE2).map(post => (
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
                )))}
            
            </div>

            <Paginations
                activePage={postPage}
                itemsCountPerPage={ITEMS_PER_PAGE2}
                totalItemsCount={posts.length}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={page => setPostPage(page)}
            />
        </div>
    );
}

export default Board;
