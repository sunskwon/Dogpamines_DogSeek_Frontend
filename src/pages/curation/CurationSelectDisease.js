import styles from './CurationSelectDisease.module.css'
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function CurationSelectDisease() {

    const [disease, setDisease] = useState("");

    const location = useLocation();

    const { name } = location.state;
    const { gender } = location.state;
    const { breed } = location.state;
    const { weight } = location.state;
    const { size }  = location.state;
    const { age } = location.state;
    const { neut } = location.state;
    const { allergy } = location.state;

    const navigate = useNavigate();

    const onClick= () => {
        setDisease(disease)
        navigate("/curationselectingra", {
            state: { 
                name: name,
                gender: gender,
                breed: breed,
                weight: weight,
                size: size,
                age: age,
                neut: neut,
                allergy: allergy,
                disease: disease === 'none' ? "" : disease
            }
        });
    };

    const onDiseaseChange = (e) => setDisease(e.target.value);
    const isButtonEnabled = disease;

    return (
        <div>
            <div className={styles.mainBox}>
                <p className={styles.curationText}>{name}은/는 어떤 질병및 질환이 있나요?</p>
                <div className={styles.barBox}>
                    <div className={styles.bar}></div>
                    <div>
                        <img className={styles.runDog} src='./images/curation/Vector.png'></img>
                    </div>
                    <div className={styles.progressBar}></div>    
                </div>
                <select className={styles.inputSize} name='disease' onChange={onDiseaseChange}>
                    <option value={"none"}>선택</option>
                    <option value={"none"}>없음</option>
                    <option>관절</option>
                    <option>피부</option>
                    <option>모질</option>
                    <option>과체중</option>
                    <option>면역</option>
                </select>
                <button type="submit" className={isButtonEnabled ? styles.nextButtonActive : styles.nextButton} disabled={!isButtonEnabled} onClick={onClick}>다음</button>
            </div>    
        </div>    
    )
}

export default CurationSelectDisease;