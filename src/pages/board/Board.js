import { useState, useEffect  } from 'react';
import styles from "./Board.module.css";
import { useNavigate } from 'react-router-dom';
import { GetAPI } from '../../api/RestAPIs';

function Board(){
    const [isOneNoticeOpen, setIsOneNoticeOpen] = useState(false);
    const [isTwoNoiceOpen, setIsTwoNoiceOpen] = useState(false);
    const [isThreeNoiceOpen, setIsThreeNoiceOpen] = useState(false);
    const [boards, setBoards] = useState([]);



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
    const onPostWitingClick = () => {
        navigate("./BoardWiting");
    }

    
const call = async () => {

    const address = '/boards'

    const response = await GetAPI(address);

    const result = await response.boards;  

    return result;
};

    useEffect(() => {
        call().then(res => setBoards(res));
    }, []);
    console.log(boards)





    return(
        <>
        
        <div key={boards.postCode}>
            <div className={styles.board_dogImg }>
                <img src={"/images/board/dogsa.png"}/>
            </div>
            <div className={styles.notice_all}>
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
                <span className={styles.notice_head}>{boards.postTitle}</span>
            </button>
        </div>
            {isOneNoticeOpen &&
            <div className={styles.notice_content}>
                {boards.postContext}
            </div>}
        </div>
            <hr color="D4D4D4"/>
            <div>
                <button className={styles.notice_toggle} onClick={toggleTwoModal}>
                    {isTwoNoiceOpen ? '-' : '+'}
                    <span className={styles.notice_head}>{boards.postTitle}</span>
                </button>
        </div>
            {isTwoNoiceOpen &&
            <div className={styles.notice_content}>
                {boards.postContext}
            </div>}
        <hr color="D4D4D4"/>
        <div>
                <button className={styles.notice_toggle} onClick={toggleThreeModal}>
                    {isThreeNoiceOpen ? '-' : '+'}
                    <span className={styles.notice_head}>{boards.postTitle}</span>
                </button>
        </div>
            {isThreeNoiceOpen &&
            <div className={styles.notice_content}>
                {boards.postContext}
            </div>}
        <hr color="D4D4D4"/>
    </div>


            <div className={styles.board_title}>
                <p>게시판</p>
                <div className={styles.search_box}>
                    <input type="search" className={styles.search_input} name="keyword" placeholder="검색어를 입력하세요"/>
                    <button className={styles.button_writing} onClick={onPostWitingClick}>글쓰기</button>
                    <img className={styles.search_icon} src='/images/board/Search.svg'></img>
                </div> 
                
            </div>

    <div className={styles.boardboxlines}>
        <div className={styles.boardbox}>
            <div className={styles.boardboxTitle}>
                <span className={styles.titletext}>오늘의 댕사이</span>
            </div>
                <p className={styles.boxTitle}>우리 댕댕이는 안물지도 ,안물기는 무슨 오늘도 물림;</p>            
                <div className={styles.nick_interval}>
                    <span className={styles.nick}>{boards.userNick}</span>
                    <span className={styles.post_date}>{boards.postDate}</span>
                </div>
            </div>

    <div className={styles.boardbox}>
            <div className={styles.boardboxTitle}>
                <span className={styles.titletext}>오늘의 댕사이</span>
            </div>
                    <p className={styles.boxTitle}>오늘도 밥 맛있게 먹은 우리 강쥐 귀여워</p>            
                <div className={styles.nick_interval}>
                    <span className={styles.nick}>{boards.userNick}</span>
                    <span className={styles.post_date}>{boards.postDate}</span>
                </div>
            </div>

            <div className={styles.boardbox}>
            <div className={styles.boardboxTitle}>
                <span className={styles.titletext}>오늘의 댕사이</span>
            </div>
                <p className={styles.boxTitle}>맨날 우리 강쥐는 누구쒜요 하면서 쳐다보는데 커욥..</p>            
                <div className={styles.nick_interval}>
                    <span className={styles.nick}>내이름고난했죠</span>
                    <span className={styles.post_date}>2024.06.03</span>
                </div>
            </div>

            <div className={styles.boardbox}>
            <div className={styles.boardboxTitle}>
                <span className={styles.titletext}>오늘의 댕사이</span>
            </div>
                <p className={styles.boxTitle}>오늘 하루종일 뛰다가 지쳤는지 새근새근 잠듦..ㅎㅎ</p>            
                <div className={styles.nick_interval}>
                    <span className={styles.nick}>타로타로</span>
                    <span className={styles.post_date}>2024.06.03</span>
                </div>
            <button onClick={onBoardClick}>
                게시물
            </button>
        </div>
    </div>
</div>
    </>
    );
}

export default Board;