import { useLocation, useNavigate } from "react-router-dom";

import SelectProductByCode from "../../../components/admin/products/SelectProductByCode";
import FetchErrorBoundary from "../../../components/admin/adminCommon/FetchErrorBoundary";

import styles from "../AdminPages.module.css";

function AdminSelectProductByCode() {

    const { state } = useLocation();

    const navigate = useNavigate();

    return (
        <div>
            <p className={styles.subTitle}>사료 정보 관리</p>
            <div className={styles.mainOuter}>
                <div className={styles.mainBox}>
                    <div>
                        <p className={styles.subjectTitle}>상세 사료 정보</p>
                        <div style={{ float: "right", }}>
                            <button
                                className={styles.cancelButton}
                                style={{ marginRight: "10px", }}
                                onClick={() => {
                                    navigate("/admin/products");
                                }}
                            >
                                돌아가기
                            </button>
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "15px", }}
                                onClick={() => {
                                    navigate("/admin/modifyproduct", {
                                        state: { Location: state.Location }
                                    });
                                }}
                            >
                                수정
                            </button>
                        </div>
                        <div className={styles.productDetail}>
                            <FetchErrorBoundary height="560px">
                                <SelectProductByCode
                                    Location={state.Location}
                                />
                            </FetchErrorBoundary>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSelectProductByCode;