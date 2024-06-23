import styles from './Header1.module.css'
import { Link } from 'react-router-dom';

function Header1(){

    return(
        <header>
            <div className={styles.all}>
                <div className={styles.container}>
                    <div className={styles.containerBox}>
                        <Link to={'/company'} className={styles.leftText}>
                            About
                        </Link>
                        <a href="/" className={styles.leftText}>Search</a>
                    </div>
                    <div className={styles.mainBox}>
                        <a href="/" className={styles.mainText}>DogSeek</a>
                    </div>
                    <div className={styles.containerBox2}>
                        <a href="/" className={styles.rightText}>Login</a>
                        <a href="/signup" className={styles.rightText}>Sign Up</a>
                    </div>
                </div>
            </div>  
        </header>
    )
}

export default Header1;