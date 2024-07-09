import style from './FindEmail.module.css';
import React, { useState } from 'react';
import { checkAPI, callFindUserId } from '../../api/RestAPIs';
import { useNavigate } from 'react-router-dom';

function FindEmail() {

    const [checkPhone, setCheckPhone] = useState({
        type: '',
        info: ''
    });

    const [userId, setUserId] = useState('');
    const [signupDate, setSignupDate] = useState('');
    const [showIdVerify, setShowIdVerify] = useState(true);
    const navigate = useNavigate();

    const [modal, setModal] = useState({
        state: false,
        isCheck: false,
        isOneBtn: true,
        text: '',
    });

    if (modal.state) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }

    const onPhoneChange = (e) => {
        setCheckPhone({ ...checkPhone, type: 'phone', info: e.target.value });
    }


    // 연락처('-' 사용)
    const phoneRegEx = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/;


    const onClickPhoneMatch = async () => {
        const phoneCheck = phoneRegEx.test(checkPhone.info);
        console.log(`phoneCheck : ${phoneCheck}`);
        if (checkPhone.info.length !== 0) {
            if (phoneCheck) {
                const result = await checkAPI(checkPhone);

                if (result === 'false') {

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
                        const maskedUserId = maskEmail(userId);

                        setUserId(maskedUserId);
                        setSignupDate(signupDate);
                        setShowIdVerify(false);
                    } else {
                        setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '일치하는 회원정보가 없습니다.' });
                    }

                } else {
                    setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '일치하는 정보가 없습니다.' });
                }
            } else {
                setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '연락처가 올바르지 않은 형식입니다.' });
            }
        } else {
            setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '연락처를 입력해주세요.' });
        }
    }

    // 이메일 마스킹 함수 정의
    const maskEmail = (email) => {
        const [localPart, domainPart] = email.split('@');

        // 숫자를 *로 치환
        let maskedLocalPart = localPart.replace(/\d/g, '*');

        // 숫자가 없으면 뒤에서 세 글자를 *로 치환
        if (!/\d/.test(localPart)) {
            const length = maskedLocalPart.length;
            maskedLocalPart = length <= 3
                ? '*'.repeat(length)
                : maskedLocalPart.slice(0, length - 3) + '***';
        }

        return `${maskedLocalPart}@${domainPart}`;
    };


    const onClickMoveFindPwd = () => {
        navigate('/findpwd');
    }

    const closeModal = () => {
        setModal({ ...modal, state: false, text: '' });
    }

    const onClickCancel = () => {
        setModal({ ...modal, state: true, isCheck: false, isOneBtn: false, text: '아이디 찾기를 취소하시겠습니까?' });
    }
    const confirmCancel = () => {
        // 아이디 찾기 취소 로직
        navigate('/'); // 메인 페이지로 이동
    };

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
                            </div>
                            <div className={style.btnContainer}>
                                <button className={style.leftBtn} onClick={onClickCancel}>취소</button>
                                <button className={style.rightBtn} onClick={onClickPhoneMatch}>조회하기</button>
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
                                <button className={style.leftBtn} onClick={() => { navigate('/') }}>메인으로</button>
                                <button className={style.rightBtn} onClick={() => { navigate('/login') }}>로그인</button>
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
                            {modal.isOneBtn ? (
                                <button onClick={closeModal}>닫기</button>
                            ) : (
                                <div className={style.modalButtonContainer}>
                                    <button className={style.leftBtn} onClick={confirmCancel}>예</button>
                                    <button className={style.rightBtn} onClick={closeModal}>아니오</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>

    );
}

export default FindEmail;