import styles from "./Login.module.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { callLoginAPI } from "../../api/RestAPIs";
import { jwtDecode } from 'jwt-decode';

function Login(){

    const [user, setUser] = useState({
        userId: '',
        userPass: '',
    });

    const navigate = useNavigate();

    const onEmailChange = (e) => setUser({...user, userId: e.target.value});
    const onPwdChange = (e) => setUser({...user, userPass: e.target.value});

    const onClickLogin = async () => {

        if (user.userId.length !== 0 && user.userPass.length !== 0) {

            const response = await callLoginAPI({user});

            if (response === 'true') {
                
                // 토큰 디코딩
                const decodedToken = jwtDecode(window.localStorage.getItem("accessToken"));

                const userCode = decodedToken.userCode;
                const userNick = decodedToken.userNick;
                const userAuth = decodedToken.userAuth;

                // window.localStorage.setItem('userCode', userCode);
                // window.localStorage.setItem('userNick', userNick);
                // window.localStorage.setItem('userAuth', userAuth);

                if (userAuth === 'ADMIN') {
                    navigate('/admin');
                } else if (userAuth === 'USER') {
                    navigate('/');
                } else if (userAuth === 'SLEEP') {
                    alert('휴면회원입니다.');
                } else {
                    alert('올바르지 않은 접근입니다.');
                };
                window.location.reload();
            } else {
                alert('아이디 또는 비밀번호를 확인해주세요.')
                window.location.reload();
            }
        } else if (user.userId.length !== 0 && user.userPass.length === 0) {
            alert('비밀번호를 입력해주세요.');
        } else {
            alert('아이디(이메일)을 입력해주세요.')
        }
    }

    // Enter키 사용
    const activeEnter = (e) => {
        if (e.key === "Enter") {
            onClickLogin();
        }
    }

    const onClickFind = () => {
        navigate('/findemail');
    }

    return(

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
                            <input placeholder="아이디를 입력해주세요." name={user.userId} type="email" onChange={onEmailChange} onKeyDown={activeEnter}></input>
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
                
            </div>        
        </>
    )
}

export default Login;