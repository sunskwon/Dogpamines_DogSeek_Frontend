import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { callRegisterAPI, checkAPI } from '../../api/RestAPIs';

import NickConfirmation from './NickConfirmation';
import PwdConfirmation from './PwdConfirmation';

import styles from './ThirdStep.module.css';

function ThirdStep({ setStep, signup, setSignup }) {

    const [boolNickConfirm, setBoolNickConfirm] = useState(false);
    const [boolPwdConfirm, setBoolPwdConfirm] = useState(false);

    const [user, setUser] = useState({
        userId: '',
        nick: '',
        password: '',
        rePassword: '',
        phone: ''
    });

    const [checkPhone, setCheckPhone] = useState({
        type: '',
        info: ''
    });

    const [modal, setModal] = useState({
        state: false,
        isCheck: false,
        isOneBtn: true,
        text: '',
    });

    const [pwdHide, setPwdHide] = useState(true);
    const [pwdType, setPwdType] = useState('password');

    const [rePwdHide, setRePwdHide] = useState(true);
    const [rePwdType, setRePwdType] = useState('password');

    const [showPwdDefault, setShowPwdDefault] = useState(true);
    const [showPwdTxt, setShowPwdTxt] = useState(false);

    const [showRePwdDefault, setShowRePwdDefault] = useState(true);
    const [showRePwdTxt, setShowRePwdTxt] = useState(false);
    const [showRePwdError, setShowRePwdError] = useState(false);

    const [showCheck, setShowCheck] = useState(false);

    // const email = signup.email;
    const email = 'sunskwon@gmail.com';

    const navigate = useNavigate();

    // 비밀번호 정규식(최소 8자 및 최대 12자, 영문자 or 숫자 or 특수문자 2가지 이상 조합)
    const pwdRegEx = /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,12}$/;
    // 연락처('-' 사용)
    const phoneRegEx = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/;

    const onPwdChange = (e) => {
        const temp = e.target.value;

        if (pwdRegEx.test(temp)) {
            setShowPwdDefault(false);
            setShowPwdTxt(true);
        } else {
            setShowPwdTxt(false);
            setShowPwdDefault(true);
        }

        setUser({ ...user, password: temp });
        console.log(`pwd : ${temp}`)
        console.log(`length : ${temp.length}`);
    }
    const onPwdReChange = (e) => {
        const temp = e.target.value;
        setUser({ ...user, rePassword: temp });
        if (user.password === temp) {
            setShowRePwdDefault(false);
            setShowRePwdError(false);
            setShowRePwdTxt(true);
        } else {
            setShowRePwdDefault(false);
            setShowRePwdTxt(false);
            setShowRePwdError(true);
        }
    }
    const onPhoneChange = (e) => {
        setUser({ ...user, phone: e.target.value });
        setCheckPhone({ ...checkPhone, type: 'phone', info: e.target.value });
    }

    const onClickHide = () => {
        setPwdHide(!pwdHide);
        if (pwdType === 'password') {
            setPwdType('text');
        } else {
            setPwdType('password');
        }
    }

    const onClickReHide = () => {
        setRePwdHide(!rePwdHide);
        if (rePwdType === 'password') {
            setRePwdType('text');
        } else {
            setRePwdType('password');
        }
    }

    const onClickComplete = async () => {
        const phoneCheck = phoneRegEx.test(user.phone);
        if (showCheck && showPwdTxt && showRePwdTxt && phoneCheck) {    // 모든 항목 true 일때
            const result = await checkAPI(checkPhone);

            if (result === 'true') {

                const signupResult = await callRegisterAPI({ user });

                if (signupResult) {
                    navigate('/signup-complete');
                } else {
                    setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '회원가입에 실패했습니다.' });
                }
            } else {
                setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '중복된 연락처 입니다.' });
            }
        } else {
            setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '연락처 형식이 올바르지 않습니다.' });
        }
    }

    const handleCancel = () => {
        setModal({ ...modal, state: true, isCheck: false, isOneBtn: false, text: '회원가입을 취소하시겠습니까?' });
    };

    const closeModal = () => {
        setModal({ ...modal, state: false, text: '' });
    };

    const confirmCancel = () => {
        // 회원가입 취소 로직
        navigate('/'); // 메인 페이지로 이동
    };

    useEffect(() => {
        setUser({ ...user, userId: email });
    }, [user.userId]);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.subTitleBox}>
                    <p>정보입력</p>
                </div>
                <div className={styles.lTxtBox}>
                    <div className={styles.starBox}>
                        <span className={styles.star}>*</span>
                    </div>
                    <div className={styles.infoTxtBox}>
                        <span className={styles.infoTxt}>회원정보</span>
                        <span className={styles.lTxt}>필수입력 항목입니다. 모든 항목의 회원 정보를 빈 칸 없이 입력해주세요.</span>
                    </div>
                </div>
                <div className={styles.inputBoxes}>
                    <div className={styles.emailBox}>
                        <p>아이디(이메일)</p>
                        <span>{email}</span>
                    </div>
                    <NickConfirmation
                        signup={signup}
                        setSignup={setSignup}
                        boolNickConfirm={boolNickConfirm}
                        setBoolNickConfirm={setBoolNickConfirm}
                    />
                    <div className={styles.pwdBox}>
                        <label>비밀번호</label>
                        <div className={styles.pwdInputBox}>
                            <input type={pwdType} value={user.password} onChange={onPwdChange}></input>
                            <div className={styles.pwdHideBox} onClick={onClickHide}>
                                {pwdHide ?
                                    (<img src='./images/auth/pwd_hide.png' alt='pwd_hide'></img>)
                                    : (<img src='./images/auth/pwd_eye.png' alt='pwd_eye'></img>)
                                }
                            </div>
                            {showPwdDefault && (<p>영문, 숫자, 특수문자 중 두 종류 이상 8~12자 이내</p>)}
                            {showPwdTxt && (<p style={{ color: "#63C54A", fontWeight: "500" }}>사용가능한 비밀번호입니다.</p>)}
                        </div>
                    </div>
                    <div className={styles.pwdReBox}>
                        <label>비밀번호 확인</label>
                        <div className={styles.pwdReInputBox}>
                            <input type={rePwdType} name={user.rePassword} onChange={onPwdReChange}></input>
                            <div className={styles.rePwdHideBox} onClick={onClickReHide}>
                                {rePwdHide ?
                                    (<img src='./images/auth/pwd_hide.png' alt='pwd_hide'></img>)
                                    : (<img src='./images/auth/pwd_eye.png' alt='pwd_eye'></img>)
                                }
                            </div>
                            {showRePwdDefault && (<p>확인을 위해 다시 입력하시기 바랍니다.</p>)}
                            {showRePwdTxt && (<p style={{ color: "#63C54A", fontWeight: "500" }}>비밀번호와 일치합니다.</p>)}
                            {showRePwdError && (<p style={{ color: "#FF0000", fontWeight: "500" }}>비밀번호와 일치하지 않습니다.</p>)}
                        </div>
                    </div>
                    <div className={styles.phoneBox}>
                        <label>연락처</label>
                        <div className={styles.phoneInputBox}>
                            <input type='tel' value={user.phone} onChange={onPhoneChange}
                                pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}" required></input>
                            <p>이메일 찾기 시 사용되는 정보 입니다. ex) 010-0000-0000</p>
                        </div>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.leftBtn} onClick={handleCancel}>취소</button>
                    <button disabled={!showCheck || !showPwdTxt || !showRePwdTxt || !user.phone}
                        className={styles.rightBtn} onClick={onClickComplete}>완료</button>
                </div>
                {modal.state && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <div className={styles.iconContainer}>
                                {modal.isCheck ? (
                                    <img src='./images/auth/modal_check.png' alt='modal_check'></img>
                                ) : (
                                    <img src='./images/auth/exclamationmark_circle.png' alt='exclamation_circle'></img>
                                )}
                            </div>
                            <div className={styles.modalTextContainer}>
                                <p>{modal.text}</p>
                            </div>
                            {modal.isOneBtn ? (
                                <button onClick={closeModal}>닫기</button>
                            ) : (
                                <div className={styles.btnContainer}>
                                    <button className={styles.leftBtn} onClick={confirmCancel}>예</button>
                                    <button className={styles.rightBtn} onClick={closeModal}>아니오</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ThirdStep;