import { Link } from 'react-router-dom';
import styles from './Mypage.module.css';
import { useState } from "react";
import Modal from '../../components/common/Modal';

function Mypage(){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState([]);
    const [modalAfterPath, setModalAfterPath] = useState('/');

    const openDeleteModal = () => {
        setModalContent(["탈퇴하시겠습니까?"]);
        setModalAfterPath("/delete-account");
        setIsModalOpen(true);
    };

    const openChangeModal = () => {
        setModalContent(["변경하시겠습니까?"]);
        setModalAfterPath("/change-settings");
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
                <p className={styles.text4}>회원님께서 가입하신 DogSeek 개인 정보입니다.</p>
                <p className={styles.text5}>필수 회원 정보</p>
                <hr className={styles.line3}/>
            </div>
            <div className={styles.container3}>
                <div className={styles.user1}>
                    <p className={styles.text6}>이름</p>
                    <p className={styles.text6}>이메일</p>
                    <p className={styles.text6}>닉네임</p>
                    <p className={styles.text6}>연락처</p>
                </div>
                <hr className={styles.line2}/>
                <div className={styles.user2}>
                    <p className={styles.text7}>윤수빈</p>
                    <p className={styles.text7}>soobinnunu1101@gmail.com</p>
                    <input type='text' className={styles.inputBox1}></input>
                    <p className={styles.text8}>010-1234-5678</p>
                </div>
            </div>
            <div className={styles.container3}>
                <p className={styles.text9} onClick={openDeleteModal}>탈퇴하기</p>
            </div>
            <div className={styles.container3}>
                <button className={styles.button1} onClick={openChangeModal}>변경</button>
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
        
        </> 
    )
}

export default Mypage;