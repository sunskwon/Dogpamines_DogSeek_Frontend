import { useLocation, useNavigate } from "react-router-dom";

import styles from "../AdminPages.module.css";
import SelectProductByCode from "../../../components/admin/products/SelectProductByCode";

function AdminSelectProductByCode() {

    const { state } = useLocation();

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
                            >
                                수정
                            </button>
                        </div>
                        <div className={styles.productDetail}>
                            <SelectProductByCode 
                                prodCode={state.prodCode}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSelectProductByCode;