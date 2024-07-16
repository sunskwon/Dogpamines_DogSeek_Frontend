import styles from "./Login.module.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { callLoginAPI } from "../../api/RestAPIs";
import { jwtDecode } from 'jwt-decode';

function Login() {

    const [user, setUser] = useState({
        userId: '',
        userPass: '',
    });

    const [modal, setModal] = useState({
        state: false,
        text: '',
    });

    const [sleepModal, setSleepModal] = useState(false);

    const navigate = useNavigate();

    const onEmailChange = (e) => setUser({ ...user, userId: e.target.value });
    const onPwdChange = (e) => setUser({ ...user, userPass: e.target.value });

    const onClickLogin = async () => {
        window.scrollTo(0,0);
        if (user.userId.length !== 0 && user.userPass.length !== 0) {

            const response = await callLoginAPI({ user });

            if (response === 'true') {

                // 토큰 디코딩
                const decodedToken = jwtDecode(window.localStorage.getItem("accessToken"));

                const userAuth = decodedToken.userAuth;

                if (userAuth === 'ADMIN') {
                    navigate('/admin');
                } else if (userAuth === 'USER') {
                    navigate('/');
                    window.location.reload();
                } else {
                    setModal({ ...modal, state: true, text: '올바르지 않은 접근입니다.' });
                }

            } else if (response === 'SLEEP') {
                setModal({ ...modal, state: true, text: '회원님의 계정은 현재 휴면 상태 입니다.' });
                setSleepModal(true);
            } else {
                setModal({ ...modal, state: true, text: '일치하는 회원 정보가 없습니다.' });
            }
        } else if (user.userId.length !== 0 && user.userPass.length === 0) {
            setModal({ ...modal, state: true, text: '비밀번호를 입력해주세요.' });
        } else {
            setModal({ ...modal, state: true, text: '아이디(이메일)을 입력해주세요.' });
        }
    }

    // Enter키 사용
    const activeEnter = (e) => {
        if (e.key === "Enter") {
            onClickLogin();
        }
    }

    const onClickFind = () => {
        navigate('/find-email');
    }

    const closeModal = () => {
        setModal({ ...modal, state: false, text: '' });
        window.location.reload();
    }

    const onClickSleep = () => {
        navigate('/release/sleep', {
            state: {
                id: user.userId
            }
        });
    }

    return (

        <>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.titleBox}>
                        <p className={styles.title}>DogSeek</p>
                    </div>
                    <div className={styles.infoBox}>
                        {/* id */}
                        <div className={styles.idBox}>
                            <p>ID(EMAIL)</p>
                            <input placeholder="아이디를 입력해주세요." name={user.userId} type="email" onChange={onEmailChange} onKeyDown={activeEnter} autoFocus></input>
                        </div>
                        {/* pwd */}
                        <div className={styles.pwdBox}>
                            <p>PASSWORD</p>
                            <input placeholder="비밀번호를 입력해주세요." name={user.userPass} type="password" onChange={onPwdChange} onKeyDown={activeEnter}></input>
                        </div>
                        <div className={styles.findBox} onClick={onClickFind}>
                            <p>아이디/비밀번호 찾기</p>
                        </div>
                        <div className={styles.loginBtnBox}>
                            <button type="submit" onClick={onClickLogin}>로그인</button>
                        </div>
                        <hr></hr>
                        <div className={styles.signUpBox}>
                            <span>독식계정이 없으신가요?</span>
                            <span><a href="/signup">회원가입 하기</a></span>
                        </div>
                    </div>
                </div>
                {modal.state && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <div className={styles.iconContainer}>
                                <img src='./images/auth/exclamationmark_circle.png' alt='exclamation_circle'></img>
                            </div>
                            <div className={styles.modalTextContainer}>
                                <p>{modal.text}</p>
                            </div>
                            <button onClick={closeModal}>닫기</button>
                        </div>
                    </div>
                )}
                {sleepModal && (
                    <div className={styles.modal}>
                        <div className={styles.sleepModalContent}>
                            <div className={styles.iconContainer}>
                                <img src='./images/auth/auth_sleep.png' alt='auth_sleep'></img>
                            </div>
                            <div className={styles.modalTextContainer}>
                                <p>회원님의 계정은 현재 휴면 상태 입니다.</p>
                            </div>
                            <button onClick={onClickSleep}>휴면 해제 하기</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Login;