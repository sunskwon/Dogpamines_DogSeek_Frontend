import { useState } from 'react';

import { PostAPIwoToken } from '../../../api/RestAPIs';

import styles from './PhoneConfirmation.module.css';

function PhoneConfirmation({ signup, setSignup, boolPhoneConfirm, setBoolPhoneConfirm }) {

    const phoneRegEx = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/;

    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState('');

    const onChangeHandler = e => {

        setBoolPhoneConfirm(false);

        setSignup({
            ...signup,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitHandler = async e => {

        e.preventDefault();

        setBoolPhoneConfirm(false);

        if (!phoneRegEx.test(signup.phone)) {

            setModalText('연락처 형식이 올바르지 않습니다');
        } else {

            const response = await PostAPIwoToken('/user/check', {
                type: 'phone',
                info: signup.phone
            });

            if (response.headers.get('Result') === 'true') {

                setBoolPhoneConfirm(true);
                setModalText('사용 가능한 연락처입니다');
            } else {

                setModalText('이미 가입된 연락처입니다');
            };
        };

        setModalOpen(true);
    };

    const onClickHandler = () => {

        setModalOpen(prev => !prev);
    };

    return (
        <>
            <div className={styles.phoneBox}>
                <label>연락처</label>
                <div className={styles.phoneInputBox}>
                    <form
                        className={styles.inputBox}
                        onSubmit={onSubmitHandler}
                    >
                        <input
                            type='tel'
                            name='phone'
                            value={signup.phone}
                            onChange={onChangeHandler}
                            pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}"
                            required
                        />
                        {boolPhoneConfirm ? (
                            <div className={styles.confirmBox}>
                                <img
                                    src='./images/auth/check_icon.png'
                                    alt='check_icon'
                                />
                            </div>
                        ) : (
                            <button
                                type='submit'
                                onClick={onSubmitHandler}
                            >
                                중복확인
                            </button>
                        )}
                    </form>
                    <p>이메일 찾기 시 사용되는 정보 입니다. ex) 010-0000-0000</p>
                </div>
            </div>
            {modalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.iconContainer}>
                            {boolPhoneConfirm ? (
                                <img src='./images/auth/modal_check.png' alt='modal_check'></img>
                            ) : (
                                <img src='./images/auth/exclamationmark_circle.png' alt='exclamation_circle'></img>
                            )}
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

export default PhoneConfirmation;