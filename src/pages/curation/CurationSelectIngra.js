import styles from './CurationSelectIngra.module.css'
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function CurationSelectIngra() {

    const [ingra, setIngra] = useState("");

    const location = useLocation();

    const { name, gender, breed, weight, size, age, neut, allergy, disease } = location.state;

    const navigate = useNavigate();

    const onClick = (ingra) => {
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

    return (
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
                    <div className={styles.textAndBox} name='ingra' onClick={() => onClick('소고기')}>
                        <div className={styles.selectBox}>
                            <img src='./images/curation/cow.png' style={{ width: "80%" }}></img>
                        </div>
                        <p className={styles.text}>소고기</p>
                    </div>
                    <div className={styles.textAndBox} name='ingra' onClick={() => onClick('연어')}>
                        <div className={styles.selectBox}>
                            <img src='./images/curation/salmon.png' style={{ width: "70%" }}></img>
                        </div>
                        <p className={styles.text}>연어</p>
                    </div>
                    <div className={styles.textAndBox} name='ingra' onClick={() => onClick('오리고기')}>
                        <div className={styles.selectBox}>
                            <img src='./images/curation/duck.png' style={{ width: "80%" }}></img>
                        </div>
                        <p className={styles.text}>오리고기</p>
                    </div>
                    <div className={styles.textAndBox} name='ingra' onClick={() => onClick('닭고기')}>
                        <div className={styles.selectBox}>
                            <img src='./images/curation/chicken.png' style={{ width: "80%" }}></img>
                        </div>
                        <p className={styles.text}>닭고기</p>
                    </div>
                    <div className={styles.textAndBox} name='ingra' onClick={() => onClick('돼지고기')}>
                        <div className={styles.selectBox}>
                            <img src='./images/curation/pig.png' style={{ width: "80%" }}></img>
                        </div>
                        <p className={styles.text}>돼지고기</p>
                    </div>
                    <div className={styles.textAndBox} name='ingra' onClick={() => onClick('양고기')}>
                        <div className={styles.selectBox}>
                            <img src='./images/curation/sheep.png' style={{ width: "80%" }}></img>
                        </div>
                        <p className={styles.text}>양고기</p>
                    </div>
                    <div className={styles.textAndBox} name='ingra' onClick={() => onClick('정어리')}>
                        <div className={styles.selectBox}>
                            <img src='./images/curation/fish1.png' style={{ width: "80%" }}></img>
                        </div>
                        <p className={styles.text}>정어리</p>
                    </div>
                    <div className={styles.textAndBox} name='ingra' onClick={() => onClick('사슴고기')}>
                        <div className={styles.selectBox}>
                            <img src='./images/curation/deer.png' style={{ width: "80%" }}></img>
                        </div>
                        <p className={styles.text}>사슴고기</p>
                    </div>
                    <div className={styles.textAndBox} name='ingra' onClick={() => onClick('고등어')}>
                        <div className={styles.selectBox}>
                            <img src='./images/curation/fish2.png' style={{ width: "80%" }}></img>
                        </div>
                        <p className={styles.text}>고등어</p>
                    </div>
                    <div className={styles.textAndBox} name='ingra' onClick={() => onClick('칠면조')}>
                        <div className={styles.selectBox}>
                            <img src='./images/curation/turkey.png' style={{ width: "80%" }}></img>
                        </div>
                        <p className={styles.text}>칠면조</p>
                    </div>
                    <div className={styles.textAndBox} name='ingra' onClick={() => onClick('등애등에분말')}>
                        <div className={styles.selectBox}>
                            <img src='./images/curation/powder.png' style={{ width: "80%" }}></img>
                        </div>
                        <p className={styles.text}>등애등에분말</p>
                    </div>
                    <div className={styles.textAndBox} name='ingra' onClick={() => onClick('밀웜')}>
                        <div className={styles.selectBox}>
                            <img src='./images/curation/larva.png' style={{ width: "80%" }}></img>
                        </div>
                        <p className={styles.text}>밀웜</p>
                    </div>
                    <div className={styles.textAndBox} name='ingra' onClick={() => onClick('감자')}>
                        <div className={styles.selectBox}>
                            <img src='./images/curation/potato.png' style={{ width: "80%" }}></img>
                        </div>
                        <p className={styles.text}>감자</p>
                    </div>
                    <div className={styles.textAndBox} name='ingra' onClick={() => onClick('고구마')}>
                        <div className={styles.selectBox}>
                            <img src='./images/curation/sweetPotato.png' style={{ width: "80%" }}></img>
                        </div>
                        <p className={styles.text}>고구마</p>
                    </div>
                    <div className={styles.textAndBox} name='ingra' onClick={() => onClick('청어')}>
                        <div className={styles.selectBox}>
                            <img src='./images/curation/fish3.png' style={{ width: "70%" }}></img>
                        </div>
                        <p className={styles.text}>청어</p>
                    </div>
                    <div className={styles.textAndBox} name='ingra' onClick={() => onClick('참치')}>
                        <div className={styles.selectBox}>
                            <img src='./images/curation/fish4.png' style={{ width: "80%" }}></img>
                        </div>
                        <p className={styles.text}>참치</p>
                    </div>
                    <div className={styles.textAndBox} name='ingra' onClick={() => onClick('유기농')}>
                        <div className={styles.selectBox}>
                            <img src='./images/curation/fresh.png' style={{ width: "70%" }}></img>
                        </div>
                        <p className={styles.text}>유기농 재료</p>
                    </div>
                    <div className={styles.textAndBox} name='ingra' onClick={() => onClick('송어')}>
                        <div className={styles.selectBox}>
                            <img src='./images/curation/fish5.png' style={{ width: "75%" }}></img>
                        </div>
                        <p className={styles.text}>송어</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurationSelectIngra;