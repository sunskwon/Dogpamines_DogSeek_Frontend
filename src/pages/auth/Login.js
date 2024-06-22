import styles from "./Login.module.css";
import React, {useState, useEffect} from 'react';

function Login(){

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const onEmailChange = (e) => setEmail(e.target.value);
    const onPwdChange = (e) => setPwd(e.target.value);
    // console.log(`email : ${email}`);
    // console.log(`pwd : ${onPwdChange}`);

    const onClickLogin = () => {
        setEmail(email);
        setPwd(pwd);
        console.log(`email : ${email}`);
        console.log(`pwd : ${onPwdChange}`);
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
                            <input placeholder="이메일을 입력해주세요." name="email" onChange={onEmailChange}></input>
                        </div>
                        {/* pwd */}
                        <div className={styles.pwdBox}>
                            <p>PASSWORD</p>
                            <input placeholder="비밀번호를 입력해주세요." name="pwd" type="password" onChange={onPwdChange}></input>
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