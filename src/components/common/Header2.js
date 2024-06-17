import styles from './Header2.module.css'

function Header2(){

    return(
        <header>
            <div className={styles.all}>
                <div className={styles.container}>
                    <div className={styles.containerBox}>
                        <a href="../pages/Company.js" className={styles.leftText}>About</a>
                        <a href="/" className={styles.leftText}>Search</a>
                    </div>
                    <div className={styles.mainBox}>
                        <a href="/" className={styles.mainText}>DogSeek</a>
                    </div>
                    <div className={styles.containerBox2}>
                        <a href="/" className={styles.rightText}>MyPage</a>
                        <a href="/" className={styles.rightText}>Logout</a>
                    </div>
                </div>
            </div>  
        </header>
    )
}

export default Header2;