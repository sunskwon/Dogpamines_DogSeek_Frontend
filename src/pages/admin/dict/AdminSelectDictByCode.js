import { useLocation, useNavigate } from "react-router-dom";

import SelectDictByCode from "../../../components/admin/dict/SelectDictByCode";
import FetchErrorBoundary from "../../../components/admin/adminCommon/FetchErrorBoundary";

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
                                className={styles.cancelButton}
                                style={{ marginRight: "15px", }}
                                onClick={() => {
                                    navigate("/admin/dicts");
                                }}
                            >
                                돌아가기
                            </button>
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "10px", }}
                                onClick={() => {
                                    navigate("/admin/modifydict", {
                                        state: { Location: state.Location }
                                    });
                                }}
                            >
                                수정
                            </button>
                        </div>
                        <div className={styles.productDetail}>
                            <FetchErrorBoundary height="560px">
                                <SelectDictByCode
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

export default AdminSelectDictByCode;