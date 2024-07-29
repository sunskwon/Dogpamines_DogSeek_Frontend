import styles from './SignUpSteps.module.css';

function SignUpSteps({ step }) {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.titleBox}>
                    <p>회원가입</p>
                </div>
                <div className={styles.seqBox}>
                    <hr />
                    <div className={styles.wrapper}>
                        <div className={step === 1 ? styles.circleNow : styles.circle}>1</div>
                        <div className={step === 2 ? styles.circleNow : styles.circle}>2</div>
                        <div className={step === 3 ? styles.circleNow : styles.circle}>3</div>
                        <div className={step === 4 ? styles.circleNow : styles.circle}>4</div>
                    </div>
                </div>
                <div className={styles.txtBox}>
                    <p>약관동의</p>
                    <p>본인인증</p>
                    <p>정보입력</p>
                    <p>가입완료</p>
                </div>
            </div>
        </>
    );
}

export default SignUpSteps;