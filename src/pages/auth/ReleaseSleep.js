import styles from './ReleaseSleep.module.css';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { callEmailVerification, callEmailVerify, callUpdateSleep } from '../../api/RestAPIs';

function ReleaseSleep() {

    const [userId, setUserId] = useState('');
    const [authNum, setAuthNum] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const { id } = location.state;
    const onNumChange = (e) => setAuthNum(e.target.value);

    const [modal, setModal] = useState({
        state: false,
        isCheck: false,
        isOneBtn: true,
        text: '',
    });

    const onClickSend = async () => {
        const type = 'sleep';
        const sendResult = await callEmailVerification(userId, type);
        if (sendResult === 'true') {
            setModal({ ...modal, state: true, isCheck: true, isOneBtn: true, text: '인증번호가 발송되었습니다.' });
        } else {
            setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '인증번호 발송 실패.' });
        }

    }

    const onClickNumCheck = async () => {

        if (authNum.length !== 0) {
            console.log(`authNum.length : ${authNum.length}`)
            if (authNum.length === 6) {
                const result = await callEmailVerify(userId, authNum);

                if (result === 'true') {

                    const result = await callUpdateSleep(userId);

                    if (result === 'true') {
                        setModal({ ...modal, state: true, isCheck: true, isOneBtn: false, text: '휴면회원 해제 완료!' });
                    } else {
                        setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '휴면회원 해제 실패!' });
                    }

                } else {
                    setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '인증번호를 확인해주세요.' }); // 인증 실패
                }
            } else {
                setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '인증번호는 6자리 입니다.' });
            }
        } else {
            setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '인증번호를 입력해주세요.' });
        }
    }

    const closeModal = () => {
        setModal({ ...modal, state: false, text: '' });
    }

    const moveToMain = () => {
        navigate('/');
    }

    const moveToLogin = () => {
        navigate('/login');
    }

    useEffect(() => {
        setUserId(id);
    }, [userId]);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.titleBox}>
                        <p className={styles.title}>휴면회원 해제</p>
                    </div>
                    <div className={styles.infoBox}>
                        <div className={styles.idBox}>
                            <label>아이디</label>
                            <p>{userId}</p>
                            <button onClick={onClickSend}>전송</button>
                        </div>
                        <div className={styles.numBox}>
                            <label>인증번호</label>
                            <input value={authNum} placeholder='6자리 인증번호를 입력해주세요.' onChange={onNumChange}></input>
                            <button onClick={onClickNumCheck}>확인</button>
                        </div>
                    </div>
                </div>
                {modal.state && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <div className={styles.iconContainer}>
                                {modal.isCheck ? (
                                    <img src='../images/auth/modal_check.png' alt='modal_check'></img>
                                ) : (
                                    <img src='../images/auth/exclamationmark_circle.png' alt='exclamation_circle'></img>
                                )}
                            </div>
                            <div className={styles.modalTextContainer}>
                                <p>{modal.text}</p>
                            </div>
                            {modal.isOneBtn ? (
                                <button onClick={closeModal}>닫기</button>
                            ) : (
                                <div className={styles.btnContainer}>
                                    <button className={styles.leftBtn} onClick={moveToMain}>메인으로</button>
                                    <button className={styles.rightBtn} onClick={moveToLogin}>로그인</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ReleaseSleep;