import styles from './CurationSelectCook.module.css'

function CurationSelectCook() {
    return(
        <div>
            <div className={styles.mainBox}>
                <p className={styles.curationText}>00은 어떤 조리방식을 선호하나요?</p>
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
                        <p className={styles.text}>건식</p>
                    </div>
                    <div className={styles.textAndBox}>
                        <div className={styles.selectBox}>
                                <img></img>
                        </div>
                        <p className={styles.text}>습식</p>
                    </div>
                    <div className={styles.textAndBox}>
                        <div className={styles.selectBox}>
                                <img></img>
                        </div>
                    <p className={styles.text}>화식</p>
                    </div>
                    <div className={styles.textAndBox}>
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