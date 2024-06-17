import styles from './Footer.module.css'

function Footer(){

    return(
        <footer>
            <div className={styles.all}>
                <div className={styles.container}>
                    <div className={styles.containerBox}>
                        <a href="/" className={styles.leftText}>CopyrightⓒDogSeek</a>
                    </div>
                    <div className={styles.containerBox2}>
                        <a href="/" className={styles.rightText}>이용약관</a>
                        <a href="/" className={styles.rightText}>개인정보처리방침</a>
                    </div>
                </div>
            </div>  
        </footer>
    )
}

export default Footer;