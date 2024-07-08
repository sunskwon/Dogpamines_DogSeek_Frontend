import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Mypage.module.css';
import { useState, useEffect, useRef } from "react";
import { DeleteAPI, GetAPI, PostAPI, PutAPI, myPageChangePwd } from '../../api/RestAPIs';
import { jwtDecode } from 'jwt-decode';


function Mypage(){

    const navigate = useNavigate();

    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const modalBackground = useRef();

    // 토큰 디코딩
    const decodedToken = jwtDecode(window.localStorage.getItem("accessToken"));

    const userCode = decodedToken.userCode;
    const userNick = decodedToken.userNick;
    const userAuth = decodedToken.userAuth;
    
    const [users, setUsers] = useState([]);
    const [userInfo, setUserInfo] = useState({
        userCode: '',
        userId: '',
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

    const [checkPass, setCheckPass] = useState({
        password: '',
        rePassword: ''
    });

    const [pwdHide, setPwdHide] = useState(true);
    const [pwdType, setPwdType] = useState('password');

    const [pwdHide2, setPwdHide2] = useState(true);
    const [pwdType2, setPwdType2] = useState('password');

    const [rePwdHide, setRePwdHide] = useState(true);
    const [rePwdType, setRePwdType] = useState('password');

    const [showPwdDefault, setShowPwdDefault] = useState(true);
    const [showPwdTxt, setShowPwdTxt] = useState(false);
    const [showPwdError, setShowPwdError ] = useState(false);

    const [showRePwdDefault, setShowRePwdDefault] = useState(true);
    const [showRePwdTxt, setShowRePwdTxt] = useState(false);
    const [showRePwdError, setShowRePwdError] = useState(false);

    
    const [modal, setModal] = useState({
        state: false,
        isCheck: false,
        isOneBtn: true,
        text: '',
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

    const verifyPassword = async (userCode, password) => {
        try {
            const address = `/mypage/verifyPassword`;
            const response = await PostAPI(address, { userCode, password });
            const result = await response.json();
            return result.valid;
        } catch (error) {
            console.error("비밀번호 확인 오류:", error);
            throw error;
        }
    };

    useEffect(() => {
        selectUserDetail().then(res =>setUsers(res));
    }, []);

    useEffect(() => {
        setUserInfo(prevState => ({
            ...prevState,
            userCode: userCode
        }));
    }, [userCode]);

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

    const openModal2 = () => {
        setIsModalOpen2(true);
    }

    const handleCancel = (e) => {
        setIsModalOpen(false);
        setIsModalOpen2(false);
    };

    const onNickChange = (e) => {
        setUserInfo({...userInfo, userNick: e.target.value});
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

    const onPwdChange1 = async (e) => {
        const enteredPassword = e.target.value;
    
        try {
            const isValid = await verifyPassword(userCode, enteredPassword);
    
            if (isValid) {
                setShowPwdError(false); 
            } else {
                setShowPwdError(true);
            }
        } catch (error) {
            console.log("비밀번호 확인 오류:", error);
        }
    };

    const onPwdChange = (e) => {
        const temp = e.target.value;

        if (userPassRegex.test(temp)) {
            setShowPwdDefault(false);
            setShowPwdTxt(true);
        } else {
            setShowPwdTxt(false);
            setShowPwdDefault(true);
        }

        setCheckPass({...checkPass, password: temp});
    }

    const onPwdReChange = (e) => {
        const temp = e.target.value;
        setCheckPass({...checkPass, rePassword: temp});
        if (checkPass.password === temp) {
            setShowRePwdDefault(false);
            setShowRePwdError(false);
            setShowRePwdTxt(true);
        } else {
            setShowRePwdDefault(false);
            setShowRePwdTxt(false);
            setShowRePwdError(true);
        }
    }

    const onClickHide = () => {
        setPwdHide(!pwdHide);
        console.log(`pwdHide : ${pwdHide}`);
        console.log(`pwdType : ${pwdType}`);
        if (pwdType === 'password') {
            setPwdType('text');
        } else {
            setPwdType('password');
        }
    }
    
    const onClickHide2 = () => {
        setPwdHide2(!pwdHide2);
        console.log(`pwdHide2 : ${pwdHide2}`);
        console.log(`pwdType2 : ${pwdType2}`);
        if (pwdType2 === 'password') {
            setPwdType2('text');
        } else {
            setPwdType2('password');
        }
    }

    const onClickReHide = () => {
        setRePwdHide(!rePwdHide);
        console.log(`re pwdHide : ${rePwdHide}`);
        console.log(`re pwdType : ${rePwdType}`);
        if (rePwdType === 'password') {
            setRePwdType('text');
        } else {
            setRePwdType('password');
        }
    }

    const onClickChange = async() => {
        if (checkPass.password.length !== 0 && checkPass.rePassword.length !== 0) {
            try {
                const result = await verifyPassword(userCode, checkPass.password);
                if (result === 'false') {
                    setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '비밀번호 변경 실패!' });
                } 
                const response = await myPageChangePwd(checkPass.password);
                console.log(response);
            } catch (error) {
                console.log("Error changing password:", error);
            }
        } else {
            console.log("올바른 비밀번호를 입력하세요.");
        }
    };

    const handleDelete = async () => {

        const address = `/mypage/${userCode}`;
        const response = await DeleteAPI(address, userCode);

        if(response.ok) {
            alert("회원 탈퇴가 완료되었습니다.");
            window.localStorage.removeItem('accessToken');
            setIsLoggedIn(false);
            navigate("/");
            window.location.reload();
        }
        const result = await response.users;

        return result;
    };

    const handleInputChange= (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    useEffect(() => {
        if (modalBackground.state || isModalOpen || isModalOpen2) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isModalOpen, isModalOpen2]);

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
                    <p className={styles.text6}>닉네임</p>
                    <p className={styles.text6}>연락처</p>
                </div>
                <hr className={styles.line2}/>
                {users.map (user => (
                    <div className={styles.user2} key={user.userCode}>
                        <p className={styles.text7}>{user.userId}</p>
                        <div  className={styles.user4}>
                            <input type='password' className={styles.inputBox1} name='userPass' value={user.userPass}></input>
                            <button className={styles.btn2} onClick={() => openModal2()}>변경</button>
                        </div><br/>
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
        </div>
        
        {/* Delete Modal */}
            {
                isModalOpen && 
                <div className={styles.modalContainer} ref={modalBackground}>
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

            {/* Pwd Change Modal */}
            {
                isModalOpen2 && 
                <div className={styles.modalContainer} ref={modalBackground}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalTextContainer1}>
                            <div className={styles.modal_content}>
                            <p className={styles.modalText1}>비밀번호 변경</p>
                            <hr />
                                <div className={styles.pwdBox}>
                                    <p className={styles.pwdText}>비밀번호</p>
                                    <input type={pwdType} className={styles.pwdInput1} placeholder='비밀번호를 입력해주세요.' value={users.userPass} onChange={onPwdChange1}></input>
                                </div>
                                <div className={styles.pwdHideBox} onClick={onClickHide}>
                                    {pwdHide ? 
                                    (<img src='./images/auth/pwd_hide.png' alt='pwd_hide'></img>) 
                                    : (<img src='./images/auth/pwd_eye.png' alt='pwd_eye'></img>)
                                    }
                                </div>
                                    { showPwdError &&  (<p className={styles.failText2}>기존 비밀번호와 일치하지 않습니다.</p>)}
                                <div className={styles.pwdBox}>
                                    <p className={styles.pwdText}>새 비밀번호</p>
                                    <input type={pwdType2} className={styles.pwdInput2} onChange={onPwdChange} value={checkPass.newUserPass}></input>
                                    <div className={styles.pwdHideBox2} onClick={onClickHide2}>
                                    {pwdHide2 ? 
                                    (<img src='./images/auth/pwd_hide.png' alt='pwd_hide'></img>) 
                                    : (<img src='./images/auth/pwd_eye.png' alt='pwd_eye'></img>)
                                    }
                                    </div>
                                    { showPwdDefault && (<p className={styles.defaultText}>영문, 숫자, 특수문자 중 두 종류 이상 8~12자 이내</p>)}
                                    { showPwdTxt && (<p className={styles.successText}>사용가능한 비밀번호입니다.</p>)}
                                </div>
                                <div className={styles.pwdBox}>
                                    <p className={styles.pwdText}>새 비밀번호 확인</p>
                                    <input type={rePwdType} className={styles.pwdInput3} onChange={onPwdReChange} value={checkPass.confirmNewUserPass}></input>
                                    <div className={styles.rePwdHideBox} onClick={onClickReHide}>
                                    {rePwdHide ? 
                                    (<img src='./images/auth/pwd_hide.png' alt='pwd_hide'></img>) 
                                    : (<img src='./images/auth/pwd_eye.png' alt='pwd_eye'></img>)
                                    }
                                </div>
                                { showRePwdDefault && (<p></p>)}
                                { showRePwdTxt && (<p className={styles.successText}>새 비밀번호와 일치합니다.</p>)}
                                { showRePwdError &&  (<p className={styles.failText}>새 비밀번호와 일치하지 않습니다.</p>)}
                                </div>
                            </div>
                            <div className={styles.btnContainer1}>
                                <button className={styles.modalCloseBtn} onClick={handleCancel}>닫기</button>
                                <button className={styles.modalDeleteBtn} onClick={onClickChange}>변경</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </> 
    )
}


export default Mypage;