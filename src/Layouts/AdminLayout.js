import { Outlet } from "react-router-dom";

import Header from "../components/admin/common/Header";
import Navbar from "../components/admin/common/Navbar";

import styles from "./AdminLayout.module.css";

function Adminlayout() {
    
    return (
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
    );
}

export default Adminlayout;