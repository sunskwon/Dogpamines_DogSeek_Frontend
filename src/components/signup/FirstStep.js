import { useState } from 'react';

import TermsOfUse from './firststep/TermsOfUse';
import ConsentToUse from './firststep/ConsentToUse';
import SignUpModal from './SignUpModal';

import styles from './FirstStep.module.css';

function FirstStep({ setStep }) {

    const [boolTermsOfUse, setBoolTermsOfUse] = useState(false);
    const [boolConsentToUse, setBoolConsentToUse] = useState(false);
    const [modal, setModal] = useState({
        modalOpen: false,
        modalType: '',
        modalText: '',
    });

    const onClickHandlerAllCheck = () => {

        if (boolTermsOfUse && boolConsentToUse) {
            setBoolTermsOfUse(false);
            setBoolConsentToUse(false);
        } else {
            setBoolTermsOfUse(true);
            setBoolConsentToUse(true);
        };
    };

    const onClickHandlerCancel = () => {

        setModal({
            modalOpen: true,
            modalType: 'confirm',
            modalText: '회원가입을 중단합니다',
        });
    };

    const onChangeHandler = e => {

        if (e.target.name === 'termsOfUse') {
            setBoolTermsOfUse(prev => !prev);
        } else if (e.target.name === 'consentToUse') {
            setBoolConsentToUse(prev => !prev);
        } else {
            return;
        };
    };

    const onSubmitHandler = () => {

        if (boolTermsOfUse && boolConsentToUse) {
            setStep(2);
        } else {
            setModal({
                modalOpen: true,
                modalType: 'notice',
                modalText: '필수 약관에 동의해야합니다',
            });
        };
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.subTitleBox}>
                    <p>약관동의</p>
                </div>
                <div className={styles.lTxtBox}>
                    <p className={styles.text1}>필수 약관을 동의하셔야 회원가입이 가능합니다.</p>
                    <p className={styles.text2}>회원가입을 위해서 아래 DogSeek 이용약관 및 개인정보 수집 및 이용안내를 확인 후 동의해 주세요.</p>
                    <div className={styles.checkBoxes}>
                        <div className={styles.checkboxContainer}>
                            <input
                                type="checkbox"
                                id='all'
                                checked={boolTermsOfUse && boolConsentToUse}
                                onChange={onClickHandlerAllCheck}
                            />
                            <label htmlFor='all'>전체 약관 동의</label>
                        </div>
                        <div className={styles.checkboxContainer}>
                            <input
                                type="checkbox"
                                id='termsOfUse'
                                name='termsOfUse'
                                checked={boolTermsOfUse}
                                onChange={onChangeHandler}
                            />
                            <label htmlFor='termsOfUse'>회원 서비스 이용 약관 (필수)</label>
                            <TermsOfUse />
                        </div>
                        <div className={styles.checkboxContainer}>
                            <input
                                type="checkbox"
                                id='consentToUse'
                                name='consentToUse'
                                checked={boolConsentToUse}
                                onChange={onChangeHandler}
                            />
                            <label htmlFor='consentToUse'>개인정보 수집 및 이용 동의 (필수)</label>
                            <ConsentToUse />
                        </div>
                        <div className={styles.buttonContainer}>
                            <button
                                className={styles.leftBtn}
                                onClick={onClickHandlerCancel}
                            >
                                취소
                            </button>
                            <button
                                className={styles.rightBtn}
                                onClick={onSubmitHandler}
                            >
                                다음
                            </button>
                        </div>
                    </div>
                </div>
                <SignUpModal
                    modal={modal}
                    setModal={setModal}
                />
            </div>
        </>
    );
}

export default FirstStep;
