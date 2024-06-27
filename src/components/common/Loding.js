import React from 'react';
import { Oval } from 'react-loader-spinner';
import styles from './Loding.module.css'

const Loding = () => {

    return(
        <>
        <div style={{height:"1000px"}}></div>
        <div className={styles.overlay}>
            <div className={styles.loding}>
                <Oval
            color='#FFFFFF'
            width={250}
            height={250}
            />    
            <img src='./images/etc/Vector-3.png' className={styles.img}></img>
            <div className={styles.textBox}>
                <p className={styles.text}>잠시만 기다려주세요...</p>
                <p className={styles.text}>추천 사료가 준비되고있습니다!</p>
            </div>
            </div>
        </div>
        </>
    );
}

export default Loding;