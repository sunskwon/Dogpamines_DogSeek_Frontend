import styles from "./Login.module.css";
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { callLoginAPI } from "../../api/RestAPIs";

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
            if (response) {
                console.log('auth')
                // console.log(response.userInfo.userAuth);
                const auth = response.userInfo.userAuth;

                const userCode = window.localStorage.getItem("userCode");
                console.log(`login userCode : ${userCode}`);
                if (auth === 'ADMIN') {
                    navigate('/admin');
                } else if (auth === 'USER') {
                    navigate('/complete');
                } else if (auth === 'SLEEP') {
                    alert('휴면회원입니다.');
                } else {
                    alert('올바르지 않은 접근입니다.');
                }
            }
        }
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
                            <p>EMAIL</p>
                            <input placeholder="이메일을 입력해주세요." name={user.userId} onChange={onEmailChange}></input>
                        </div>
                        {/* pwd */}
                        <div className={styles.pwdBox}>
                            <p>PASSWORD</p>
                            <input placeholder="비밀번호를 입력해주세요." name={user.userPass} type="password" onChange={onPwdChange}></input>
                        </div>
                        <div className={styles.findBox}>
                            <p>이메일/비밀번호 찾기</p>
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