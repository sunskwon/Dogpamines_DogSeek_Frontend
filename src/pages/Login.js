import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import SignIn from "../components/login/SignIn";
import FindEmail from '../components/login/FindEmail';
import FindPwd from '../components/login/FindPwd';

import styles from './Login.module.css';

function Login() {

    const [user, setUser] = useState({
        userId: '',
        userPass: '',
    });
    const [isFindId, setIsFindId] = useState(false);
    const [isFindPwd, setIsFindPwd] = useState(false);
    const [isReleaseSleep, setIsReleaseSleep] = useState(false);

    const navigate = useNavigate();

    return (
        <>
            <div className={styles.container}>
                <div className={styles.outerBox}>
                    <div className={styles.actionBox}>
                        <p
                            className={!(isFindId || isFindPwd) ? styles.selected : styles.selectable}
                            onClick={() => {
                                setIsFindId(false);
                                setIsFindPwd(false);
                                setUser({ userId: '', userPass: '', });
                            }}
                        >
                            {isReleaseSleep ? '휴면 해제' : '로그인'}
                        </p>
                        <hr className={styles.verticalLine} />
                        <p
                            className={isFindId ? styles.selected : styles.selectable}
                            onClick={() => {
                                setIsFindId(true);
                                setIsFindPwd(false);
                            }}
                        >
                            아이디 찾기
                        </p>
                        <hr className={styles.verticalLine} />
                        <p
                            className={isFindPwd ? styles.selected : styles.selectable}
                            onClick={() => {
                                setIsFindId(false);
                                setIsFindPwd(true);
                            }}
                        >
                            비밀번호 찾기
                        </p>
                    </div>
                    <div className={styles.titleBox}>
                        <p>DogSeek</p>
                    </div>
                    {isFindId ?
                        <FindEmail
                            user={user}
                            setUser={setUser}
                            setIsFindId={setIsFindId}
                        />
                        :
                        isFindPwd ?
                            <FindPwd
                                user={user}
                                setUser={setUser}
                            />
                            :
                            isReleaseSleep ?
                                <>
                                </>
                                :
                                <SignIn
                                    user={user}
                                    setUser={setUser}
                                    setIsReleaseSleep={setIsReleaseSleep}
                                />
                    }
                    <div className={styles.signupBox}>
                        <p style={{ color: "#63c54a", }}>DogSeek</p>
                        <p style={{ color: "#999999", }}>계정이 없으신가요?</p>
                        <p
                            style={{ marginLeft: "20px", color: "#63c54a", cursor: "pointer", }}
                            onClick={() => navigate('/signup')}
                        >
                            회원가입 하기
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;