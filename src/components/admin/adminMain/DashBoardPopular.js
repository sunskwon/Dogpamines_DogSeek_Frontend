import { useNavigate } from "react-router-dom";

import styles from "./AdminMain.module.css";

function DashBoardPopular({ popular }) {

    const navigate = useNavigate();

    return (
        <>
            <table className={styles.productListTable}>
                <tbody>
                    <tr>
                        <th style={{ width: "60px", }}>사료코드</th>
                        <th style={{ width: "100px", }}>제품명</th>
                        <th style={{ width: "60px", }}>조회수</th>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <hr />
                        </td>
                    </tr>
                    {popular?.slice(0, 8).map((item, index) => (
                        <tr
                            key={index}
                            style={{ cursor: "pointer", }}
                            onClick={() => {
                                navigate("/admin/productdetail", {
                                    state: { Location: `/products/${item.prodCode}` }
                                });
                            }}
                        >
                            <td>{item.prodCode}</td>
                            <td>
                                <div
                                    className={styles.ellipsisBox}
                                    style={{ width: "100px", }}
                                >
                                    {item.prodName}
                                </div>
                            </td>
                            <td>{item.prodVisit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default DashBoardPopular;