import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import styles from './Hamberger.module.css';

function Hamberger() {

    const [showButton, setShowButton] = useState(true);

    const navigate = useNavigate();

    return showButton && (
        <div className={styles.scroll__container}>
            <div className={styles.wrapBox}>
                <div style={{ display: "flex", }}>
                    <div className={styles.buttons}>
                        <div
                            className={styles.button__container}
                            onClick={() => navigate('/dict')}
                        >
                            <img src='./images/common/Dog.png'></img>
                        </div>
                        <div
                            className={styles.button__container}
                            onClick={() => navigate('/curation')}
                        >
                            <img src='./images/common/DogBowl.png'></img>
                        </div>
                        <div
                            className={styles.button__container}
                            onClick={() => navigate('/board')}
                        >
                            <img src='./images/common/Notepad.png'></img>
                        </div>
                        <div
                            className={styles.button__container}
                            onClick={() => navigate('/animalinfo')}
                        >
                            <img src='./images/common/Search.png'></img>
                        </div>
                        <div
                            className={styles.button__container}
                            onClick={() => navigate('/publicchat')}
                        >
                            <img src='./images/common/Chat.png'></img>
                        </div>
                    </div>
                    <div className={styles.button}>
                        <div className={styles.button__container}>
                            <img src='./images/common/BulletedList.png' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hamberger;