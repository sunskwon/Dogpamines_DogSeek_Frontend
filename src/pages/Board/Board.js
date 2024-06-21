import { useState  } from 'react';
import styles from "./board.module.css";
import { useNavigate } from 'react-router-dom';

function Board(){

    const [isOneNoticeOpen, setIsOneNoticeOpen] = useState(false);
    const [isTwoNoiceOpen, setIsTwoNoiceOpen] = useState(false);
    const [isThreeNoiceOpen, setIsThreeNoiceOpen] = useState(false);

    const toggleOneModal = () => {
        setIsOneNoticeOpen(prevState => !prevState);
    };
    const toggleTwoModal = () => {
        setIsTwoNoiceOpen(prevState => !prevState);
    };
    const toggleThreeModal = () => {
        setIsThreeNoiceOpen(prevState => !prevState);
    };

    const navigate = useNavigate();

    const onBoardClick = () => {
        navigate("./BoardPost");
    }



    return(
        <div className={styles.boardPage}>
            <div className={styles.dogSaImg}>
                <img src={"/images/dogsa.png"}/>
            </div>
            <div className={styles.notices}>
            <div>
                <p className={styles.noticeTitle}>공지사항</p>
            </div>
        </div>

    <div className={styles.toggle}>
        <div>
        <hr color="D4D4D4"/>
            <div>
                <button className={styles.notice_toggle} onClick={toggleOneModal}>
                {isOneNoticeOpen ? '-' : '+'}
                </button>
            <span className={styles.notice_head}>공지 제목</span>
        </div>
            {isOneNoticeOpen &&
            <div className={styles.notice_content}>
                공지 내용입니다.
            </div>}
        </div>
            <hr color="D4D4D4"/>
            <div>
                <button className={styles.notice_toggle} onClick={toggleTwoModal}>
                    {isTwoNoiceOpen ? '-' : '+'}
                </button>
            <span className={styles.notice_head}>두 번째 공지입니다.</span>
        </div>
            {isTwoNoiceOpen &&
            <div className={styles.notice_content}>
                두 번째 공지는 직접확인해보시기 바랍니다.
            </div>}
        <hr color="D4D4D4"/>
        <div>
                <button className={styles.notice_toggle} onClick={toggleThreeModal}>
                    {isThreeNoiceOpen ? '-' : '+'}
                </button>
            <span className={styles.notice_head}>세 번째 공지입니다.</span>
        </div>
            {isThreeNoiceOpen &&
            <div className={styles.notice_content}>
                첫 번째 공지는 그냥 공지가 아닙니다 알아 두셔야하는 공지입니다.
            </div>}
        <hr color="D4D4D4"/>
    </div>




        <div className={styles.boardboxlines}>
            <p className={styles.boardTitle}>게시판</p>

        <div className={styles.boardbox}>
            <ul className={styles.boardboxTitle}>
                <p className={styles.titletext}>오늘의 댕사이</p>
            </ul>
                <p className={styles.boxTitle}>우리 댕댕이는 안물지도 ,안물기는 무슨 오늘도 물림;</p>            
                <p className={styles.nick}>포도맛폴라포</p>
            </div>

            <div className={styles.boardbox}>
            <ul className={styles.boardboxTitle}>
                    <p className={styles.titletext}>오늘의 댕사이</p>
                </ul>
                <p className={styles.boxTitle}>오늘도 밥 맛있게 먹은 우리 강쥐 귀여워</p>            
                <p className={styles.nick}>오동통댕댕묘</p>
            </div>

            <div className={styles.boardbox}>
            <ul className={styles.boardboxTitle}>
                    <p className={styles.titletext}>오늘의 댕사이</p>
                </ul>
                <p className={styles.boxTitle}>맨날 우리 강쥐는 누구쒜요 하면서 쳐다보는데 커욥..</p>            
                <p className={styles.nick}>내이름은고난했죠</p>
            </div>

            <div className={styles.boardbox}>
                <ul className={styles.boardboxTitle}>
                    <p className={styles.titletext}>오늘의 댕사이</p>
                </ul>
                <p className={styles.boxTitle}>오늘 하루종일 뛰다가 지쳤는지 새근새근 잠듦..ㅎㅎ</p>            
                <p className={styles.nick}>타로타로</p>
                <button onClick={onBoardClick}>
                    게시물
                </button>
            </div>
        </div>

                    
        </div>
    );
}

export default Board;