import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { callLoginAPI } from "../../api/RestAPIs";

import { jwtDecode } from 'jwt-decode';

import LoginModal from './LoginModal';
import CommonModal from '../../components/common/CommonModal';

import styles from "./SignIn.module.css";

function SignIn({ user, setUser, setIsReleaseSleep }) {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState('');
    const [modal, setModal] = useState({
        open: false,
        type: '',
        text: '',
    });
    const [modalOnClickFunction, setModalOnClickFunction] = useState();
    const [sleepModalOpen, setSleepModalOpen] = useState(false);

    const navigate = useNavigate();

    const onChangeHandler = e => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitHandler = async e => {

        e.preventDefault();

        if (user.userId.length === 0) {
            setModal({
                open: true,
                type: 'notice',
                text: '아이디(이메일)를 입력하세요',
            });
        } else if (user.userPass.length === 0) {
            setModal({
                open: true,
                type: 'notice',
                text: '비밀번호를 입력하세요'
            });
        } else {
            const response = await callLoginAPI({ user });

            if (response === 'true') {

                const decodedToken = jwtDecode(window.localStorage.getItem("accessToken"));
                const userAuth = decodedToken.userAuth;

                if (userAuth === 'ADMIN') {
                    return navigate('/admin');
                } else if (userAuth === 'USER') {
                    return navigate('/');
                } else {
                    setModal({
                        open: true,
                        type: 'notice',
                        text: '올바르지 않은 접근입니다'
                    });
                };
            } else if (response === 'SLEEP') {
                setSleepModalOpen(true);
            } else {
                setModal({
                    open: true,
                    type: 'notice',
                    text: '일치하는 회원 정보가 없습니다'
                });
            };
        };
    };

    const onClickHandler = () => {

        setIsReleaseSleep(true);
    }

    return (
        <>
            <div className={styles.signinBox}>
                <form
                    className={styles.inputBox}
                    onSubmit={onSubmitHandler}
                >
                    <div className={styles.wrapBox}>
                        <label>ID(E-MAIL)</label>
                        <input
                            type="email"
                            name='userId'
                            placeholder="아이디(이메일)를 입력하세요."
                            value={user.userId}
                            onChange={onChangeHandler}
                            autoFocus
                        />
                    </div>
                    <div className={styles.wrapBox}>
                        <label>PASSWORD</label>
                        <input
                            type="password"
                            name='userPass'
                            placeholder="비밀번호를 입력해주세요."
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className={styles.buttonBox}>
                        <button
                            type="submit"
                            onClick={onSubmitHandler}
                        >
                            로그인
                        </button>
                    </div>
                </form>
            </div>
            <LoginModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                modalText={modalText}
            />
            <CommonModal
                modal={modal}
                setModal={setModal}
                modalOnClickFunction={modalOnClickFunction}
            />
            {sleepModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.sleepModalContent}>
                        <div className={styles.iconContainer}>
                            <img
                                src='./images/auth/auth_sleep.png'
                                alt='auth_sleep'
                            />
                        </div>
                        <div className={styles.modalTextContainer}>
                            <p>회원님의 계정은 현재 휴면 상태 입니다</p>
                        </div>
                        <button onClick={onClickHandler}>휴면 해제 하기</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default SignIn;