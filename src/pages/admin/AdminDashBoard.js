import DashBoardGraph from "../../components/admin/adminMain/DashBoardGraph";

import styles from "./AdminPages.module.css"

function AdminDashBoard() {

    return (
        <div>
            <p className={styles.subTitle}>대시보드</p>
            <div className={styles.mainOuter}>
                <div
                    className={styles.mainBox}
                    style={{ height: "317px", marginBottom: "30px", }}
                >
                    <p className={styles.subjectTitle}>한눈에 살펴보기</p>
                    <div style={{ clear: "both", }}>
                        <DashBoardGraph />
                    </div>
                </div>
                <div style={{ display: "flex", }}>
                    <div
                        className={styles.mainBox}
                        style={{ width: "697px", height: "317px", marginRight: "30px", }}
                    >
                        <p className={styles.subjectTitle}>요약</p>
                    </div>
                    <div
                        className={styles.mainBox}
                        style={{ width: "257px", height: "317px", }}
                    >
                        <p className={styles.subjectTitle}>인기 페이지</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashBoard;