import { Link } from 'react-router-dom';
import styles from './Mypage.module.css';
import { useState, useEffect } from "react";
import Modal from '../../components/common/Modal';
import { GetAPI } from '../../api/RestAPIs';

function Mypage(){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState([]);
    const [modalAfterPath, setModalAfterPath] = useState('/');
    const [isDeleteModal, setIsDeleteModal] = useState(false);

    const userCode = 1;
    const [users, setUsers] = useState([]);

    const selectUserDetail = async () => {

        const address = `/mypage?userCode=${userCode}`;

        const response = await GetAPI(address, userCode);

        const result = await response.users;

        return result;
    }

    useEffect(() => {
        selectUserDetail().then(res =>

            setUsers(res)
        );
    }, []);
    

    const openDeleteModal = () => {
        setModalContent(["탈퇴하시겠습니까?"]);
        setModalAfterPath("/delete-account");
        setIsDeleteModal(true);
        setIsModalOpen(true);
    };

    const openChangeModal = () => {
        setModalContent(["정보를 변경하시겠습니까?"]);
        setModalAfterPath("/change-settings");
        setIsDeleteModal(false);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        console.log("닫기");
        setIsModalOpen(false);
    };

    const handleConfirm = () => {
        console.log("변경");
    };

    const handleDelete = () => {
        console.log("탈퇴");
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
                <p className={styles.text4} name='userCode'>회원님께서 가입하신 DogSeek 개인 정보입니다.</p>
                <p className={styles.text5}>필수 회원 정보</p>
                <hr className={styles.line3}/>
            </div>
            <div className={styles.container3}>
                <div className={styles.user1}>
                    <p className={styles.text6}>아이디</p>
                    <p className={styles.text6}>비밀번호</p>
                    <p className={styles.text6}>새 비밀번호</p>
                    <p className={styles.text6}>새 비밀번호 확인</p>
                    <p className={styles.text6}>닉네임</p>
                    <p className={styles.text6}>연락처</p>
                </div>
                <hr className={styles.line2}/>
                {users.map (user => (
                    <div className={styles.user2} key={user.userCode}>
                        <p className={styles.text7}>{user.userId}</p>
                        <input type='password' className={styles.inputBox1}></input>
                        <input type='password' className={styles.inputBox2} placeholder='영문, 숫자, 특수문자 중 두 종류 이상  8~12자 이내'></input>
                        <input type='password' className={styles.inputBox2} placeholder='영문, 숫자, 특수문자 중 두 종류 이상  8~12자 이내'></input>
                        <input type='text' className={styles.inputBox3} placeholder={user.userNick}></input>
                        <p className={styles.text8}>{user.userPhone}</p>
                    </div>
                ))}
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
                            onConfirm={isDeleteModal ? handleDelete : handleConfirm}
                            onCancel={handleCancel}
                            showConfirmButton={true}
                            showCancelButton={true}
                            confirmButtonText={isDeleteModal ? "탈퇴" : "변경"}
                            cancelButtonText="닫기"
                        />
                    )}
            </div>
        </div>
        
        </> 
    )
}

export default Mypage;