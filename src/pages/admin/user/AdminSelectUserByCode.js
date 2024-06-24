import { useLocation, useNavigate } from "react-router-dom";

import SelectUserByCode from "../../../components/admin/user/SelectUserByCode";

import styles from "../AdminPages.module.css";

function AdminSelectUserByCode() {

    const { state } = useLocation();

    const navigate = useNavigate();

    return (
        <div>
            <p className={styles.subTitle}>회원 관리</p>
            <div className={styles.mainOuter}>
                <div className={styles.mainBox}>
                    <div>
                        <p className={styles.subjectTitle}>회원 상세</p>
                        <div style={{ float: "right", }}>
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "10px", }}
                                // onClick={() => {
                                //     navigate("/admin/updateproduct", {
                                //         state: { Location: state.Location }
                                //     });
                                // }}
                            >
                                수정
                            </button>
                            <button
                                className={styles.cancelButton}
                                style={{ marginRight: "15px", }}
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                돌아가기
                            </button>
                        </div>
                        <div className={styles.productDetail}>
                            <SelectUserByCode
                                Location={state.Location}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSelectUserByCode;