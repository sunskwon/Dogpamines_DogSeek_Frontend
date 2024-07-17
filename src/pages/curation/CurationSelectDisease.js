import styles from './CurationSelectDisease.module.css'
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function CurationSelectDisease() {

    const [disease, setDisease] = useState("");

    const location = useLocation();

    const { name, gender, breed, weight, size, age, neut, allergy } = location.state;

    const navigate = useNavigate();

    const onClick= () => {
        setDisease(disease)
        navigate("/curation-ingra", {
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
                <p className={styles.curationText}>{name}은/는 필요한 기능이 있나요?</p>
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
                    <option>골격강화</option>
                    <option>관절강화</option>
                    <option>구간건강</option>
                    <option>근육강화</option>
                    <option>근육발달</option>
                    <option>기력회복</option>
                    <option>눈건강</option>
                    <option>눈물자국</option>
                    <option>노화방지</option>
                    <option>다이어트</option>
                    <option>면역력강화</option>
                    <option>비뇨</option>
                    <option>성장발달</option>
                    <option>스트레스완화</option>
                    <option>심장건강</option>
                    <option>식욕증진</option>
                    <option>연골강화</option>
                    <option>영양공급</option>
                    <option>요로</option>
                    <option>운동효과증진</option>
                    <option>음수량증진</option>
                    <option>저알러지</option>
                    <option>장건강</option>
                    <option>종합비타민</option>
                    <option>피모개선</option>
                    <option>항산화</option>
                    <option>혈액건강</option>
                    <option>혈액순환</option>
                    <option>활력증진</option>
                </select>
                <button type="submit" className={isButtonEnabled ? styles.nextButtonActive : styles.nextButton} disabled={!isButtonEnabled} onClick={onClick}>다음</button>
            </div>    
        </div>    
    )
}

export default CurationSelectDisease;