import styles from './CurationSelectIngra.module.css'
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function CurationSelectIngra() {

    const [ingra, setIngra] = useState("");

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

    const navigate = useNavigate();

    const onClick= (ingra) => {
        setIngra(ingra)
        navigate("/curationselectcook", {
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
                ingra: ingra
            }
        });
    };

    return(
        <div>
            <div className={styles.mainBox}>
                <p className={styles.curationText}>{name}은/는 어떤 재료를 좋아하나요?</p>
                <div className={styles.barBox}>
                    <div className={styles.bar}></div>
                    <div>
                        <img className={styles.runDog} src='./images/curation/Vector.png'></img>
                    </div>
                    <div className={styles.progressBar}></div>    
                </div>
                <div className={styles.contentBox}>
                    <div className={styles.textAndBox} name='ingra' onClick={() => onClick('연어')}>
                        <div className={styles.selectBox}>
                                <img></img>
                        </div>
                        <p className={styles.text}>연어</p>
                    </div>
                    <div className={styles.textAndBox} name='ingra' onClick={() => onClick('청어')}>
                        <div className={styles.selectBox}>
                                <img></img>
                        </div>
                        <p className={styles.text}>청어</p>
                    </div>
                    <div className={styles.textAndBox} name='ingra' onClick={() => onClick('오리')}>
                        <div className={styles.selectBox}>
                                <img></img>
                        </div>
                    <p className={styles.text}>오리</p>
                    </div>
                    <div className={styles.textAndBox} name='ingra' onClick={() => onClick('닭고기')}>
                        <div className={styles.selectBox}>
                                <img></img>
                        </div>
                    <p className={styles.text}>닭고기</p>
                    </div>
                </div>
            </div>
        </div>        
    )
}

export default CurationSelectIngra;