import styles from './CurationSelectAge.module.css'

function CurationSelectAge() {

    return(
        <div>
            <div className={styles.mainBox}>
                <p className={styles.curationText}>00은 어디에 속해있나요?</p>
                <div className={styles.barBox}>
                    <div className={styles.bar}></div>
                    <div>
                        <img className={styles.runDog} src='./images/curation/Vector.png'></img>
                    </div>
                    <div className={styles.progressBar}></div>    
                </div>
                <div className={styles.contentBox}>
                    <div className={styles.textAndBox}>
                        <div className={styles.selectBox}>
                                <img src='./images/curation/womanAndDog.png'></img>
                        </div>
                        <p className={styles.text}>유아기</p>
                    </div>
                    <div className={styles.textAndBox}>
                        <div className={styles.selectBox}>
                                <img src='./images/curation/girlAndDog.png'></img>
                        </div>
                        <p className={styles.text}>청년기</p>
                    </div>
                    <div className={styles.textAndBox}>
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