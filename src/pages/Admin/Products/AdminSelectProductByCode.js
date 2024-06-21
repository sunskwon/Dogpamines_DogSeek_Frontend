import { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import SelectProductByCode from "../../../components/admin/products/SelectProductByCode";

import styles from "../AdminPages.module.css";

function AdminSelectProductByCode() {

    const baseUrl = 'http://localhost:8080';

    const [product, setProduct] = useState({});

    const { state } = useLocation();

    const navigate = useNavigate();

    const call = async () => {

        const url = `${baseUrl}${state.Location}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
            }
        }).then(res => res.json());

        const result = await response.product;

        return result;
    };

    useEffect(() => {
        call().then(res => setProduct(res));
    }, []);

    return (
        <div>
            <p className={styles.subTitle}>사료 정보 관리</p>
            <div className={styles.mainOuter}>
                <div className={styles.mainBox}>
                    <div>
                        <p className={styles.subjectTitle}>상세 사료 정보</p>
                        <div style={{ float: "right", }}>
                            <button
                                className={styles.submitButton}
                                style={{ width: "100px", height: "30px", marginTop: "11px", marginRight: "15px", }}
                                onClick={() => {
                                    navigate("/admin/updateproduct", {
                                        state: {Location: state.Location}
                                    });
                                }}
                            >
                                수정
                            </button>
                        </div>
                        <div className={styles.productDetail}>
                            <SelectProductByCode 
                                Location={state.Location}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSelectProductByCode;