import { useState } from 'react';

import { PostAPIwoToken } from '../../../api/RestAPIs';

import LoginModal from '../LoginModal';
import CommonModal from '../../common/CommonModal';

import styles from './IdConfirmation.module.css';

function IdConfirmation({ user, setUser, setIsIdConfirmed }) {

    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState('');
    const [modal, setModal] = useState({
        open: false,
        type: '',
        text: '',
    });
    const [verifyNumber, setVerifyNumber] = useState('');

    const onIdChangeHandler = e => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const onNumberChangeHandler = e => {

        try {

            setVerifyNumber(e.target.value);
        } catch (error) {
            console.error(error);
        };
    };

    const onIdSubmitHandler = async e => {

        e.preventDefault();

        if (user.userId.length === 0) {

            // setModalText('아이디를 입력하세요');
            setModal({ open: true, type: 'warning', text: '아이디를 입력하세요' });
        } else if (!emailRegEx.test(user.userId)) {

            // setModalText('이메일 형식이 올바르지 않습니다');
            setModal({ open: true, type: 'warning', text: '이메일 형식이 올바르지 않습니다' });
        } else {

            const response = await PostAPIwoToken('/user/check', {
                type: 'email',
                info: user.userId
            });

            if (response.headers.get('Result') === 'true') {

                // setModalText('존재하지 않는 아이디 입니다');
                setModal({ open: true, type: 'warning', text: '존재하지 않는 아이디입니다' });
            } else {

                const result = await PostAPIwoToken('/api/auth/send-verification-email', {
                    email: user.userId,
                    type: 'findPw',
                });

                if (result.status === 200) {

                    // setModalText('인증번호가 발송되었습니다');
                    setModal({ open: true, type: 'allowed', text: '인증번호가 발송됐습니다' });
                } else {

                    // setModalText('인증번호 발송에 실패했습니다');
                    setModal({ open: true, type: 'warning', text: '인증번호 발송에 실패했습니다' });
                };
            };
        };

        setModalOpen(true);
    };

    const onNumberSubmitHandler = async e => {

        e.preventDefault();

        if (verifyNumber.length === 0) {

            // setModalText('인증번호를 입력하세요');
            setModal({ open: true, type: 'warning', text: '인증번호를 입력하세요' });
        } else if (verifyNumber.length !== 6) {

            // setModalText('인증번호는 6자리 입니다');
            setModal({ open: true, type: 'warning', text: '인증번호는 6자리입니다' });
        } else {

            const response = await PostAPIwoToken('/api/auth/verify-email', {
                email: user.userId,
                token: verifyNumber,
            });

            if (response.headers.get('Result') === 'true') {

                // setModalText('이메일 인증 완료!');
                setModal({ open: true, type: 'transfer', text: '이메일 인증 완료!' });
                // setModalOnClickHandler(() => setIsIdConfirmed());
                // setIsIdConfirmed(true);
            } else {

                // setModalText('인증번호를 확인해주세요'); // 인증 실패
                setModal({ open: true, type: 'warning', text: '인증번호를 확인해주세요' });
            }
        };

        // setModalOpen(true);
    };

    return (
        <>
            <form
                className={styles.inputBox}
                onSubmit={onIdSubmitHandler}
            >
                <div className={styles.wrapBox}>
                    <label>ID(E-MAIL)</label>
                    <div className={styles.checkBox}>
                        <input
                            type='email'
                            name='userId'
                            placeholder='아이디(이메일)를 입력하세요'
                            value={user.userId}
                            onChange={onIdChangeHandler}
                            autoFocus
                        />
                        <button
                            type='submit'
                            onSubmit={onIdSubmitHandler}
                        >
                            전송
                        </button>
                    </div>
                </div>
            </form>
            <form
                className={styles.inputBox}
                onSubmit={onNumberSubmitHandler}
            >
                <div className={styles.wrapBox}>
                    <label>인증번호</label>
                    <div className={styles.checkBox}>
                        <input
                            type='text'
                            placeholder='6자리 인증번호를 입력하세요'
                            value={verifyNumber}
                            onChange={onNumberChangeHandler}
                            autoFocus
                        />
                        <button
                            type='submit'
                            onSubmit={onNumberSubmitHandler}
                        >
                            확인
                        </button>
                    </div>
                </div>
            </form>
            <div className={styles.buttonBox}>
                <button
                    type="submit"
                >
                    로그인
                </button>
            </div>
            {/* <LoginModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                modalText={modalText}
            /> */}
            <CommonModal
                modal={modal}
                setModal={setModal}
                modalOnClickHandler={() => setIsIdConfirmed(true)}
            />
        </>
    );
}

export default IdConfirmation;