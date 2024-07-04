import { Outlet } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import Header from "../components/admin/adminCommon/Header";
import Navbar from "../components/admin/adminCommon/Navbar";

import styles from "./AdminLayout.module.css";

function Adminlayout() {

    const decodedToken = jwtDecode(window.localStorage.getItem("accessToken"));

    const userAuth = decodedToken.userAuth;

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            {userAuth === 'ADMIN' &&
                <div className={styles.adminOuter}>
                    <div className={styles.nav}>
                        <Header />
                        <Navbar />
                    </div>
                    <div className={styles.main}>
                        <Outlet />
                    </div>
                </div>
            }
        </div>
    );
}

export default Adminlayout;