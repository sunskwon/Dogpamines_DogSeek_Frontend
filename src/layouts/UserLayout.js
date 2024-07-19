import { Outlet } from "react-router-dom";

import UserHeader from "../components/common/UserHeader";
import Footer from "../components/common/Footer";
import ChatButton from "../components/chat/ChatButton";
import TopBtn from "../components/common/Topbtn";
import Hamberger from "../components/common/Hamberger";

import styles from "./UserLayout.module.css";

function UserLayout() {
    return (
        <>
            <header>
                <UserHeader />
            </header>
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

export default UserLayout;