import styles from './Header1.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

function Header1(){

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userAuth, setUserAuth] = useState(null);

    const handleLogout= () => {
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('userCode');
        window.localStorage.removeItem('userNick');
        window.localStorage.removeItem('userAuth');
        setIsLoggedIn(false);
        setUserAuth(null);
        alert("로그아웃 되었습니다.");
        navigate("/");
    };

    const handleMypage= () => {
        setIsLoggedIn(true);
        navigate("/mypage")
    }

    useEffect(() => {
        var decodedToken = '';
        
        var userCode = '';
        var userNick = '';
        var userAuth = '';
        
        try {
            decodedToken = jwtDecode(window.localStorage.getItem("accessToken"));

            userCode = decodedToken.userCode;
            userNick = decodedToken.userNick;
            userAuth = decodedToken.userAuth;

        } catch (error) {

        }


        setIsLoggedIn(!!decodedToken);
        setUserAuth(userAuth);
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
                        {userAuth === "ADMIN" ? (
                            <a aria-label='회원가입 또는 AdminPage' className={styles.rightText} onClick={() => navigate("/admin")}>AdminPage</a>
                        ) : (
                            <a aria-label='회원가입 또는 마이페이지' className={styles.rightText} onClick={isLoggedIn ? handleMypage : () => navigate("/signup")}>{isLoggedIn ? "MyPage" : "SignUp"}</a>
                        )}
                    </div>
                </div>
            </div>  
        </header>
    )
}

export default Header1;