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
                    <p>댕사이</p>
                    <div className={styles.search_box}>
                    </div>
                </div>
<div>
    <div className={styles.wrap}>
        <div>
            <span className={styles.talk_nick}>고무맛맛탕</span>
            <div className={`${styles.chat} ${styles.ch1}`}>
                <div className={styles.textbox}>
                <span className={styles.textboxBefore}></span>
                    안녕하세요 감사해요 잘있어요 다시 만나요
                    어디로 가든지 할 수 가없 추ㅕㅜ요~~
                    이쪽에서 저쪽에서 뭐든지같에 컬컬컬 콸콸콸ㅁㅁㅁㅁㅁㅁ
                    각돌이가 오늘 산책 다녀와서도 지치지 않고 신나가지고 
                    방방 뛰어 댕기다가 2시간만에 기절했네요 애가 
                    에너지가 왜이리 좋은지 감당하기 힘들정도로 뛰어다닙니다...
                    장난은 얌전히 치는데 그냥 뛰어노는게 즐거운가봐요 즐거운우리 각돌이 보기만 해도 귀엽네요 계속 그렇게만 자라줘!
                </div>
            <span className={styles.talk_date}>2024.02.06</span>
        </div>
        
        <div>
            <div className={`${styles.chat} ${styles.ch2}`} >
            <div className={styles.textbox}>
                <span className={styles.textboxBefore}>안녕하시고 반갑습니다 이번에 새로 개설하게된 댕사이 댕사료 큐레이션을 만들게된 사이트장 파트라dog 이라고 합니다. </span>
            </div>
            </div>
        </div>

    </div>
    </div>
        <div className={styles.comment_wrap}>
            <input className={styles.comment_box} maxLength='100px' placeholder='댓글을 입력해주세요 최대 100자까지 허용..'></input>
            <button className={styles.comment_button}>등록</button>
        </div>
</div>
        </div>
    );
}

export default Board;