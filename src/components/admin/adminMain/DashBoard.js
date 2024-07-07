import { useState, useEffect } from "react";

import { GetAPI } from "../../../api/RestAPIs";

import DashBoardGraph from "./DashBoardGraph";
import DashBoardSummary from "./DashBoardSummary";
import DashBoardPopular from "./DashBoardPopular";

import Loading from "../adminCommon/Loading";

import styles from "./AdminMain.module.css";

function DashBoard() {

    const [date, setDate] = useState(7);
    const [counts, setCounts] = useState([]);
    const [summary, setSummary] = useState([]);
    const [popular, setPopular] = useState([]);

    const [error, setError] = useState(null);
    const [boolLoading, setBoolLoading] = useState(false);

    const call = async () => {

        setBoolLoading(true);

        try {

            const address = '/dashboard';

            const response = await GetAPI(address);

            if (response.error) {

                setError(error);

                return [];
            }

            const result = await response.Counts;

            return result;
        } catch (error) {

            setError(error);

            return [];
        } finally {

            setBoolLoading(false);
        }
    };

    useEffect(() => {
        call().then(res => {

            setBoolLoading(true);

            try {

                const tempSummary = res?.Summary;
                let editedSummary = tempSummary ? tempSummary : [];
                editedSummary[0].countsDate = `이번달(${tempSummary[0]?.countsDate})`;
                editedSummary[1].countsDate = `지난달(${tempSummary[1]?.countsDate})`;
                editedSummary[2].countsDate = `전체`;

                setCounts(res.Overview);
                setSummary(editedSummary);
                setPopular(res.Popular);
            } catch (error) {

                setError(error);
                setCounts([]);
                setSummary([]);
                setPopular([]);
            } finally {

                setBoolLoading(false);
            }
        });
    }, []);

    if (error) {
        throw error;
    }

    return boolLoading ?
        (
            <>
                <div className={styles.mainOuter}>
                    <div className={styles.mainBox}>
                        <div style={{ height: "53.5px", }}></div>
                        <Loading height="560px" />
                    </div>
                </div>
            </>
        ) : (
            <>
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
                            <div style={{ clear: "both", }}>
                                <DashBoardPopular
                                    popular={popular}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
}

export default DashBoard;