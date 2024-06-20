import InsertProduct from "../../../components/admin/products/InsertProduct";

import styles from "../AdminPages.module.css";

function AdminInsertProduct() {

    return (
        <div>
            <p className={styles.subTitle}>사료 정보 관리</p>
            <div className={styles.mainOuter}>
                <div className={styles.mainBox}>
                    <div>
                        <p className={styles.subjectTitle}>신규 사료 등록</p>
                        <div style={{ float: "right", }}>
                            <button
                                className={styles.submitButton}
                                style={{ width: "100px", height: "30px", marginTop: "11px", marginRight: "15px", }}
                            >
                                등록
                            </button>
                        </div>
                    </div>
                    <div className={styles.productDetail}>
                        <InsertProduct />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminInsertProduct;