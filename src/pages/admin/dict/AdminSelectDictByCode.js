import { useLocation, useNavigate } from "react-router-dom";

import SelectProductByCode from "../../../components/admin/products/SelectProductByCode";

import styles from "../AdminPages.module.css";

function AdminSelectDictByCode() {

    const { state } = useLocation();

    const navigate = useNavigate();

    return (
        <div>
            <p className={styles.subTitle}>견종 정보 관리</p>
            <div className={styles.mainOuter}>
                <div className={styles.mainBox}>
                    <div>
                        <p className={styles.subjectTitle}>상세 견종 정보</p>
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

export default AdminSelectDictByCode;