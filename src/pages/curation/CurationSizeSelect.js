import styles from './CurationSizeSelect.module.css'
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function CurationSizeSelect() {

    const [size, setSize] = useState("");

    const location = useLocation();

    const { name, gender, breed, weight } = location.state;

    const navigate = useNavigate();

    const onClick= (size) => {
        setSize(size);
        navigate("/curation-age", {
            state: { 
                name: name,
                gender: gender,
                breed: breed,
                weight: weight,
                size: size
            }
        });
    };
    

    return(
        <div>
            <div className={styles.mainBox}>
                <p className={styles.curationText}>{name}은/는 어디에 속해 있나요?</p>
                <div className={styles.barBox}>
                    <div className={styles.bar}></div>
                    <div>
                        <img className={styles.runDog} src='./images/curation/Vector.png'></img>
                    </div>
                    <div className={styles.progressBar}></div>    
                </div>
                <div className={styles.contentBox}>
                    <div className={styles.textAndBox} name='size' onClick={() => onClick('소형견')}>
                        <div className={styles.selectBox}>
                            <div className={styles.circle}>
                                <img className={styles.img} src='./images/curation/smallDog.png'></img>
                            </div>
                        </div>
                        <p className={styles.text}>소형견</p>
                    </div>
                    <div className={styles.textAndBox} name='size' onClick={() => onClick('중형견')}>
                        <div className={styles.selectBox}>
                            <div className={styles.circle}>
                                <img className={styles.img} src='./images/curation/middleDog.png'></img>
                            </div>
                        </div>
                        <p className={styles.text}>중형견</p>
                    </div>
                    <div className={styles.textAndBox} name='size' onClick={() => onClick('대형견')}>
                        <div className={styles.selectBox}>
                            <div className={styles.circle}>
                                <img className={styles.img} src='./images/curation/bigDog.png'></img>
                            </div>
                        </div>
                    <p className={styles.text}>대형견</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurationSizeSelect;