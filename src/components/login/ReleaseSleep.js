import { useState, useEffect } from 'react';

import { PostAPIwoToken, PutAPIwoToken } from '../../api/RestAPIs';

import CommonModal from '../common/CommonModal';

import styles from './ReleaseSleep.module.css';

function ReleaseSleep({ user, setUser, setIsReleaseSleep }) {

    useEffect(() => {
        setUser({
            ...user,
            userId: 'user04@gmail.com',
        });
    }, []);

    const [verifyNum, setVerifyNum] = useState("");
    const [modal, setModal] = useState({
        open: false,
        type: '',
        text: '',
    });
    const [modalOnClickFunction, setModalOnClickFunction] = useState(null);

    const onSendClickHandler = async e => {

        e.preventDefault();

        const response = await PostAPIwoToken('/api/auth/send-verification-email', {
            email: user.userId,
            type: 'sleep',
        });

        if (response.status === 200) {

            setModal({ open: true, type: 'allowed', text: '인증번호가 발송됐습니다' });
        } else {

            setModal({ open: true, type: 'warning', text: '인증번호 발송을 실패했습니다' });
        };
    };

    const onCancelClickHandler = e => {

        e.preventDefault();

        setModal({ open: true, type: 'confirm', text: '휴면 해제를 취소하시겠습니까?' });
        setModalOnClickFunction(() => () => setIsReleaseSleep(false));
    };

    const onChangeHandler = e => {

        setVerifyNum(e.target.value);
    };

    const onSubmitHandler = async e => {

        e.preventDefault();

        if (verifyNum.length === 0) {

            setModal({ open: true, type: 'warning', text: '인증번호를 입력하세요' });
        } else if (verifyNum.length !== 6) {

            setModal({ open: true, type: 'warning', text: '인증번호는 6자리 입니다' });
        } else {

            const response = await PostAPIwoToken('/api/auth/verify-email', {
                email: user.userId,
                token: verifyNum,
            });

            if (response.status !== 200) {

                setModal({ open: true, type: 'warning', text: '인증번호를 확인하세요' }); // 인증 실패
            } else {

                const result = await PutAPIwoToken('/user/release/sleep', {
                    id: user.userId,
                });

                if (result.status === 201) {

                    setModal({ open: true, type: 'allowed', text: '휴면회원 해제 완료!' });
                    setModalOnClickFunction(() => () => setIsReleaseSleep(false));
                } else {

                    setModal({ open: true, type: 'warning', text: '휴면회원 해제 실패!' });
                };
            };
        };
    };

    return (
        <>
            <div className={styles.releaseBox}>
                <div className={styles.inputBox}>
                    <div className={styles.wrapBox}>
                        <label>ID (E-MAIL)</label>
                        <div className={styles.checkBox}>
                            <p>{user.userId}</p>
                            <button
                                type='submit'
                                onClick={onSendClickHandler}
                            >
                                전송
                            </button>
                        </div>
                    </div>
                    <form
                        className={styles.wrapBox}
                        onSubmit={onSubmitHandler}
                    >
                        <label>인증번호</label>
                        <div className={styles.checkBox}>
                            <input
                                type='text'
                                placeholder='6자리 인증번호를 입력하세요'
                                value={verifyNum}
                                onChange={onChangeHandler}
                            />
                            <button onClick={onSubmitHandler}>확인</button>
                        </div>
                    </form>
                    <div className={styles.buttonBox}>
                        <button onClick={onCancelClickHandler}>취소</button>
                    </div>
                </div>
            </div>
            <CommonModal
                modal={modal}
                setModal={setModal}
                modalOnClickFunction={modalOnClickFunction}
            />
        </>
    );
}

export default ReleaseSleep;