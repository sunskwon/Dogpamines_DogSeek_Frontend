import { useState, useEffect } from 'react';
import styles from "./Board.module.css";
import { useNavigate } from 'react-router-dom';
import { GetAPI } from '../../api/RestAPIs';

function Board() {
    const [isOneNoticeOpen, setIsOneNoticeOpen] = useState(false);
    const [isTwoNoticeOpen, setIsTwoNoticeOpen] = useState(false);
    const [isThreeNoticeOpen, setIsThreeNoticeOpen] = useState(false);
    const [notices, setNotices] = useState([]); // 공지사항 데이터
    const [posts, setPosts] = useState([]); // 게시글 데이터
    
    const [loaded, setLoaded] = useState(false); // 데이터 로드 상태

    const toggleOneModal = () => {
        setIsOneNoticeOpen(prevState => !prevState);
    };
    const toggleTwoModal = () => {
        setIsTwoNoticeOpen(prevState => !prevState);
    };
    const toggleThreeModal = () => {
        setIsThreeNoticeOpen(prevState => !prevState);
    };

    const navigate = useNavigate();

    const onBoardClick = () => {
        navigate("./BoardPost");
    };
    const onPostWritingClick = () => {
        navigate("./BoardWriting");
    };
    const onKakaoClick = () => {
        navigate("./BoardKakao");
    };

    const call = async () => {
        const address = '/boards';
        const response = await GetAPI(address);
        const result = await response.boards;
        return result;
    };

    useEffect(() => {
        if (!loaded) {
            call().then(res => {
                // 분리된 데이터 세팅
                const noticeData = res.filter(post => post.postCategory === '공지');
                const postData = res.filter(post => post.postCategory === '자유');
                setNotices(noticeData);
                setPosts(postData);
                setLoaded(true);
            }).catch(error => {
                console.error('Error fetching data:', error);
                setNotices([]);
                setPosts([]);
            });
        }
    }, [loaded]);

    return (
        <>
            <div>
                <div className={styles.board_dogImg}>
                    <img src={"/images/board/dogsa.png"} alt="Dog" />
                </div>
                <div className={styles.notice_all}>
                    <div>
                        <p className={styles.noticeTitle}>공지사항</p>
                    </div>
                </div>

                <div className={styles.toggle}>
                    <div>
                        <hr color="D4D4D4" />
                        <div>
                            <button className={styles.notice_toggle} onClick={toggleOneModal}>
                                {isOneNoticeOpen ? '-' : '+'}
                                <span className={styles.notice_head}>{notices[0]?.postTitle}</span>
                            </button>
                        </div>
                        {isOneNoticeOpen && notices[0] &&
                            <div className={styles.notice_content}>
                                {notices[0].postContext}
                            </div>}
                    </div>
                    <hr color="D4D4D4" />
                    <div>
                        <button className={styles.notice_toggle} onClick={toggleTwoModal}>
                            {isTwoNoticeOpen ? '-' : '+'}
                            <span className={styles.notice_head}>{notices[1]?.postTitle}</span>
                        </button>
                    </div>
                    {isTwoNoticeOpen && notices[1] &&
                        <div className={styles.notice_content}>
                            {notices[1].postContext}
                        </div>}
                    <hr color="D4D4D4" />
                    <div>
                        <button className={styles.notice_toggle} onClick={toggleThreeModal}>
                            {isThreeNoticeOpen ? '-' : '+'}
                            <span className={styles.notice_head}>{notices[2]?.postTitle}</span>
                        </button>
                    </div>
                    {isThreeNoticeOpen && notices[2] &&
                        <div className={styles.notice_content}>
                            {notices[2].postContext}
                        </div>}
                    <hr color="D4D4D4" />
                </div>

                <div className={styles.board_title}>
                    <p>게시판</p>
                    <div className={styles.search_box}>
                        <input type="search" className={styles.search_input} name="keyword" placeholder="검색어를 입력하세요" />
                        <button className={styles.button_writing} onClick={onPostWritingClick}>글쓰기</button>
                        <img className={styles.search_icon} src='/images/board/Search.svg' alt="Search" />
                    </div>
                </div>

                <div className={styles.boardboxlines}>
                    {posts.slice(0, 5).map((post, index) => (
                        <div className={styles.boardbox} key={index}>
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
                    <button onClick={onBoardClick}>게시물</button>
                    <button onClick={onKakaoClick}>2안</button>
                </div>
            </div>
        </>
    );
}

export default Board;