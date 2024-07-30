import { useState } from 'react';

import { PostAPIwoToken } from '../../api/RestAPIs';

import styles from './NickConfirmation.module.css';

function NickConfirmation({ signup, setSignup, boolNickConfirm, setBoolNickConfirm }) {

    const nickRegEx = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,7}$/;

    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState('');

    const onChangeHandler = e => {

        setBoolNickConfirm(false);

        setSignup({
            ...signup,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitHandler = async e => {

        e.preventDefault();

        setBoolNickConfirm(false);

        if (!nickRegEx.test(signup.nick)) {

            setModalText('닉네임 형식이 올바르지 않습니다');
        } else {

            const response = await PostAPIwoToken('/user/check', {
                type: 'nick',
                info: signup.nick
            });

            if (response.headers.get('Result') === 'true') {

                setBoolNickConfirm(true);
                setModalText('사용 가능한 닉네임입니다');
            } else {

                setModalText('사용중인 닉네임입니다');
            };
        };

        setModalOpen(true);
    };

    const onClickHandler = () => {

        setModalOpen(prev => !prev);
    };

    return (
        <>
            <div className={styles.nickBox}>
                <p>닉네임</p>
                <div className={styles.nickInputTxtBox}>
                    <form
                        className={styles.inputBox}
                        onSubmit={onSubmitHandler}
                    >
                        <input
                            type='text'
                            name='nick'
                            value={signup.nick}
                            onChange={onChangeHandler}
                        />
                        {boolNickConfirm ? (
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
                    <p>한글, 영문, 숫자 사용 가능 2~7자 이내</p>
                </div>
            </div>
            {modalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.iconContainer}>
                            {boolNickConfirm ? (
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

export default NickConfirmation;