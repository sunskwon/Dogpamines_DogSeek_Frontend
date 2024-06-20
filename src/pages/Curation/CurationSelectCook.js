import styles from './CurationSelectCook.module.css'
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function CurationSelectCook() {

    const [cook, setCook] = useState("");

    const location = useLocation();

    const { name } = location.state;
    const { gender } = location.state;
    const { breed } = location.state;
    const { weight } = location.state;
    const { size }  = location.state;
    const { age } = location.state;
    const { neut } = location.state;
    const { allergy } = location.state;
    const { disease } = location.state;
    const { ingra } = location.state;

    const navigate = useNavigate();

    const onClick= (cook) => {
        setCook(cook)
        navigate("/curationresult", {
            state: { 
                name: name,
                gender: gender,
                breed: breed,
                weight: weight,
                size: size,
                age: age,
                neut: neut,
                allergy: allergy,
                disease: disease,
                ingra: ingra,
                cook: cook
            }
        });
    };

    return(
        <div>
            <div className={styles.mainBox}>
                <p className={styles.curationText}>{name}은 어떤 조리방식을 선호하나요?</p>
                <div className={styles.barBox}>
                    <div className={styles.bar}></div>
                    <div>
                        <img className={styles.runDog} src='./images/curation/Vector.png'></img>
                    </div>
                    <div className={styles.progressBar}></div>    
                </div>
                <div className={styles.contentBox}>
                    <div className={styles.textAndBox} name='cook' onClick={() => onClick('건식')}>
                        <div className={styles.selectBox}>
                                <img></img>
                        </div>
                        <p className={styles.text}>건식</p>
                    </div>
                    <div className={styles.textAndBox} name='cook' onClick={() => onClick('습식')}>
                        <div className={styles.selectBox}>
                                <img></img>
                        </div>
                        <p className={styles.text}>습식</p>
                    </div>
                    <div className={styles.textAndBox} name='cook' onClick={() => onClick('화식')}>
                        <div className={styles.selectBox}>
                                <img></img>
                        </div>
                    <p className={styles.text}>화식</p>
                    </div>
                    <div className={styles.textAndBox} name='cook' onClick={() => onClick('소프트')}>
                        <div className={styles.selectBox}>
                                <img></img>
                        </div>
                    <p className={styles.text}>소프트</p>
                    </div>
                </div>
            </div>
        </div>        
    )
}

export default CurationSelectCook;