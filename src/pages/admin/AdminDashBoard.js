import DashBoard from "../../components/admin/DashBoard";

import styles from "./AdminPages.module.css"

function AdminDashBoard() {

    return (
        <div>
            <p className={styles.subTitle}>대시보드</p>
            <div className={styles.mainOuter}>
                <h1>dashboard page</h1>
                <DashBoard />
            </div>
        </div>
    );
}

export default AdminDashBoard;