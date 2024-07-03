import React, { useState, useEffect, useRef } from 'react';
import styles from './Board.module.css';
import { useNavigate } from 'react-router-dom';
import { GetAPI, PostAPI } from '../../api/RestAPIs';
import { jwtDecode } from 'jwt-decode';

function Board() {
    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate()}`;
    const currentTime = `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;

    const [inputText, setInputText] = useState("");
    const activeButton = () => {
        alert(`${inputText}입력 완료`);
    }
    const activeEnter = (e) => {
        if(e.key === "Enter") {
            activeButton();
        }
    }
    const [isOneNoticeOpen, setIsOneNoticeOpen] = useState(false); 
    const [isTwoNoticeOpen, setIsTwoNoticeOpen] = useState(false);
    const [isThreeNoticeOpen, setIsThreeNoticeOpen] = useState(false);
    const [notices, setNotices] = useState([]);
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [loaded, setLoaded] = useState(false); 

    const messagesEndRef = useRef(null);

    const decodedToken = jwtDecode(window.localStorage.getItem("accessToken"));

    const userCode = decodedToken.userCode;
    const userNick = decodedToken.userNick;
    const userAuth = decodedToken.userAuth;


    const toggleOneModal = () => setIsOneNoticeOpen(prevState => !prevState);
    const toggleTwoModal = () => setIsTwoNoticeOpen(prevState => !prevState);
    const toggleThreeModal = () => setIsThreeNoticeOpen(prevState => !prevState);

    const navigate = useNavigate();
   // const onPostWritingClick = () => navigate("./BoardWriting");

    const call = async () => {
        const address = '/boards';
        const response = await GetAPI(address);
        const result = await response.boards;
        return result;
    };

    const inhandler = async () => {
        const address = '/boards';
        const newPostData = {
            postContext: newPost,
            postCategory: "자유",
            postTime: currentTime,
            postStatus: 'Y',
            userCode: userCode, // 유저 코드 설정
            userNick: userNick // 유저 닉네임 설정
        };
        try{
            const response = await PostAPI(address, newPostData); // post 요청 보냄
            if(response) {
            setPosts([...posts, newPostData]); // 성공 시 클라이언트 측 상태 업로드
            setNewPost(''); // 입력필드 초기화
            scrollToBottom(); // 스크롤 맨 아래 이동
        }
    } catch (error) {
        console.error('Error posting new data', error);
    }
}

    useEffect(() => {
        if (!loaded) {
            call().then(res => {
                const noticeData = res.filter(post => post.postCategory === '공지');
                const postData = res.filter(post => post.postCategory === '자유');
                setNotices(noticeData);
                setPosts(postData);
                setLoaded(true);
                scrollToBottom();
            }).catch(error => {
                console.error('Error fetching data:', error);
                setNotices([]);
                setPosts([]);
            });
        }
    }, [loaded]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

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
                <p>댕사이</p>
                <div className={styles.search_box}>
                </div>
            </div>
        
            <div className={styles.container}>
                <div className={styles.chat_wrap}>
                    {posts.map((post, index) => (
                        <div key={index} className={`${styles.chat_message} ${post.userNick === userNick ? styles.my_message : styles.other_message}`}>
                            <span className={styles.talk_nick}>{post.userNick}</span>
                            <div className={styles.chat}>
                                <div className={styles.textbox}>
                                    {post.postContext}
                                </div>
                                <span className={styles.talk_date}>{post.postDate} {post.postTime}</span>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className={styles.comment_wrap}>
                <input 
                    className={styles.comment_box} 
                    maxLength='100' 
                    placeholder='댓글을 입력해주세요 최대 100자까지 허용..'
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    onKeyDown={(e) => activeEnter(e)}
                />
                <button className={styles.comment_button}  onClick={inhandler}>등록</button>
            </div>
        </div>
    );
}

export default Board;
