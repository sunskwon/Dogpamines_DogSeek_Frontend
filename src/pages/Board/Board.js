import { useState  } from 'react';
import styles from "./board.module.css";
import { useNavigate } from 'react-router-dom';

function Board(){
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ modalBackground, setModalBackground] = useState();
    const navigate = useNavigate();


    const items = document.querySelectorAll('.question');
    const onBoardClick = () => {
        navigate("./post");
    }

    // 이름의 함수를 정의(공지사항 토글)
    function OCNotice() {
        const noticeId = this.id.replace();

        // 스타일이 none인지 확인 이면 요소가 현재 숨겨져 있음
        if(document.getElementById('noticeId').style.display === 'block') {
            // 
            document.getElementById('noticeId').style.display = 'none';
            document.getElementById(this.id + '-toggle').textContent = '+';
        } else {
            document.getElementById('noticeId').style.display = 'block';
            document.getElementById(this.id + '-toggle').textContent = '-';
        }
    }

    items.forEach(item => item.addEventListener('click', OCNotice));


    return(
        <div className={styles.boardPage}>
            <div className={styles.dogSaImg}>
                <img src={"/images/dogsa.png"}/>
            </div>



        <div className={styles.notices}>
            <p className={styles.noticeTitle}>공지사항</p>
            <ul>
                <span></span>
            </ul>
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
                    post
                </button>
            </div>
        </div>

                    
        </div>
    );
}

export default Board;