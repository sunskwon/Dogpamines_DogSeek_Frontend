import { useState, useEffect } from "react";

import { GetAPI } from "../../api/RestAPIs";

import DashBoardGraph from "../../components/admin/adminMain/DashBoardGraph";
import DashBoardSummary from "../../components/admin/adminMain/DashBoardSummary";

import styles from "./AdminPages.module.css"

function AdminDashBoard() {

    const [date, setDate] = useState(7);
    const [counts, setCounts] = useState([]);
    const [summary, setSummary] = useState([]);

    const call = async () => {

        const address = '/dashboard';

        const response = await GetAPI(address);

        const result = await response.Counts;

        return result;
    };

    useEffect(() => {
        call().then(res => {
            setCounts(res.Overview);
            setSummary(res.Summary);
        });
    }, []);

    return (
        <div>
            <p className={styles.subTitle}>대시보드</p>
            <div className={styles.mainOuter}>
                <div
                    className={styles.mainBox}
                    style={{ height: "317px", marginBottom: "30px", }}
                >
                    <p className={styles.subjectTitle}>한눈에 살펴보기</p>
                    <div
                        style={{ float: "right", marginRight: "5px", }}
                    >
                        <button
                            className={date === 1 ? styles.selectedButton : styles.selectButton}
                            onClick={() => setDate(1)}
                        >
                            오늘
                        </button>
                        <button
                            className={date === 3 ? styles.selectedButton : styles.selectButton}
                            onClick={() => setDate(3)}
                        >
                            3일
                        </button>
                        <button
                            className={date === 7 ? styles.selectedButton : styles.selectButton}
                            onClick={() => setDate(7)}
                        >
                            7일
                        </button>
                        <button
                            className={date === 15 ? styles.selectedButton : styles.selectButton}
                            onClick={() => setDate(15)}
                        >
                            15일
                        </button>
                    </div>
                    <div style={{ clear: "both", }}>
                        <DashBoardGraph
                            counts={counts}
                            date={date}
                        />
                    </div>
                </div>
                <div style={{ display: "flex", }}>
                    <div
                        className={styles.mainBox}
                        style={{ width: "697px", height: "317px", marginRight: "30px", }}
                    >
                        <p className={styles.subjectTitle}>요약</p>
                        <div style={{ clear: "both", }}>
                            <DashBoardSummary
                                counts={counts}
                                summary={summary}
                            />
                        </div>
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