import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Mypage.module.css';
import { useState, useEffect, useRef } from "react";
import { DeleteAPI, GetAPI, PostAPI, PutAPI } from '../../api/RestAPIs';
import { jwtDecode } from 'jwt-decode';


function Mypage(){

    const navigate = useNavigate();

    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalBackground = useRef();

    // 토큰 디코딩
    const decodedToken = jwtDecode(window.localStorage.getItem("accessToken"));

    const userCode = decodedToken.userCode;
    const userNick = decodedToken.userNick;
    const userAuth = decodedToken.userAuth;
    
    const [users, setUsers] = useState([]);
    const [userInfo, setUserInfo] = useState({
        userCode: '',
        userPass: '',
        newUserPass: '',
        confirmNewUserPass: '',
        userNick: ''
    });
    
    const [checkNick, setCheckNick] = useState({
        type: '',
        info: ''
    });

    const [nickAvailability, setNickAvailability] = useState({
        available: true,
        message: ''
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

        try {
            const address = `/mypage/check`;
            const response = await PostAPI(address, { type: 'nick', info: userNick });
            
            const result = await response.json();
            
            return result;
        } catch (error) {
            console.error("Error checking nickname:", error);
            throw error;
        }
    }

    useEffect(() => {
        selectUserDetail().then(res =>setUsers(res));
    }, []);

    useEffect(() => {
        setUserInfo({...userInfo, userCode: userCode, userNick:userInfo.userNick})
    },[userInfo.userCode]);

    useEffect(() => {
        if (userInfo.userNick && userNickRegex.test(userInfo.userNick)) {
            const checkNickAvailability = async () => {
                try {
                    const result = await checkNickname(userInfo.userNick);
                    if (result === false) {
                        setNickAvailability({
                            available: false,
                            message: '이미 사용 중인 닉네임입니다.'
                        });
                    } else {
                        setNickAvailability({
                            available: true,
                            message: '사용 가능한 닉네임입니다.'
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            checkNickAvailability();
        } else {
            setNickAvailability({
                available: true,
                message: '사용 가능한 닉네임입니다.'
            });
        }
    }, [userInfo.userNick]);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const handleCancel = (e) => {
        setIsModalOpen(false);
    };

    const onNickChange = (e) => {
        setUserInfo({...userInfo, userNick: e.target.value});
        setCheckNick({...checkNick, type: 'nick', info: e.target.value});
        console.log(userInfo);
    };

    const handleConfirmNick = async () => {
        if(userNickRegex.test(userInfo.userNick)) {
            try{
                const result = await checkNickname(userInfo.userNick);
                console.log(result);

                if(result === false) {
                    alert("이미 사용 중인 닉네임입니다.");
                    return;
                }
                const addressUpdate = `/mypage`;
                const response = await PutAPI(addressUpdate, {
                    userCode,
                    userNick: userInfo.userNick
                });
                console.log(response);
                alert("닉네임 변경 완료하였습니다.");
                setIsModalOpen(false);
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("닉네임 형식에 맞게 작성해주세요.");
        }
    };

    const handleConfirm = async () => {
        console.log("변경");
        if(userInfo.newUserPass !== userInfo.confirmNewUserPass) {
            alert("새 비밀번호와 일치하지 않습니다.");
            return;
        } 
        if(!userPassRegex.test(userInfo.newUserPass)) {
            alert("비밀번호 형식이 올바르지 않습니다.");
            return;
        }
        try {
            const address = `/mypage`;
            const response = await PutAPI(address, {
                userCode,
                userPass: userInfo.userPass,
                userNick: userInfo.userNick
            });
            console.log(response);
            setIsModalOpen(false);
        } catch(error) {
            console.log(error);
            alert("정보 변경 실패");
        }
    };

    const checkPasswordMatch = () => {
        if (userInfo.userPass === '비밀번호') {
            alert('비밀번호가 일치합니다.');
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    };

    const handleDelete = async () => {
        console.log("탈퇴");

        const address = `/mypage`;
        
        const response = await DeleteAPI(address, userInfo);

        alert("회원 탈퇴가 완료되었습니다.");
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('userCode');
        window.localStorage.removeItem('userNick');
        window.localStorage.removeItem('userAuth');
        setIsLoggedIn(false);
        navigate("/", {
            state: { Location: response.headers.get('Location')}
        });
    };

    const handleInputChange= (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
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
                        <input type='password' className={styles.inputBox1} name='userPass' onChange={handleInputChange} value={userInfo.userPass}></input>
                        <input type='password' className={styles.inputBox2} placeholder='영문, 숫자, 특수문자 중 두 종류 이상  8~12자 이내' name='newUserPass' onChange={handleInputChange} value={userInfo.newUserPass}></input>
                        <input type='password' className={styles.inputBox2} placeholder='영문, 숫자, 특수문자 중 두 종류 이상  8~12자 이내' name='confirmNewUserPass' onChange={handleInputChange} value={userInfo.confirmNewUserPass}></input>
                        <div className={styles.user3}>
                            <input type='text' className={styles.inputBox3} placeholder={user.userNick} name='userNick' value={userInfo.userNick} onChange={onNickChange}/>
                            {nickAvailability.message && (
                                    <span className={`${styles.errorText} ${nickAvailability.available ? styles.green : styles.red}`}>
                                    {nickAvailability.message}
                                </span>
                                )}
                            <button type='submit' className={styles.btn2} onClick={handleConfirmNick}>변경</button>
                        </div>
                        <p className={styles.text8}>{user.userPhone}</p>
                    </div>
                ))}
            </div>
            <div className={styles.container3}>
                <p className={styles.text9} onClick={() => openModal()}>탈퇴하기</p>
            </div>
            <div className={styles.container3}>
                <button className={styles.button1} onClick={handleConfirm}>변경</button>
            </div>
        </div>
        
        {/* Delete Modal */}
            {
                isModalOpen && 
                <div className={styles.modalContainer} ref={modalBackground} onClick={e => {
                    if (e.target === modalBackground.current) {
                        setIsModalOpen(false)
                    }
                }}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalTextContainer}>
                            <div className={styles.modal_content}>
                                <p>DogSeek을</p>
                                <p>탈퇴하시겠습니까?</p>
                            </div>
                            <div className={styles.btnContainer}>
                                <button className={styles.modalCloseBtn} onClick={handleCancel}>닫기</button>
                                <button className={styles.modalDeleteBtn} onClick={handleDelete}>탈퇴</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </> 
    )
}


export default Mypage;