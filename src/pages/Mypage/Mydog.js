import styles from './Mydog.module.css';
import { Link } from 'react-router-dom';
import { useState } from "react";
import Modal from '../../components/common/Modal';

function Mydog(){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState([]);
    const [modalAfterPath, setModalAfterPath] = useState('/');

    
    const openDetailModal = () => {
        setModalContent(["누누"]);
        setModalAfterPath("/");
        setIsModalOpen(true);
    };

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
                    <button className={styles.btn2} onClick={openDetailModal}>상세보기</button>
                    <button className={styles.btn1}>맞춤사료</button>
                    {isModalOpen && (
                        <Modal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        modalContent={modalContent}
                        modalAfterPath={modalAfterPath}
                        />
                    )}
                </div>
            </div>
        </div>
        </>
    )
}

export default Mydog;