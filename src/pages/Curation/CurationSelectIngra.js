import styles from './CurationSelectIngra.module.css'

function CurationSelectIngra() {
    return(
        <div>
            <div className={styles.mainBox}>
                <p className={styles.curationText}>00은 어떤 재료를 좋아하나요?</p>
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
                                <img></img>
                        </div>
                        <p className={styles.text}>재료</p>
                    </div>
                    <div className={styles.textAndBox}>
                        <div className={styles.selectBox}>
                                <img></img>
                        </div>
                        <p className={styles.text}>재료</p>
                    </div>
                    <div className={styles.textAndBox}>
                        <div className={styles.selectBox}>
                                <img></img>
                        </div>
                    <p className={styles.text}>재료</p>
                    </div>
                    <div className={styles.textAndBox}>
                        <div className={styles.selectBox}>
                                <img></img>
                        </div>
                    <p className={styles.text}>재료</p>
                    </div>
                </div>
            </div>
        </div>        
    )
}

export default CurationSelectIngra;