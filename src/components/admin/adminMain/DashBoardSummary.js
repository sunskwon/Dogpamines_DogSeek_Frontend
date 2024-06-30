import { useState, useEffect } from "react";

import styles from "./AdminMain.module.css";

function DashBoardSummary({ counts, summary }) {

    const [weeks, setWeeks] = useState([]);

    useEffect(() => {
        let thisWeekSignup = 0;
        let thisWeekSignin = 0;
        let thisWeekProducts = 0;
        let thisWeekBoards = 0;
        let lastWeekSignup = 0;
        let lastWeekSignin = 0;
        let lastWeekProducts = 0;
        let lastWeekBoards = 0;

        const thisWeekCounts = counts?.slice(0, 7).map(num => num);
        const lastWeekCounts = counts?.slice(7, 14).map(num => num);

        for (let i = 0; i < 7; i++) {
            thisWeekSignup += thisWeekCounts[i]?.countsSignup;
            thisWeekSignin += thisWeekCounts[i]?.countsSignin;
            thisWeekProducts += thisWeekCounts[i]?.countsProducts;
            thisWeekBoards += thisWeekCounts[i]?.countsBoards;

            lastWeekSignup += lastWeekCounts[i]?.countsSignup;
            lastWeekSignin += lastWeekCounts[i]?.countsSignin;
            lastWeekProducts += lastWeekCounts[i]?.countsProducts;
            lastWeekBoards += lastWeekCounts[i]?.countsBoards;
        }

        setWeeks([
            {
                date: `${counts[6]?.countsDate} ~ ${counts[0]?.countsDate}`,
                signup: thisWeekSignup,
                signin: thisWeekSignin,
                products: thisWeekProducts,
                boards: thisWeekBoards
            },
            {
                date: `${counts[13]?.countsDate} ~ ${counts[7]?.countsDate}`,
                signup: lastWeekSignup,
                signin: lastWeekSignin,
                products: lastWeekProducts,
                boards: lastWeekBoards
            }
        ]);
    }, [counts]);

    return (
        <>
            <table className={styles.productListTable}>
                <tbody>
                    <tr>
                        <th style={{ width: "280px", }}>날짜</th>
                        <th style={{ width: "100px", }}>가입자</th>
                        <th style={{ width: "100px", }}>방문자</th>
                        <th style={{ width: "100px", }}>사료 조회</th>
                        <th style={{ width: "100px", }}>게시물</th>
                    </tr>
                    <tr>
                        <td colSpan={5}>
                            <hr />
                        </td>
                    </tr>
                    {counts?.slice(0, 3).map((count, index) => (
                        <tr key={index}>
                            <td>{count?.countsDate}</td>
                            <td>{count?.countsSignup}</td>
                            <td>{count?.countsSignin}</td>
                            <td>{count?.countsProducts}</td>
                            <td>{count?.countsBoards}</td>
                        </tr>
                    ))}
                    {weeks.map((week, index) => (
                        <tr key={index}>
                            <td>{String(week.date)}</td>
                            <td>{String(week.signup)}</td>
                            <td>{String(week.signin)}</td>
                            <td>{String(week.products)}</td>
                            <td>{String(week.boards)}</td>
                        </tr>
                    ))}
                    {summary.map((item, index) => (
                        <tr key={index}>
                            <td>{item?.countsDate}</td>
                            <td>{item?.countsSignup}</td>
                            <td>{item?.countsSignin}</td>
                            <td>{item?.countsProducts}</td>
                            <td>{item?.countsBoards}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default DashBoardSummary;