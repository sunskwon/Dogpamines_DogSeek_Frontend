import { Link } from 'react-router-dom';
import styles from './Mypage.module.css';
import { useState, useEffect } from "react";
import Modal from '../../components/common/Modal';
import { GetAPI, PostAPI } from '../../api/RestAPIs';
import { jwtDecode } from 'jwt-decode';


function Mypage(){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState([]);
    const [modalAfterPath, setModalAfterPath] = useState('/');
    const [isDeleteModal, setIsDeleteModal] = useState(false);

    // 토큰 디코딩
    const decodedToken = jwtDecode(window.localStorage.getItem("accessToken"));

    const userCode = decodedToken.userCode;
    const userNick = decodedToken.userNick;
    const userAuth = decodedToken.userAuth;
    
    const [users, setUsers] = useState([]);
    const [checkNick, setCheckNick] = useState({
        type: '',
        info: '',
        isDuplicate: false
    });

    // 닉네임 정규식(2자 이상 7자 이하/ 한글, 영어, 숫자 사용 가능/ 한글 초성 및 모음은 허가하지 않음)
    const userNickRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,7}$/;
    
    // 비밀번호 정규식(최소 8자 및 최대 12자, 영문자 or 숫자 or 특수문자 2가지 이상 조합)
    const userPassRegex =  /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,12}$/;

    const selectUserDetail = async () => {

        const address = `/mypage?userCode=${userCode}`;

        const response = await GetAPI(address, userCode);

        const result = await response.users;

        return result;
    }

    const checkNickname = async (userNick) => {

        const address = `/mypage/check`;

        const response = await PostAPI(address, userNick);

        const result = await response.checkNick;

        return result;
    }



    useEffect(() => {
        selectUserDetail().then(res =>

            setUsers(res)
        );
    }, []);


    console.log(userCode);
    console.log(userNick);


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
                {users.map (users => (
                    <div className={styles.user2} key={users.userCode}>
                        <p className={styles.text7}>{users.userId}</p>
                        <input type='password' className={styles.inputBox1}></input>
                        <input type='password' className={styles.inputBox2} placeholder='영문, 숫자, 특수문자 중 두 종류 이상  8~12자 이내'></input>
                        <input type='password' className={styles.inputBox2} placeholder='영문, 숫자, 특수문자 중 두 종류 이상  8~12자 이내'></input>
                        <input type='text' className={styles.inputBox3} placeholder={users.userNick} value={users.userNick}></input>
                        {checkNick.isDuplicate && <span >이미 사용 중인 닉네임입니다.</span>}
                        {!checkNick.isDuplicate && <span>사용 가능한 닉네임입니다.</span>}
                        <p className={styles.text8}>{users.userPhone}</p>
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