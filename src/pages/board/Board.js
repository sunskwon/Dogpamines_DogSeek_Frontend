import { useState, useEffect } from 'react';
import styles from "./Board.module.css";
import { useNavigate } from 'react-router-dom';
import { GetAPI } from '../../api/RestAPIs';
import { jwtDecode } from 'jwt-decode';

function Board() {
    // 공지 토글 on
    const [isOneNoticeOpen, setIsOneNoticeOpen] = useState(false);
    const [isTwoNoticeOpen, setIsTwoNoticeOpen] = useState(false);
    const [isThreeNoticeOpen, setIsThreeNoticeOpen] = useState(false);

    // 공지 데이터
    const [notices, setNotices] = useState([]);
    // 자유 데이터
    const [posts, setPosts] = useState([]);
    
    const [loaded, setLoaded] = useState(false); // 데이터 로드 상태

    // 로그인토큰
    const decodedToken = jwtDecode(window.localStorage.getItem("accessToken"));
    const userCode = decodedToken.userCode;
    const userNick = decodedToken.userNick;
    const userAuth = decodedToken.userAuth;

    // 공지사항 토글
    const toggleOneModal = () => setIsOneNoticeOpen(prevState => !prevState);
    const toggleTwoModal = () => setIsTwoNoticeOpen(prevState => !prevState);
    const toggleThreeModal = () => setIsThreeNoticeOpen(prevState => !prevState);

    // navigate
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

    // GetAPI
    const call = async () => {
        const address = '/boards';
        const response = await GetAPI(address);
        const result = await response.boards;
        return result;
    };

    useEffect(() => {
        if (!loaded) {
            call().then(res => {
                const noticeData = res.filter(post => post.postCategory === '공지')
                    .sort((a, b) => new Date(b.postDate) - new Date(a.postDate))
                    .slice(0, 3); // 최신순으로 정렬 후 최대 3개 선택
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
            {notices.map((notices, index) => (
                <div key={index}>
                    <hr color="D4D4D4"/>
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
                        <span className={styles.notice_head}>{notices.postTitle}</span>
                    </button>
                </div>
                {index === 0 && isOneNoticeOpen && (
                    <div className={styles.notice_content}>{notices.postContext}</div>
                )}
                {index === 1 && isTwoNoticeOpen && (
                <div className={styles.notice_content}>{notices.postContext}</div>
                )}
                {index === 2 && isThreeNoticeOpen && (
                <div className={styles.notice_content}>{notices.postContext}</div>
                )}
            </div>
            ))}
        <hr color="D4D4D4"/>
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
    );
}

export default Board;