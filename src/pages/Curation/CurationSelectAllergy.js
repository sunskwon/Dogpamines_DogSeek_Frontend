import styles from './CurationSelectAllergy.module.css'

function CurationSelectAllergy() {

    return (
        <div>
            <div className={styles.mainBox}>
                <p className={styles.curationText}>00은 어떤 알러지가 있나요?</p>
                <div className={styles.barBox}>
                    <div className={styles.bar}></div>
                    <div>
                        <img className={styles.runDog} src='./images/curation/Vector.png'></img>
                    </div>
                    <div className={styles.progressBar}></div>    
                </div>
                <select className={styles.inputSize}>
                    <option>없음</option>
                    <option>닭고기</option>
                    <option>소고기</option>
                    <option>돼지고기</option>
                    <option>연어</option>
                    <option>콩</option>
                </select>
                <button className={styles.nextButton}>다음</button>
            </div>    
        </div>    
    )
}

export default CurationSelectAllergy;