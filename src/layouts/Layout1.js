import Footer from "../components/common/Footer";
import Header1 from "../components/common/Header1";
import ChatButton from "../components/chat/ChatButton";
import TopBtn from "../components/common/Topbtn";
import Hamberger from "../components/common/Hamberger";
import { Outlet } from "react-router-dom";

import styles from "./Layout1.module.css";

function Layout1() {
    return (
        <>
            <Header1 />
            <Outlet />
            <div className={styles.floatingBox}>
                <div className={styles.wrapBox}>
                    <div className={styles.wrapContent}>
                        <ChatButton />
                    </div>
                    <div className={styles.wrapContent}>
                        <Hamberger />
                    </div>
                    <div className={styles.wrapContent}>
                        <TopBtn />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Layout1;