import styles from './CurationSelectAllergy.module.css'
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function CurationSelectAllergy() {

    const [allergy, setAllergy] = useState('');

    const location = useLocation();

    const { name, gender, breed, weight, size, age, neut } = location.state;

    const navigate = useNavigate();

    const onClick= () => {
        setAllergy(allergy)
        navigate("/curation-disease", {
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
                    <option>소고기</option>
                    <option>연어</option>
                    <option>오리고기</option>
                    <option>닭고기</option>
                    <option>돼지고기</option>
                    <option>양고기</option>
                    <option>정어리</option>
                    <option>사슴고기</option>
                    <option>고등어</option>
                    <option>칠면조</option>
                    <option>등애등에분말</option>
                    <option>밀웜</option>
                    <option>감자</option>
                    <option>고구마</option>
                    <option>청어</option>
                    <option>참치</option>
                    <option>송어</option>
                    <option>비트</option>
                    <option>허브</option>
                    <option>라즈베리</option>
                    <option>블루베리</option>
                    <option>당근</option>
                    <option>호박</option>
                    <option>코코넛</option>
                    <option>석류</option>
                    <option>사과</option>
                    <option>계란</option>
                    <option>토마토</option>
                    <option>콩</option>
                    <option>녹두</option>
                    <option>딸기</option>
                    <option>치즈</option>
                    <option>크렌베리</option>
                    <option>망고</option>
                    <option>자두</option>
                    <option>바나나</option>
                    <option>초록입홍합</option>
                    <option>배</option>
                </select>
                <button type="submit" className={isButtonEnabled ? styles.nextButtonActive : styles.nextButton} disabled={!isButtonEnabled} onClick={onClick}>다음</button>
            </div>    
        </div>    
    )
}

export default CurationSelectAllergy;