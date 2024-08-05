import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { PutAPIwoToken } from '../../../api/RestAPIs';

import CommonModal from '../../common/CommonModal';

import styles from './ResetPwd.module.css'

function ResetPwd({ user, setUser }) {

    const pwdRegEx = /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,12}$/;

    const [isPwdHide, setIsPwdHide] = useState(true);
    const [isConfirmPwdHide, setIsConfirmPwdHide] = useState(true);
    const [confirmPwd, setConfirmPwd] = useState('');
    const [modal, setModal] = useState({
        open: false,
        type: '',
        text: '',
    });

    const navigate = useNavigate();

    const onPwdChangeHandler = e => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const onConfirmPwdChangeHandler = e => {

        setConfirmPwd(e.target.value);
    };

    const onClickHandler = e => {

        e.preventDefault();

        setModal({ open: true, type: 'transfer', text: '비밀번호 변경을 취소합니다' });
    };

    const onSubmitHandler = async e => {

        e.preventDefault();

        if (user.userPass.length === 0) {

            setModal({ open: true, type: 'notice', text: '변경할 비밀번호를 입력하세요' });
        } else if (confirmPwd.length === 0) {

            setModal({ open: true, type: 'notice', text: '비밀번호 확인을 위해 한 번 더 입력하세요' });
        } else if (user.userPass !== confirmPwd) {

            setModal({ open: true, type: 'notice', text: '비밀번호가 일치하지 않습니다' });
        } else {

            const response = await PutAPIwoToken('/user/change/pwd', {
                id: user.userId,
                pwd: user.userPass,
            });

            if (response.status === 201) {

                setModal({ open: true, type: 'transfer', text: '비밀번호 변경 완료!' });
            } else {

                setModal({ open: true, type: 'notice', text: '비밀번호 변경 실패!' });
            };
        };
    };

    return (
        <>
            <form
                className={styles.inputBox}
                // onSubmit={onSubmitHandler}
            >
                <div className={styles.wrapBox}>
                    <label>비밀번호</label>
                    <input
                        type={isPwdHide ? 'password' : 'text'}
                        name='userPass'
                        value={user.userPass}
                        placeholder='변경할 비밀번호를 입력하세요'
                        onChange={onPwdChangeHandler}
                    />
                    {pwdRegEx.test(user.userPass) ?
                        <p style={{ color: "#63C54A", fontWeight: "500" }}>사용가능한 비밀번호입니다.</p>
                        :
                        <p>영문, 숫자, 특수문자 중 두 종류 이상 8~12자 이내</p>
                    }
                    <div
                        className={styles.pwdHideBox}
                        onClick={() => setIsPwdHide(prev => !prev)}
                    >
                        {isPwdHide ?
                            <img
                                src='./images/auth/pwd_hide.png'
                                alt='pwd_hide'
                            />
                            :
                            <img
                                src='./images/auth/pwd_eye.png'
                                alt='pwd_eye' />
                        }
                    </div>
                </div>
                <div className={styles.wrapBox}>
                    <label>비밀번호 확인</label>
                    <input
                        type={isConfirmPwdHide ? 'password' : 'text'}
                        value={confirmPwd}
                        placeholder='확인을 위해 다시 입력하시기 바랍니다.'
                        onChange={onConfirmPwdChangeHandler}
                    />
                    {!pwdRegEx.test(user.userPass) ?
                        <p></p>
                        :
                        (user.userPass === confirmPwd ?
                            <p style={{ color: "#63C54A", fontWeight: "500" }}>비밀번호가 일치합니다</p>
                            :
                            <p style={{ color: "#FF0000", fontWeight: "500" }}>비밀번호와 일치하지 않습니다</p>
                        )
                    }
                    <div
                        className={styles.pwdHideBox}
                        onClick={() => setIsConfirmPwdHide(prev => !prev)}>
                        {isConfirmPwdHide ?
                            <img
                                src='./images/auth/pwd_hide.png'
                                alt='pwd_hide'
                            />
                            :
                            <img
                                src='./images/auth/pwd_eye.png'
                                alt='pwd_eye'
                            />
                        }
                    </div>
                </div>
                <div className={styles.buttonBox}>
                    <button
                        className={styles.cancelButton}
                        onClick={onClickHandler}
                    >
                        취소
                    </button>
                    <button
                        type='submit'
                        className={styles.allowButton}
                        onClick={onSubmitHandler}
                    >
                        변경하기
                    </button>
                </div>
            </form>
            <CommonModal
                modal={modal}
                setModal={setModal}
                modalOnClickHandler={() => navigate('/')}
            />
        </>
    );
}

export default ResetPwd;