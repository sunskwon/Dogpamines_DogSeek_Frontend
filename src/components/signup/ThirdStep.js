import React, { useState } from 'react';

import { PostAPIwoToken } from '../../api/RestAPIs';

import NickConfirmation from './thirdstep/NickConfirmation';
import PwdConfirmation from './thirdstep/PwdConfirmation';
import PhoneConfirmation from './thirdstep/PhoneConfirmation';
import SignUpModal from './SignUpModal';

import styles from './ThirdStep.module.css';

function ThirdStep({ setStep, signup, setSignup }) {

    const [boolNickConfirm, setBoolNickConfirm] = useState(false);
    const [boolPwdConfirm, setBoolPwdConfirm] = useState(false);
    const [boolPhoneConfirm, setBoolPhoneConfirm] = useState(false);
    const [modal, setModal] = useState({
        modalOpen: false,
        modalType: '',
        modalText: '',
    });

    const onClickHandler = () => {

        setModal({
            modalOpen: true,
            modalType: 'confirm',
            modalText: '회원가입을 중단합니다'
        });
    };

    const onSubmitHandler = async () => {

        const response = await PostAPIwoToken('/signup', {
            userId: signup.email,
            userPass: signup.pwd,
            userNick: signup.nick,
            userPhone: signup.phone,
        });

        if (response.headers.get('Result') === 'true') {
            setStep(4);
        } else {
            setModal({
                modalOpen: true, 
                modalType: 'notice', 
                modalText: '회원가입에 실패했습니다' 
            });
        };
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.subTitleBox}>
                    <p>정보입력</p>
                </div>
                <div className={styles.lTxtBox}>
                    <div className={styles.starBox}>
                        <span className={styles.star}>*</span>
                    </div>
                    <div className={styles.infoTxtBox}>
                        <span className={styles.infoTxt}>회원정보</span>
                        <span className={styles.lTxt}>필수입력 항목입니다. 모든 항목의 회원 정보를 빈 칸 없이 입력해주세요.</span>
                    </div>
                </div>
                <div className={styles.inputBoxes}>
                    <div className={styles.emailBox}>
                        <p>아이디(이메일)</p>
                        <span>{signup.email}</span>
                    </div>
                    <NickConfirmation
                        signup={signup}
                        setSignup={setSignup}
                        boolNickConfirm={boolNickConfirm}
                        setBoolNickConfirm={setBoolNickConfirm}
                    />
                    <PwdConfirmation
                        signup={signup}
                        setSignup={setSignup}
                        boolPwdConfirm={boolPwdConfirm}
                        setBoolPwdConfirm={setBoolPwdConfirm}
                    />
                    <PhoneConfirmation
                        signup={signup}
                        setSignup={setSignup}
                        boolPhoneConfirm={boolPhoneConfirm}
                        setBoolPhoneConfirm={setBoolPhoneConfirm}
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.leftBtn}
                        onClick={onClickHandler}
                    >
                        취소
                    </button>
                    <button
                        disabled={!(boolNickConfirm && boolPwdConfirm && boolPhoneConfirm)}
                        className={styles.rightBtn}
                        onClick={onSubmitHandler}
                    >
                        완료
                    </button>
                </div>
                <SignUpModal
                    modal={modal}
                    setModal={setModal}
                />
            </div>
        </>
    );
}

export default ThirdStep;