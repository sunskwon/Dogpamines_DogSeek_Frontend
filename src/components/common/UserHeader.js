import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import cookie from "react-cookies";

import { callLogoutAPI } from '../../api/RestAPIs';

import styles from './UserHeader.module.css'

function UserHeader() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userAuth, setUserAuth] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = window.localStorage.getItem("accessToken");
        if (token && typeof token === 'string') {
            try {
                const decodedToken = jwtDecode(token);
                setIsLoggedIn(true);
                setUserAuth(decodedToken.userAuth);
            } catch (error) {
                console.error("Invalid token:", error);
                setIsLoggedIn(false);
                setUserAuth(null);
            }
        } else {
            setIsLoggedIn(false);
            setUserAuth(null);
        }
    }, []);

    const clearLocalStorageAndLogout = () => {
        const keys = ['accessToken', 'refreshToken'];
        keys.forEach(key => window.localStorage.removeItem(key));
        setIsLoggedIn(false);
        setUserAuth(null);
        cookie.remove('Identifier', { path: '/' }, 3000);
        navigate("/");
        window.location.reload();
    };

    const handleLogout = async () => {
        try {
            const result = await callLogoutAPI();
            if (result === 'true') {
                clearLocalStorageAndLogout();
            } else {
                alert('로그아웃 실패');
            }
        } catch (error) {
            clearLocalStorageAndLogout();
        }
    };

    const handleMypage = () => {
        setIsLoggedIn(true);
        navigate("/my-page")
    }

    const login = (token) => {
        if (token && typeof token === 'string') {
            window.localStorage.setItem("accessToken", token);
            const decodedToken = jwtDecode(token);
            setIsLoggedIn(true);
            setUserAuth(decodedToken.userAuth);
        }
    };

    return (
        <>
            <div className={styles.headerContainer}>
                <div className={styles.innerContainer}>
                    <Link to={'/company'} className={styles.containerText}>
                        About
                    </Link>
                    <Link to={"/products"} className={styles.containerText}>
                        Dog Food
                    </Link>
                </div>
                <div className={styles.mainContainer}>
                    <Link to={'/'}>
                        DogSeek
                    </Link>
                </div>
                <div className={styles.innerContainer}>
                    <div>

                    </div>
                    <a aria-label="로그인 또는 로그아웃" className={styles.rightText} onClick={isLoggedIn ? handleLogout : () => navigate("/login")}>{isLoggedIn ? "Logout" : "Login"}</a>
                    {userAuth === "ADMIN" ? (
                        <a aria-label='회원가입 또는 AdminPage' className={styles.rightText} onClick={() => navigate("/admin")}>AdminPage</a>
                    ) : (userAuth === "USER" && isLoggedIn ?
                        (
                            <a aria-label='마이페이지' className={styles.rightText} onClick={handleMypage}>MyPage</a>
                        ) : (
                            <a aria-label='회원가입 또는 마이페이지' className={styles.rightText} onClick={() => navigate("/signup")}>SignUp</a>
                        )
                    )}
                </div>
            </div>
        </>
    )
}

export default UserHeader;