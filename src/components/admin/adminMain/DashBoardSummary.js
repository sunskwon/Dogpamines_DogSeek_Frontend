import styles from "./AdminMain.module.css";

function DashBoardSummary({ counts, summary }) {

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
                    <tr key={counts[0]?.countsDate}>
                        <td>{counts[0]?.countsDate}</td>
                        <td>{counts[0]?.countsSignup}</td>
                        <td>{counts[0]?.countsSignin}</td>
                        <td>{counts[0]?.countsProducts}</td>
                        <td>{counts[0]?.countsBoards}</td>
                    </tr>
                    <tr key={counts[1]?.countsDate}>
                        <td>{counts[1]?.countsDate}</td>
                        <td>{counts[1]?.countsSignup}</td>
                        <td>{counts[1]?.countsSignin}</td>
                        <td>{counts[1]?.countsProducts}</td>
                        <td>{counts[1]?.countsBoards}</td>
                    </tr>
                    <tr key={counts[2]?.countsDate}>
                        <td>{counts[2]?.countsDate}</td>
                        <td>{counts[2]?.countsSignup}</td>
                        <td>{counts[2]?.countsSignin}</td>
                        <td>{counts[2]?.countsProducts}</td>
                        <td>{counts[2]?.countsBoards}</td>
                    </tr>
                    <tr key={summary[2]?.countsDate}>
                        <td>{`일주일(${summary[2]?.countsDate} ~ ${counts[0]?.countsDate})`}</td>
                        <td>{summary[2]?.countsSignup}</td>
                        <td>{summary[2]?.countsSignin}</td>
                        <td>{summary[2]?.countsProducts}</td>
                        <td>{summary[2]?.countsBoards}</td>
                    </tr>
                    <tr key={summary[0]?.countsDate}>
                        <td>{`지난달(${summary[0]?.countsDate})`}</td>
                        <td>{summary[0]?.countsSignup}</td>
                        <td>{summary[0]?.countsSignin}</td>
                        <td>{summary[0]?.countsProducts}</td>
                        <td>{summary[0]?.countsBoards}</td>
                    </tr>
                    <tr key={summary[1]?.countsDate}>
                        <td>{`이번달(${summary[1]?.countsDate})`}</td>
                        <td>{summary[1]?.countsSignup}</td>
                        <td>{summary[1]?.countsSignin}</td>
                        <td>{summary[1]?.countsProducts}</td>
                        <td>{summary[1]?.countsBoards}</td>
                    </tr>
                    <tr key={summary[3]?.countsDate}>
                        <td>전체</td>
                        <td>{summary[3]?.countsSignup}</td>
                        <td>{summary[3]?.countsSignin}</td>
                        <td>{summary[3]?.countsProducts}</td>
                        <td>{summary[3]?.countsBoards}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default DashBoardSummary;