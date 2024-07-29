import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import TermsOfUse from './TermsOfUse';
import ConsentToUse from './ConsentToUse';
import FirstStepModal from './FirstStepModal';

import styles from './FirstStep.module.css';

function FirstStep({ setStep }) {

    const [boolTermsOfUse, setBoolTermsOfUse] = useState(false);
    const [boolConsentToUse, setBoolConsentToUse] = useState(false);
    const [agreement, setAgreement] = useState({
        termsOfUse: false,
        consentToUse: false
    });

    const navigate = useNavigate();

    const onClickHandlerAllCheck = () => {

        console.log('hi');

        console.log(agreement.termsOfUse && agreement.consentToUse);

        if (agreement.termsOfUse && agreement.consentToUse) {
            setAgreement({
                termsOfUse: false,
                consentToUse: false
            });
        } else {
            setAgreement({
                termsOfUse: true,
                consentToUse: true
            });
        };
    };

    const onClickHandlerCancel = () => {

        navigate('/');
    };

    const onChangeHandler = e => {

        console.log(e.target.name);
        console.log(e.target.value);
        setAgreement({
            ...agreement,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitHandler = () => {

        if (agreement.termsOfUse && agreement.consentToUse) {
            setStep(2);
        } else {

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
                        <form onSubmit={onSubmitHandler}>
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
                                    checked={agreement.termsOfUse}
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
                                    checked={agreement.consentToUse}
                                    onChange={onChangeHandler}
                                />
                                <label htmlFor='consentToUse'>개인정보 수집 및 이용 동의 (필수)</label>
                                <ConsentToUse />
                            </div>
                            <div className={styles.buttonContainer}>
                                <div
                                    className={styles.leftBtn}
                                    onClick={onClickHandlerCancel}
                                >
                                    취소
                                </div>
                                <button
                                    className={styles.rightBtn}
                                    onClick={onSubmitHandler}
                                >
                                    다음
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <FirstStepModal />
            </div>
        </>
    );
}

export default FirstStep;
