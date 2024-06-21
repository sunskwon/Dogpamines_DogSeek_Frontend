import { useState, useEffect } from "react";

import { GetAPI } from "../../api/RestAPIs";
import styles from "./AdminPages.module.css"

function AdminDashBoard() {

    const [res, setRes] = useState();

    const getRes = async () => {
        const response = await GetAPI('/products');
        setRes(response);
    };

    useEffect(() => {
        getRes();
    }, []);

    useEffect(() => {
        console.log(res);
    }, [res]);


    return (
        <div>
            <p className={styles.subTitle}>대시보드</p>
            <div className={styles.mainOuter}>
                <h1>dashboard page</h1>
                <div
                    style={{ width: "100px", height: "100px", backgroundColor: "yellowgreen", }}
                >
                    api test
                </div>
            </div>
        </div>
    );
}

export default AdminDashBoard;