import { useState, useEffect } from 'react';

import styles from './DogDetail.module.css';

function DogDetail({ dog }) {

    const [diseases, setDiseases] = useState([]);

    useEffect(() => {

        setDiseases(dog.dogDisease?.split(','));
    }, [dog]);

    return (
        <>
            <div className={styles.container}>
                <p className={styles.title}>세부사항</p>
                <div className={styles.boxes}>
                    <div className={styles.physicsBoxes}>
                        <div className={styles.physicsBox}>
                            <p className={styles.subtitle}>수컷</p>
                            <hr />
                            <div className={styles.contentBox}>
                                <p>체고</p>
                                <span>{dog.dogHeightM} cm</span>
                                <p>체중</p>
                                <span>{dog.dogWeightM} kg</span>
                            </div>
                        </div>
                        <div className={styles.physicsBox}>
                            <p className={styles.subtitle}>암컷</p>
                            <hr />
                            <div className={styles.contentBox}>
                                <p>체고</p>
                                <span>{dog.dogHeightF} cm</span>
                                <p>체중</p>
                                <span>{dog.dogWeightF} kg</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.diseaseBox}>
                        <p className={styles.subtitle}>취약질병</p>
                        <hr />
                        <div className={styles.overflowBox}>
                            {diseases?.map((disease, index) => (
                                <p key={index}>{disease}</p>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <p className={styles.subtitle}>생애주기</p>
                    <hr />
                    <div style={{ display: "flex", }}>
                        <div className={styles.ageBox}>
                            <p>유아기</p>
                            <span>{dog.dogChild}</span>
                        </div>
                        <div className={styles.ageBox}>
                            <p>청년기</p>
                            <span>{dog.dogYouth}</span>
                        </div>
                        <div className={styles.ageBox}>
                            <p>노년기</p>
                            <span>{dog.dogEld}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DogDetail;