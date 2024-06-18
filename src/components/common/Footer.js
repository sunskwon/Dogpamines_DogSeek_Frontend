import { Link } from 'react-router-dom';
import styles from './Footer.module.css'

function Footer(){

    return(
        <footer>
            <div className={styles.all}>
                <div className={styles.container}>
                    <div className={styles.containerBox}>
                        <a className={styles.leftText}>CopyrightⓒDogSeek</a>
                    </div>
                    <div className={styles.containerBox2}>
                        <Link to={'/terms'} className={styles.rightText}>
                        이용약관
                        </Link>
                        <Link to={'/privacypolicy'} className={styles.rightText}>
                        개인정보처리방침
                        </Link>
                    </div>
                </div>
            </div>  
        </footer>
    )
}

export default Footer;