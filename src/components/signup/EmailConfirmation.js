import { useState } from 'react';

import { PostAPIwoToken } from '../../api/RestAPIs';

import styles from './EmailConfirmation.module.css';

function EmailConfirmation({ signup, boolVerified, boolConfirmed, setBoolConfirmed }) {

    const [verifyNumber, setVerifyNumber] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState('');

    const onChangeHandler = e => {

        setVerifyNumber(e.target.value);
    };

    const onSubmitHandler = async e => {

        e.preventDefault();

        setBoolConfirmed(false);

        if (!boolVerified) {

            setModalText('이메일 중복 확인부터 진행하세요');
        } else {

            if (verifyNumber.length > 0) {

                const response = await PostAPIwoToken('/api/auth/verify-email', {
                    email: signup.email,
                    token: verifyNumber
                });

                if (response.headers.get('Result') === 'true') {

                    setBoolConfirmed(true);
                    setModalText('이메일 인증이 완료됐습니다');
                } else {

                    setModalText('인증번호가 일치하지 않습니다');
                };
            } else {

                setModalText('인증번호를 입력하세요');
            };
        };

        setModalOpen(true);
    };

    const onClickHandler = () => {

        setModalOpen(prev => !prev);
    };

    return (
        <>
            <div className={styles.numberBox}>
                <p>인증번호</p>
                <form
                    className={styles.inputBox}
                    onSubmit={onSubmitHandler}
                >
                    <input
                        type='text'
                        placeholder='전송 받은 6자리 인증번호를 입력해주세요.'
                        onChange={onChangeHandler}
                    />
                    {boolConfirmed ? (
                        <div className={styles.confirmBox}>
                            <img
                                src='./images/auth/check_icon.png'
                                alt=''
                            />
                        </div>
                    ) : (
                        <button
                            type='submit'
                            onClick={onSubmitHandler}
                        >
                            확인
                        </button>
                    )}
                </form>
            </div>
            {modalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.iconContainer}>
                            {boolConfirmed ?
                                <img
                                    src='./images/auth/modal_check.png'
                                    alt='modal_check'
                                />
                                :
                                <img
                                    src='./images/auth/exclamationmark_circle.png'
                                    alt='exclamation_circle'
                                />
                            }
                        </div>
                        <div className={styles.modalTextContainer}>
                            <p>{modalText}</p>
                        </div>
                        <div className={styles.btnContainer}>
                            <button onClick={onClickHandler}>닫기</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default EmailConfirmation;