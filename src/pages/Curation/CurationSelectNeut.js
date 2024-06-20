import styles from './CurationSelectNeut.module.css'
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function CurationSelectNeut() {

    const [neut, setNeut] = useState("");

    const location = useLocation();

    const { name } = location.state;
    const { gender } = location.state;
    const { breed } = location.state;
    const { weight } = location.state;
    const { size }  = location.state;
    const { age } = location.state;

    const navigate = useNavigate();

    const onClick= (neut) => {
        setNeut(neut)
        navigate("/curationselectallergy", {
            state: { 
                name: name,
                gender: gender,
                breed: breed,
                weight: weight,
                size: size,
                age: age,
                neut: neut
            }
        });
    };

    return(
        <div>
            <div className={styles.mainBox}>
                <p className={styles.curationText}>{name}은/는 중성화 수술을 했나요?</p>
                <div className={styles.barBox}>
                    <div className={styles.bar}></div>
                    <div>
                        <img className={styles.runDog} src='./images/curation/Vector.png'></img>
                    </div>
                    <div className={styles.progressBar}></div>    
                </div>
                <div className={styles.contentBox}>
                    <div className={styles.textAndBox} name='neut' onClick={() => onClick('O')}>
                        <div className={styles.selectBox}>
                                <img src='./images/curation/circle.png'></img>
                        </div>
                        <p className={styles.text}>네</p>
                    </div>
                    <div className={styles.textAndBox} name='neut' onClick={() => onClick('X')}>
                        <div className={styles.selectBox}>
                                <img src='./images/curation/x.png'></img>
                        </div>
                        <p className={styles.text}>아니요</p>
                    </div>
                </div>
            </div>
        </div>        
    )
}

export default CurationSelectNeut;