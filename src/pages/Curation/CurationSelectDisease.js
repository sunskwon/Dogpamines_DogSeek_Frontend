import styles from './CurationSelectDisease.module.css'

function CurationSelectDisease() {
    return (
        <div>
            <div className={styles.mainBox}>
                <p className={styles.curationText}>00은 어떤 질병및 질환이 있나요?</p>
                <div className={styles.barBox}>
                    <div className={styles.bar}></div>
                    <div>
                        <img className={styles.runDog} src='./images/curation/Vector.png'></img>
                    </div>
                    <div className={styles.progressBar}></div>    
                </div>
                <select className={styles.inputSize}>
                    <option>없음</option>
                    <option>관절</option>
                    <option>피부</option>
                    <option>모질</option>
                    <option>과체중</option>
                </select>
                <button className={styles.nextButton}>다음</button>
            </div>    
        </div>    
    )
}

export default CurationSelectDisease;