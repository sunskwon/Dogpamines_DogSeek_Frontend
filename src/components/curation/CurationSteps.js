import styles from './CurationSteps.module.css';

function CurationSteps({ step }) {

    return (
        <>
            <div className={styles.container}>
                <p className={styles.stepTitle}>
                    {step === 1 ? '당신의 강아지를 소개해주세요' : ''}
                </p>
                <div className={styles.barBox}>
                    <div className={styles.dogBox}>
                        <img
                            src='./images/curation/Vector.png'
                            alt=''
                            style={{ visibility: step === 1 ? 'none' : 'hidden' }}
                            />
                        <img
                            src='./images/curation/Vector.png'
                            alt=''
                            style={{ visibility: step === 2 ? 'none' : 'hidden' }}
                            />
                        <img
                            src='./images/curation/Vector.png'
                            alt=''
                            style={{ visibility: step === 3 ? 'none' : 'hidden' }}
                            />
                        <img
                            src='./images/curation/Vector.png'
                            alt=''
                            style={{ visibility: step === 4 ? 'none' : 'hidden' }}
                            />
                        <img
                            src='./images/curation/Vector.png'
                            alt=''
                            style={{ visibility: step === 5 ? 'none' : 'hidden' }}
                            />
                        <img
                            src='./images/curation/Vector.png'
                            alt=''
                            style={{ visibility: step === 6 ? 'none' : 'hidden' }}
                            />
                        <img
                            src='./images/curation/Vector.png'
                            alt=''
                            style={{ visibility: step === 7 ? 'none' : 'hidden' }}
                            />
                        <img
                            src='./images/curation/Vector.png'
                            alt=''
                            style={{ visibility: step === 8 ? 'none' : 'hidden' }}
                            />
                        <img
                            src='./images/curation/Vector.png'
                            alt=''
                            style={{ visibility: step === 9 ? 'none' : 'hidden' }}
                        />
                    </div>
                    <div className={styles.progressBar}></div>
                </div>
            </div>
        </>
    );
}

export default CurationSteps;