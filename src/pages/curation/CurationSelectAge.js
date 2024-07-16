import styles from './CurationSelectAge.module.css'
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function CurationSelectAge() {

    const [age, setAge] = useState("");

    const location = useLocation();

    const { name, gender, breed, weight, size } = location.state;

    const navigate = useNavigate();

    const onClick= (age) => {
        setAge(age);
        navigate("/curation-neut", {
            state: { 
                name: name,
                gender: gender,
                breed: breed,
                weight: weight,
                size: size,
                age: age
            }
        });
    };

    return(
        <div>
            <div className={styles.mainBox}>
                <p className={styles.curationText}>{name}은/는 어디에 속해있나요?</p>
                <div className={styles.barBox}>
                    <div className={styles.bar}></div>
                    <div>
                        <img className={styles.runDog} src='./images/curation/Vector.png'></img>
                    </div>
                    <div className={styles.progressBar}></div>    
                </div>
                <div className={styles.contentBox}>
                    <div className={styles.textAndBox} name='age' onClick={() => onClick('유아기')}>
                        <div className={styles.selectBox}>
                                <img src='./images/curation/womanAndDog.png'></img>
                        </div>
                        <p className={styles.text}>유아기</p>
                    </div>
                    <div className={styles.textAndBox} name='age' onClick={() => onClick('청년기')}>
                        <div className={styles.selectBox}>
                                <img src='./images/curation/girlAndDog.png'></img>
                        </div>
                        <p className={styles.text}>청년기</p>
                    </div>
                    <div className={styles.textAndBox} name='age' onClick={() => onClick('노년기')}>
                        <div className={styles.selectBox}>
                                <img src='./images/curation/dog.png'></img>
                        </div>
                    <p className={styles.text}>노년기</p>
                    </div>
                </div>
            </div>
        </div>        
    )
}

export default CurationSelectAge