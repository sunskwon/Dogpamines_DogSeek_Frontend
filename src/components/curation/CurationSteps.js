import { useState, useEffect } from 'react';

import styles from './CurationSteps.module.css';

function CurationSteps({ step, curation }) {

    const [text, setText] = useState('');
    const [barWidth, setBarWidth] = useState();

    useEffect(() => {

        switch (step) {
            case(1): setText('당신의 강아지를 소개해주세요'); break;
            case(2): setText(`${curation.name}는/은 어디에 속해 있나요?`); break;
        };

        setBarWidth(120 * (step - 1));
    }, [step]);

    return (
        <>
            <div className={styles.container}>
                <p className={styles.stepTitle}>{text}</p>
                <div className={styles.barBox}>
                    <div
                        className={styles.progressBox}
                        style={{ width: `${barWidth + 40}px`, }}
                    >
                        <img
                            src='./images/curation/Vector.png'
                            alt=''
                        />
                        <div
                            className={styles.progressBar}
                            style={{ width: `${barWidth}px`, }}
                        >
                        </div>
                    </div>
                    <div className={styles.bar}></div>
                </div>
            </div>
        </>
    );
}

export default CurationSteps;