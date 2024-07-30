import { useState } from 'react';

import { PostAPIwoToken } from '../../api/RestAPIs';

import styles from './EmailVerification.module.css';

function EmailVerification({ signup, setSignup, boolVerified, setBoolVerified }) {

    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState('');

    const onChangeHandler = e => {

        setSignup({
            ...signup,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitHandler = async e => {

        e.preventDefault();

        setBoolVerified(false);

        if (signup.email.length > 0 && emailRegEx.test(signup.email)) {

            const response = await PostAPIwoToken('/user/check', {
                type: 'email',
                info: signup.email
            });

            if (response.headers.get('Result') === 'true') {

                const request = await PostAPIwoToken('/api/auth/send-verification-email', {
                    type: 'signup',
                    email: signup.email
                });

                if (request.status === 200) {

                    setBoolVerified(true);
                    setModalText('인증번호가 발송됐습니다');
                } else {

                    setModalText('인증번호 발송에 실패했습니다');
                }
            } else {

                setModalText('이미 가입된 이메일 주소입니다');
            };
        } else {

            setModalText('이메일 형식이 올바르지 않습니다');
        };

        setModalOpen(true);
    };

    const onClickHandler = () => {

        setModalOpen(prev => !prev);
    };

    return (
        <>
            <div className={styles.emailBox}>
                <p>이메일</p>
                <form
                    className={styles.inputBox}
                    onSubmit={onSubmitHandler}
                >
                    <input
                        type='email'
                        name='email'
                        placeholder='이메일 주소를 입력하세요'
                        value={signup.email}
                        onChange={onChangeHandler}
                    />
                    {boolVerified ? (
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
                            중복 확인
                        </button>
                    )}
                </form>
            </div >
            {modalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.iconContainer}>
                            {boolVerified ?
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

export default EmailVerification;