import { useState, useEffect } from 'react';

import { PostAPIwoToken } from '../../api/RestAPIs';

import LoginModal from './LoginModal';

import style from './FindEmail.module.css';

function FindEmail({ user, setUser, setIsFindId }) {

    const phoneRegEx = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/;

    const [phoneNumber, setPhoneNumber] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState('');
    const [userId, setUserId] = useState('');
    const [signupDate, setSignupDate] = useState('');
    const [resultModalOpen, setResultModalOpen] = useState(false);

    useEffect(() => {

        if (resultModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        };
    }, [resultModalOpen]);

    // 이메일 마스킹 함수 정의
    const maskEmail = (email) => {
        const [localPart, domainPart] = email.split('@');

        // 숫자를 *로 치환
        let maskedLocalPart = localPart.replace(/\d/g, '*');

        // 숫자가 없으면 뒤에서 세 글자를 *로 치환
        if (!/\d/.test(localPart)) {
            const length = maskedLocalPart.length;
            maskedLocalPart = length <= 3
                ? '*'.repeat(length)
                : maskedLocalPart.slice(0, length - 3) + '***';
        }

        return `${maskedLocalPart}@${domainPart}`;
    };

    const onChangeHandler = e => {

        setPhoneNumber(e.target.value);
    };

    const onSubmitHandler = async e => {

        e.preventDefault();


        if (phoneNumber.length === 0) {

            setModalText('연락처를 입력하세요');
        } else if (!phoneRegEx.test(phoneNumber)) {

            setModalText('올바르지 않은 연락처 형식입니다');
        } else {

            try {
                const response = await PostAPIwoToken('/user/find/email', {
                    phoneNumber: phoneNumber
                });

                if (!response.headers.get('Result')) {

                    setModalText('일치하는 정보가 없습니다');
                } else {

                    const cleanedResult = response.headers.get('Result').replace(/{|}/g, '');

                    const resultObject = cleanedResult.split(', ').reduce((acc, current) => {
                        const [key, value] = current.split('=');
                        acc[key] = value;
                        return acc;
                    }, {});

                    const signupDate = resultObject.signupDate;
                    const userId = resultObject.userId;
                    const maskedUserId = maskEmail(userId);

                    setSignupDate(signupDate);
                    setUserId(maskedUserId);
                    setResultModalOpen(true);

                    return;
                }
            } catch (error) {
                console.error(error);
            }
        }

        setModalOpen(true);
    };

    const onClickHandler = () => {

        setUser({
            ...user,
            userId: userId
        });
        setIsFindId(false);
    };

    return (
        <>
            <div className={style.findEmailBox}>
                <form
                    className={style.inputBox}
                    onSubmit={onSubmitHandler}
                >
                    <div className={style.wrapBox}>
                        <label>연락처</label>
                        <input
                            type='tel'
                            placeholder='회원가입시 입력한 연락처를 입력해주세요.'
                            pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}"
                            value={phoneNumber}
                            onChange={onChangeHandler}
                            required
                        />
                        <p>ex) 010-0000-0000</p>
                    </div>
                    <div className={style.buttonBox}>
                        <button
                            type='submit'
                            className={style.rightBtn}
                            onClick={onSubmitHandler}
                        >
                            조회하기
                        </button>
                    </div>
                </form>
            </div>
            {resultModalOpen && (
                <div className={style.modal}>
                    <div className={style.modalContent}>
                        <div className={style.iconContainer}>
                            <img
                                src='./images/auth/modal_check.png'
                                alt='modal_check'
                            />
                        </div>
                        <div className={style.modalTextContainer}>
                            <p>다음과 같은 정보가 확인됐습니다</p>
                            <div className={style.wrapTextBox}>
                                <span>아이디:</span>
                                <p>{userId}</p>
                            </div>
                            <div className={style.wrapTextBox}>
                                <span>가입일:</span>
                                <p>{signupDate}</p>
                            </div>
                        </div>
                        <div className={style.modalButtonContainer}>
                            <button className={style.leftBtn} onClick={() => setIsFindId(false)}>돌아가기</button>
                            <button className={style.rightBtn} onClick={onClickHandler}>로그인</button>
                        </div>
                    </div>
                </div>
            )}
            <LoginModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                modalText={modalText}
            />
        </>
    );
}

export default FindEmail;