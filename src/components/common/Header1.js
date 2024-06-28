import styles from './Header1.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header1(){

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout= () => {
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('userCode');
        window.localStorage.removeItem('userNick');
        window.localStorage.removeItem('userAuth');
        setIsLoggedIn(false);
        alert("로그아웃 되었습니다.");
        navigate("/");
    };

    const handleMypage= () => {
        setIsLoggedIn(true);
        navigate("/mypage")
    }

    useEffect(() => {
        const token = window.localStorage.getItem('accessToken');
        setIsLoggedIn(!!token);
    },[]);

    return(
        <header>
            <div className={styles.all}>
                <div className={styles.container}>
                    <div className={styles.containerBox}>
                        <Link to={'/company'} className={styles.leftText}>
                            About
                        </Link>
                        <Link to={"/products"} className={styles.leftText}>Search</Link>
                    </div>
                    <div className={styles.mainBox}>
                        <a href="/" className={styles.mainText}>DogSeek</a>
                    </div>
                    <div className={styles.containerBox2}>
                        <a aria-label="로그인 또는 로그아웃" className={styles.rightText} onClick={isLoggedIn ? handleLogout : () => navigate("/login")}>{isLoggedIn ? "Logout" : "Login"}</a>
                        <a aria-label='회원가입 또는 마이페이지' className={styles.rightText} onClick={isLoggedIn ? handleMypage : () => navigate("/signup")}>{isLoggedIn ? "MyPage" : "SignUp"}</a>
                    </div>
                </div>
            </div>  
        </header>
    )
}

export default Header1;