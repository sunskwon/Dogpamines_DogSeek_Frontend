import DashBoard from "../../components/admin/adminMain/DashBoard";
import FetchErrorBoundaryWBoundary from "../../components/admin/adminCommon/FetchErrorBoundaryWBoundary";

import styles from "./AdminPages.module.css"

function AdminDashBoard() {

    return (
        <>
            <div>
                <p className={styles.subTitle}> 대시보드</p >
                <div className={styles.mainOuter}>
                    <FetchErrorBoundaryWBoundary height="560px">
                        <DashBoard />
                    </FetchErrorBoundaryWBoundary>
                </div>
            </div >
        </>
    )
}

export default AdminDashBoard;