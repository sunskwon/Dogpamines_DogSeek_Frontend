import { useState, useEffect } from 'react';

import styles from './PwdConfirmation.module.css';

function PwdConfirmation({ signup, setSignup, boolPwdConfirm, setBoolPwdConfirm }) {

    const pwdRegEx = /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,12}$/;

    const [isPwdHide, setIsPwdHide] = useState(true);
    const [isPwdConfirmed, setIsPwdConfirmed] = useState(false);
    const [isConfirmationPwdHide, setIsConfirmationPwdHide] = useState(true);
    const [isConfirmationPwdConfirmed, setIsConfirmationPwdConfirmed] = useState(false);

    useEffect(() => {
        {/* overwork hook? */}
        setBoolPwdConfirm(isPwdConfirmed && isConfirmationPwdConfirmed);
    }, [isConfirmationPwdConfirmed]);

    const onChangeHandler = e => {

        if (e.target.name === 'pwd') {
            setIsPwdConfirmed(pwdRegEx.test(e.target.value));
            setIsConfirmationPwdConfirmed(signup.pwdConfirmation === e.target.value);
        } else {
            setIsConfirmationPwdConfirmed(signup.pwd === e.target.value);
        };

        setSignup({
            ...signup,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <div className={styles.pwdBox}>
                <label>비밀번호</label>
                <div className={styles.pwdInputBox}>
                    <div className={styles.inputBox}>
                        <input
                            type={isPwdHide ? 'password' : 'text'}
                            name='pwd'
                            value={signup.pwd}
                            onChange={onChangeHandler}
                        />
                        <div
                            className={styles.pwdHideBox}
                            onClick={() => setIsPwdHide(prev => !prev)}
                        >
                            {isPwdHide ? (
                                <img
                                    src='./images/auth/pwd_hide.png'
                                    alt='pwd_hide'
                                />
                            ) : (
                                <img
                                    src='./images/auth/pwd_eye.png'
                                    alt='pwd_eye'
                                />
                            )}
                        </div>
                    </div>
                    {isPwdConfirmed ?
                        <p style={{ color: "#63C54A", fontWeight: "500" }}>사용가능한 비밀번호입니다.</p>
                        :
                        <p>영문, 숫자, 특수문자 중 두 종류 이상 8~12자 이내</p>
                    }
                </div>
            </div>
            <div className={styles.pwdBox}>
                <label>비밀번호 확인</label>
                <div className={styles.pwdInputBox}>
                    <div className={styles.inputBox}>
                        <input
                            type={isConfirmationPwdHide ? 'password' : 'text'}
                            name='pwdConfirmation'
                            value={signup.pwdConfirmation}
                            onChange={onChangeHandler}
                        />
                        <div
                            className={styles.pwdHideBox}
                            onClick={() => setIsConfirmationPwdHide(prev => !prev)}
                        >
                            {isConfirmationPwdHide ? (
                                <img
                                    src='./images/auth/pwd_hide.png'
                                    alt='pwd_hide'
                                />
                            ) : (
                                <img
                                    src='./images/auth/pwd_eye.png'
                                    alt='pwd_eye'
                                />
                            )}
                        </div>
                    </div>
                    {!signup.pwdConfirmation?.length ? (
                        <p>확인을 위해 다시 입력하시기 바랍니다.</p>
                    ) : (isConfirmationPwdConfirmed ?
                        <p style={{ color: "#63C54A", fontWeight: "500" }}>비밀번호와 일치합니다.</p>
                        :
                        <p style={{ color: "#FF0000", fontWeight: "500" }}>비밀번호와 일치하지 않습니다.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default PwdConfirmation;