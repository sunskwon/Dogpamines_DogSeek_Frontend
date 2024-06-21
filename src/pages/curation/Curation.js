import styles from './Curation.module.css'
import Loding from '../../components/common/Loding';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Curation(){

    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [breed, setBreed] = useState("");
    const [weight, setWeight] = useState("");

    const navigate = useNavigate();
    
    const onClick = () => {
        setName(name);
        setGender(gender);
        setBreed(breed);
        setWeight(weight);
        navigate("/curationsizeselect", { 
            state: { 
                name: name,
                gender: gender,
                breed: breed,
                weight: weight
            }
        });
    };

    const onNameChange = (e) => setName(e.target.value);
    const onGenderChange = (e) => setGender(e.target.value);
    const onBreedChange = (e) => setBreed(e.target.value);
    const onWeightChange = (e) => setWeight(e.target.value);
    const isButtonEnabled = name && gender && breed && weight;

    return(
        <div>
            <div className={styles.mainBox}>
                <p className={styles.curationText}>당신의 강아지를 소개 시켜주세요</p>
                <div className={styles.progressBar}></div>
                <div className={styles.contentBox}>
                    <div className={styles.textBox}>
                        <p className={styles.text}>이름</p>
                        <p className={styles.text}>성별</p>
                        <p className={styles.text}>견종</p>
                        <p className={styles.text}>몸무게</p>
                    </div>
                    <hr className={styles.hr}></hr>
                    <div className={styles.inputBox}>
                        <input className={styles.inputSize} type='text' placeholder='강아지 이름을 입력해주세요' name='name' onChange={onNameChange}></input>
                        <select className={styles.inputSize} name='gender' onChange={onGenderChange}>
                            <option>선택</option>
                            <option>남</option>
                            <option>여</option>
                        </select>
                        <select className={styles.inputSize} name='breed' onChange={onBreedChange}>
                            <option>선택</option>
                            <option>말티즈</option>
                            <option>치와와</option>
                            <option>푸들</option>
                            <option>비글</option>
                        </select>
                        <input className={styles.inputSize} type='text' placeholder='강아지 몸무게를 입력해주세요 ex) 4.4kg' name='weight' onChange={onWeightChange}></input>
                    </div>
                </div>
                <button type="submit" className={isButtonEnabled ? styles.nextButtonActive : styles.nextButton} disabled={!isButtonEnabled} onClick={onClick}>다음</button>
            </div>
        </div>
    )
}

export default Curation;