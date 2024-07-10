import styles from './SignUpIdentity.module.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { callEmailVerification, callEmailVerify, checkAPI } from '../../api/RestAPIs';

function SignUpIdentity() {
    const [email, setEmail] = useState("");
    const [checkEmail, setCheckEmail] = useState({
        type: '',
        info: ''
    });
    const [authNum, setAuthNum] = useState("");
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [showSend, setShowSend] = useState(true);
    const [showCheck, setShowCheck] = useState(false);

    const navigate = useNavigate();

    const [modal, setModal] = useState({
        state: false,
        isCheck: false,
        isOneBtn: true,
        text: '',
    });

    // email 정규식
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

    const onEmailChange = (e) => {
        setEmail(e.target.value);
        setCheckEmail({ ...checkEmail, type: 'email', info: e.target.value });
    };
    const onAuthNumChange = (e) => setAuthNum(e.target.value);

    const onClickConfirm = async () => {
        // 이메일 유효성 검사
        if (email.length !== 0 && emailRegEx.test(email)) {  // 빈 문자열이 아니고 정규식에 맞을때
            // 이메일 중복 여부 확인 로직 (백에서 처리)
            const result = await checkAPI(checkEmail);

            if (result === 'true') {
                const type = 'signup';
                const result = await callEmailVerification(email, type);

                if (result === 'true') {
                    setModal({ ...modal, state: true, isCheck: true, isOneBtn: true, text: '인증번호가 발송되었습니다.' });
                    setShowSend(false);
                    setShowCheck(true);
                } else {
                    setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '인증번호 발송 실패.' });
                }
            } else {
                setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '중복된 이메일 입니다.' });
            }
        } else if (!emailRegEx.test(email)) {   // 정규식에 맞지 않을 때
            setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '이메일 형식이 올바르지 않습니다.' });
        } else {
            setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '이메일 형식이 올바르지 않습니다.' });
        }
    }

    const onClickEmailVerify = async () => {
        if (showCheck === true) {

            if (authNum.length !== 0) {
                // 인증 번호 확인 로직 (백에서)
                const result = await callEmailVerify(email, authNum);

                if (result === 'true') {
                    setIsConfirmed(true);
                    setModal({ ...modal, state: true, isCheck: true, isOneBtn: true, text: '이메일 인증 완료!' });
                } else {
                    setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '인증번호가 맞지 않습니다.' });
                }

            } else {
                setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '인증번호를 입력해주세요.' });
            }

        } else {
            setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '이메일 중복 확인이 필요합니다.' });
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

    const handleNextPage = () => {
        window.scrollTo(0,0);
        navigate('/signupinfo', {
            state: {
                email: email
            }
        }); // 다음 페이지 경로로 이동

    };

    return (

        <>
            <div className={styles.container}>
                <div className={styles.titleBox}>
                    <p>회원가입</p>
                </div>
                <div className={styles.seqBox}>
                    <hr />
                    <div className={styles.wrapper}>
                        <div className={styles.circle1}>1</div>
                        <div className={styles.circle2}>2</div>
                        <div className={styles.circle3}>3</div>
                        <div className={styles.circle4}>4</div>
                    </div>
                </div>
                <div className={styles.txtBox}>
                    <p>약관동의</p>
                    <p>본인인증</p>
                    <p>정보입력</p>
                    <p>가입완료</p>
                </div>
                <div className={styles.subTitleBox}>
                    <p>본인인증</p>
                </div>
                <div className={styles.inputBoxes}>
                    <div className={styles.emailBox}>
                        <label>이메일</label>
                        <input name='email' onChange={onEmailChange} type='email'></input>
                        {showSend && (
                            <button type='submit' onClick={onClickConfirm}>전송</button>
                        )}
                        {showCheck && (
                            <img src='./images/auth/check_icon.png'></img>
                        )}
                    </div>
                    <div className={styles.numberBox}>
                        <label>인증번호</label>
                        <input type='text' onChange={onAuthNumChange}></input>
                        <button type='submit' onClick={onClickEmailVerify}>확인</button>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.leftBtn} onClick={handleCancel}>취소</button>
                    <button disabled={!isConfirmed || !showCheck}
                        className={styles.rightBtn} onClick={handleNextPage}>다음</button>
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
    )
}

export default SignUpIdentity;