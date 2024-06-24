import styles from './Mydog.module.css';
import { Link } from 'react-router-dom';
import { useState, useRef } from "react";

function Mydog(){

        const [modalOpen, setModalOpen] = useState(false);
        const modalBackground = useRef();

    return(
        <>
        <div className={styles.container}>
            <div className={styles.container1}>
                <div className={styles.title}>
                    <span className={styles.text1}>가입정보</span>
                    <Link to={'/mypage'} className={styles.text2}>My Page</Link>
                    <Link to={'/mydog'} className={styles.text3}>My Dog</Link>
                </div>
            </div>
            <div className={styles.container2}>
                <hr className={styles.line1}/>
                <span className={styles.text5}>반려견 정보</span>
                <Link to={'/curation'} className={styles.text4}>+ 반려견 추가 등록</Link>
                <hr className={styles.line3}/>
            </div>
            <div className={styles.container2}>
                <div className={styles.spanBox}>
                    <span className={styles.span1}>이름</span>
                    <span className={styles.span1}>작성일</span>
                    <span className={styles.span1}>상세보기</span>
                    <span className={styles.span1}>맞춤사료</span>
                </div>
                    <hr className={styles.line4}/>
                <div className={styles.resultBox}>
                    <span className={styles.span2}>누누</span>
                    <span className={styles.span3}>2024.06.19</span>
                    <div className={styles.btnWrapper}>
                        <button className={styles.btn2} onClick={() => setModalOpen(true)}>상세보기</button>
                    </div>
                        {
                            modalOpen &&
                                <div className={styles.modalContainer} ref={modalBackground} onClick={e => {
                                    if (e.target === modalBackground.current) {
                                        setModalOpen(false);
                                    }
                                }}>
                                    <div className={styles.modalContent}>
                                        <div className={styles.modalTextContainer}>
                                            <p className={styles.modalText1}>회원님 반려견 누누의 정보입니다.</p>
                                            <hr/>
                                        </div>
                                        <div className={styles.modalTextContainer2}>
                                            <div className={styles.spanBox1}>
                                                <p className={styles.text6}>이름</p>
                                                <p className={styles.text6}>견종</p>
                                                <p className={styles.text6}>나이</p>
                                                <p className={styles.text6}>체형</p>
                                                <p className={styles.text6}>중성화 여부</p>
                                            </div>
                                            <hr className={styles.modalLine1}/>
                                            <div className={styles.spanBox1}>
                                                <p className={styles.text7}>몸무게</p>
                                                <p className={styles.text7}>질병 여부</p>
                                                <p className={styles.text7}>알러지 여부</p>
                                                <p className={styles.text7}>선호 식재료</p>
                                                <p className={styles.text7}>선호 조리방식</p>
                                            </div>
                                        </div>
                                        <button className={styles.modalCloseBtn} onClick={() => setModalOpen(false)}>닫기</button>
                                    </div>
                            </div>}
                    <button className={styles.btn1}>맞춤사료</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Mydog;