import React, { useState } from 'react';

import EmailVerification from './EmailVerification';
import EmailConfirmation from './EmailConfirmation';
import SignUpModal from './SignUpModal';

import styles from './SecondStep.module.css';

function SecondStep({ setStep, signup, setSignup }) {

    const [boolVerified, setBoolVerified] = useState(false);
    const [boolConfirmed, setBoolConfirmed] = useState(false);
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

    const onSubmitHandler = () => {

        if (boolVerified && boolConfirmed) {
            setStep(3);
        } else {
            setModal({
                modalOpen: true,
                modalType: 'notice',
                modalText: '이메일을 인증해야합니다',
            });
        };
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.subTitleBox}>
                    <p>본인인증</p>
                </div>
                <div className={styles.inputBoxes}>
                    <EmailVerification
                        signup={signup}
                        setSignup={setSignup}
                        boolVerified={boolVerified}
                        setBoolVerified={setBoolVerified}
                    />
                    <EmailConfirmation
                        signup={signup}
                        boolVerified={boolVerified}
                        boolConfirmed={boolConfirmed}
                        setBoolConfirmed={setBoolConfirmed}
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
                        disabled={!(boolVerified && boolConfirmed)}
                        className={styles.rightBtn}
                        onClick={onSubmitHandler}
                    >
                        다음
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

export default SecondStep;