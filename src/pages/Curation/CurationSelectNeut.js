import styles from './CurationSelectNeut.module.css'

function CurationSelectNeut() {
    return(
        <div>
            <div className={styles.mainBox}>
                <p className={styles.curationText}>00은 중성화 수술을 했나요?</p>
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
                                <img src='./images/curation/circle.png'></img>
                        </div>
                        <p className={styles.text}>네</p>
                    </div>
                    <div className={styles.textAndBox}>
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