import styles from './CurationSelectAllergy.module.css'
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function CurationSelectAllergy() {

    const [allergy, setAllergy] = useState('');

    const location = useLocation();

    const { name } = location.state;
    const { gender } = location.state;
    const { breed } = location.state;
    const { weight } = location.state;
    const { size }  = location.state;
    const { age } = location.state;
    const { neut } = location.state;

    const navigate = useNavigate();

    const onClick= () => {
        setAllergy(allergy)
        navigate("/curationselectdisease", {
            state: { 
                name: name,
                gender: gender,
                breed: breed,
                weight: weight,
                size: size,
                age: age,
                neut: neut,
                allergy: allergy === 'none' ? "" : allergy
            }
        });
    };

    const onAllergyChange = (e) => setAllergy(e.target.value);
    const isButtonEnabled = allergy  

    return (
        <div>
            <div className={styles.mainBox}>
                <p className={styles.curationText}>{name}은/는 어떤 알러지가 있나요?</p>
                <div className={styles.barBox}>
                    <div className={styles.bar}></div>
                    <div>
                        <img className={styles.runDog} src='./images/curation/Vector.png'></img>
                    </div>
                    <div className={styles.progressBar}></div>    
                </div>
                <select className={styles.inputSize} name='allergy' onChange={onAllergyChange}>
                    <option value={"none"}>선택</option>
                    <option value={"none"}>없음</option>
                    <option>닭고기</option>
                    <option>소고기</option>
                    <option>돼지고기</option>
                    <option>연어</option>
                    <option>콩</option>
                </select>
                <button type="submit" className={isButtonEnabled ? styles.nextButtonActive : styles.nextButton} disabled={!isButtonEnabled} onClick={onClick}>다음</button>
            </div>    
        </div>    
    )
}

export default CurationSelectAllergy;