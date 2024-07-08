import style from './FindEmail.module.css';
import React, { useState } from 'react';
import { checkAPI, callEmailVerification, callEmailVerify, callFindUserId } from '../../api/RestAPIs';
import { useNavigate } from 'react-router-dom';

function FindEmail() {

    const [checkPhone, setCheckPhone] = useState({
        type: '',
        info: ''
    });
    const [email, setEmail] = useState("");
    const [authNum, setAuthNum] = useState("");
    const [showCheck, setShowCheck] = useState(false);
    const [showConfirmed, setShowConfirmed] = useState(true);
    const [userId, setUserId] = useState('');
    const [signupDate, setSignupDate] = useState('');
    const [showIdVerify, setShowIdVerify] = useState(true);
    const navigate = useNavigate();

    const [modal, setModal] = useState({
        state: false,
        text: '',
        isCheck: false,
    });

    const onPhoneChange = (e) => {
        setCheckPhone({ ...checkPhone, type: 'phone', info: e.target.value });
    }

    const onEmailChange = (e) => setEmail(e.target.value);
    const onNumChange = (e) => setAuthNum(e.target.value);


    // 연락처('-' 사용)
    const phoneRegEx = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/;


    const onClickPhoneMatch = async () => {
        const phoneCheck = phoneRegEx.test(checkPhone.info);
        console.log(`phoneCheck : ${phoneCheck}`);
        if (checkPhone.info.length !== 0) {
            if (phoneCheck) {
                const result = await checkAPI(checkPhone);

                if (result === 'false') {
                    setShowConfirmed(false);
                    setShowCheck(true);
                } else {
                    setModal({ ...modal, state: true, isCheck: false, text: '일치하는 정보가 없습니다.' });
                }
            } else {
                setModal({ ...modal, state: true, isCheck: false, text: '연락처가 올바르지 않은 형식입니다.' });
            }
        } else {
            setModal({ ...modal, state: true, isCheck: false, text: '연락처를 입력해주세요.' });
        }
    }

    const onClickEmail = async () => {
        if (showCheck === true) {
            const type = 'findId';
            const result = await callEmailVerification(email, type);

            if (result === 'true') {
                setModal({ ...modal, state: true, isCheck: true, text: '인증번호가 발송되었습니다.' });
            } else {
                setModal({ ...modal, state: true, isCheck: false, text: '인증번호 발송 실패.' });
            }
        } else {
            setModal({ ...modal, state: true, isCheck: false, text: '연락처 일치 여부 확인이 필요합니다.' });
        }
    }

    const onClickNumCheck = async () => {

        if (showCheck === true) {

            if (authNum.length !== 0) {
                if (authNum.length === 6) {
                    const result = await callEmailVerify(email, authNum);

                    if (result === 'true') {
                        // 사용자 ID 조회
                        const result = await callFindUserId(checkPhone.info);
                        if (result !== 'false') {
                            const cleanedResult = result.replace(/{|}/g, '');
                            const resultObject = cleanedResult.split(', ').reduce((acc, current) => {
                                const [key, value] = current.split('=');
                                acc[key] = value;
                                return acc;
                            }, {});
                            const signupDate = resultObject.signupDate;
                            const userId = resultObject.userId;

                            setUserId(userId);
                            setSignupDate(signupDate);
                            setShowIdVerify(false);
                        } else {
                            setModal({ ...modal, state: true, isCheck: false, text: '일치하는 회원정보가 없습니다.' });
                        }
                    }
                } else {
                    setModal({ ...modal, state: true, isCheck: false, text: '인증번호는 6자리 입니다.' });
                }

            } else {
                setModal({ ...modal, state: true, isCheck: false, text: '인증번호를 입력해주세요.' });
            }
        } else {
            setModal({ ...modal, state: true, isCheck: false, text: '연락처 일치 여부 확인이 필요합니다.' });
        }
    }

    const onClickMoveFindPwd = () => {
        navigate('/findpwd');
    }

    const closeModal = () => {
        setModal({ ...modal, state: false, text: '' });
    }

    return (

        <>
            <div className={style.container}>
                <div className={style.box}>
                    <div className={style.findBox}>
                        <div className={style.findId}>아이디 찾기</div>
                        <div className={style.findPw} onClick={onClickMoveFindPwd}>비밀번호 찾기</div>
                    </div>
                    {showIdVerify ? (
                        <div className={style.infoBox}>
                            <div className={style.phoneBox}>
                                <label>연락처</label>
                                <div className={style.phoneInputBox}>
                                    <input type='tel' placeholder='회원가입시 입력한 연락처를 입력해주세요.' value={checkPhone.info}
                                        pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}" required onChange={onPhoneChange}></input>
                                    <p>ex) 010-0000-0000</p>
                                </div>
                                {showConfirmed && (
                                    <button type='submit' onClick={onClickPhoneMatch}>일치확인</button>
                                )}
                                {showCheck && (
                                    <img src='./images/auth/check_icon.png'></img>
                                )}
                            </div>
                            <div className={style.emailBox}>
                                <label>이메일</label>
                                <div className={style.emailInputBox}>
                                    <input type='email' value={email} placeholder='인증번호를 받을 이메일을 입력해주세요.' onChange={onEmailChange}></input>
                                </div>
                                <button onClick={onClickEmail}>전송</button>
                            </div>
                            <div className={style.numBox}>
                                <label>인증번호</label>
                                <div className={style.numInputBox}>
                                    <input value={authNum} placeholder='6자리 인증번호를 입력해주세요.' onChange={onNumChange}></input>
                                </div>
                                <button onClick={onClickNumCheck}>확인</button>
                            </div>
                        </div>
                    ) : (
                        <div className={style.infoBox}>
                            <div className={style.resultBox}>
                                <div className={style.userIdBox}>
                                    <label>아이디</label>
                                    <span>{userId}</span>
                                </div>
                                <div className={style.signupDateBox}>
                                    <label>가입일</label>
                                    <span>{signupDate}</span>
                                </div>
                            </div>
                            <div className={style.buttonContainer}>
                                <button className={style.mainBtn}>메인으로</button>
                                <button className={style.loginBtn}>로그인</button>
                            </div>
                        </div>
                    )}
                </div>
                {modal.state && (
                    <div className={style.modal}>
                        <div className={style.modalContent}>
                            <div className={style.iconContainer}>
                                {modal.isCheck ? (
                                    <img src='./images/auth/modal_check.png' alt='modal_check'></img>
                                ) : (
                                    <img src='./images/auth/exclamationmark_circle.png' alt='exclamation_circle'></img>
                                )}
                            </div>
                            <div className={style.modalTextContainer}>
                                <p>{modal.text}</p>
                            </div>
                            <button onClick={closeModal}>닫기</button>
                        </div>
                    </div>
                )}
            </div>
        </>

    );
}

export default FindEmail;