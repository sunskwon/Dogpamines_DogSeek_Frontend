import styles from './CurationSizeSelect.module.css'

function CurationSizeSelect() {

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
                            <div className={styles.circle}>
                                <img className={styles.img} src='./images/curation/dog-7236101_1280 3.png'></img>
                            </div>
                        </div>
                        <p className={styles.text}>소형견</p>
                    </div>
                    <div className={styles.textAndBox}>
                        <div className={styles.selectBox}>
                            <div className={styles.circle}>
                                <img className={styles.img} src='./images/curation/dog-7760218_1280 2.png'></img>
                            </div>
                        </div>
                        <p className={styles.text}>중형견</p>
                    </div>
                    <div className={styles.textAndBox}>
                        <div className={styles.selectBox}>
                            <div className={styles.circle}>
                                <img className={styles.img} src='./images/curation/dog-7760218_1280 1.png'></img>
                            </div>
                        </div>
                    <p className={styles.text}>소형견</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurationSizeSelect;