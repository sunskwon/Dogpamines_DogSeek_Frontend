import { Outlet } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import Header from "../components/admin/adminCommon/Header";
import Navbar from "../components/admin/adminCommon/Navbar";

import Header1 from "../components/common/Header1";
import NotFound from "../pages/common/NotFound";
import Footer from "../components/common/Footer";

import styles from "./AdminLayout.module.css";

function Adminlayout() {

    var userAuth = '';

    try {

        const decodedToken = jwtDecode(window.localStorage.getItem("accessToken"));

        userAuth = decodedToken.userAuth;
    } catch (error) {
        console.log(error);
    }

    return userAuth === 'ADMIN' ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={styles.adminOuter}>
                <div className={styles.nav}>
                    <Header />
                    <Navbar />
                </div>
                <div className={styles.main}>
                    <Outlet />
                </div>
            </div>
        </div>
    ) :
        (
            <>
                <NotFound />
            </>
        );
}

export default Adminlayout;