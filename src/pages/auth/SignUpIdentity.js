import styles from './SignUpIdentity.module.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function SignUpIdentity(){
    const [email, setEmail] = useState("");
    const [authNum, setAuthNum] = useState("");
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [showConfirmed, setShowConfirmed] = useState(true);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showCheck, setShowCheck] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showLastConfirmModal, setShowLastConfirmModal] = useState(false);
    const [showNumConfirmModal, setShowNumConfirmModal] = useState(false);
    const [showConfirmNextModal, setShowConfirmNextModal] = useState(false);
    const navigate = useNavigate();

    // email 정규식
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

    const onEmailChange = (e) => setEmail(e.target.value);
    const onAuthNumChange = (e) => setAuthNum(e.target.value);

    const onClickConfirm = () => {
        // 이메일 유효성 검사
        if (email.length !== 0 && emailRegEx.test(email)) {  // 빈 문자열이 아니고 정규식에 맞을때
            // 이메일 중복 여부 확인 로직 (백에서 처리)
            console.log(`email : ${email}`);
            setIsConfirmed(true);
            setShowConfirmed(false);
            setShowCheck(true);
        } else if (!emailRegEx.test(email)) {   // 정규식에 맞지 않을 때
            setShowEmailModal(true);
        } else {
            setShowEmailModal(true);
        }
    }

    const onClickLastConfirm = () => {
        if (isConfirmed && authNum.length !== 0) {
            // 인증 번호 확인 로직 (백에서)
            setShowConfirmNextModal(true);

        } else if (isConfirmed && authNum.length < 6) {    // 우선은 글자 수 체크만(수정 필요)
            setShowNumConfirmModal(true);
        } else {
             setShowLastConfirmModal(true);
        }
    }

    const handleCancel = () => {
        setShowCancelModal(true);
    };

    const closeModal = () => {
        setShowEmailModal(false);
        setShowLastConfirmModal(false);
        setShowNumConfirmModal(false);
    };

    const closeCancelModal = () => {
        setShowCancelModal(false);
    };

    const confirmCancel = () => {
        // 회원가입 취소 로직
        navigate('/'); // 메인 페이지로 이동
    };

    const handleNextPage = () => {
        navigate('/signupinfo'); // 다음 페이지 경로로 이동
        
    };

    return(

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
                        {showConfirmed && (
                            <button type='submit' onClick={onClickConfirm}>중복확인</button>    
                        )}
                        {showCheck && (
                            <img src='./images/auth/check_icon.png'></img>
                        )}
                    </div>
                    <div className={styles.numberBox}>
                        <label>인증번호</label>
                        <input type='text' onChange={onAuthNumChange}></input>
                        <button>전송</button>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.cancelBtn} onClick={handleCancel}>취소</button>
                    <button className={styles.nextBtn} onClick={onClickLastConfirm}>인증 확인</button>
                </div>
                {showEmailModal && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <p>이메일 형식이 올바르지 않습니다.</p>
                            <button onClick={closeModal}>닫기</button>
                        </div>
                    </div>
                )}
                {showCancelModal && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <p>정말 회원가입을 취소하시겠습니까?</p>
                            <button onClick={closeCancelModal}>아니오</button>
                            <button onClick={confirmCancel}>예</button>
                        </div>
                    </div>
                )}
                {showLastConfirmModal && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <p>이메일 중복 확인이 필요합니다.</p>
                            <button onClick={closeModal}>닫기</button>
                        </div>
                    </div>
                )}
                {showNumConfirmModal && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <p>인증번호가 맞지 않습니다.</p>
                            <button onClick={closeModal}>닫기</button>
                        </div>
                    </div>
                )}
                {showConfirmNextModal && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <p>이메일 인증 완료!</p>
                            <button onClick={handleNextPage}>확인</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default SignUpIdentity;