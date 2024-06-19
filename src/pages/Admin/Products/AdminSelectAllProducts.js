import { useState } from "react";

import SelectAllProducts from "../../../components/admin/products/SelectAllProducts";

import styles from "../AdminPages.module.css";

function AdminSelectAllProducts() {

    const [search, setSearch] = useState({
        type: 'prodName',
        input: ''
    });
    const [bool, setBool] = useState(true);

    const valueChangeHandler = e => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        });
    };

    const searchSubmitHandler = () => {
        setBool(!bool);
    };

    return (
        <div>
            <p className={styles.subTitle}>사료 정보 관리</p>
            <div className={styles.mainOuter}>
                <div className={styles.mainBox}>
                    <div>
                        <p className={styles.subjectTitle}>등록된 사료 목록</p>
                        <div style={{ float: "right", }}>
                            <select
                                name="type"
                                onChange={valueChangeHandler}
                                style={{ width: "80px", height: "30px", }}
                            >
                                <option
                                    value={'prodName'}
                                >
                                    제품명
                                </option>
                                <option
                                    value={'prodManufac'}
                                >
                                    제조사
                                </option>
                            </select>
                            <input
                                name="input"
                                onChange={valueChangeHandler}
                                style={{ width: "150px", height: "30px", }}
                            />
                            <button
                                onClick={searchSubmitHandler}
                                className={styles.submitButton}
                                style={{ width: "100px", height: "30px", marginRight: "15px", }}
                            >
                                검색
                            </button>
                        </div>
                    </div>
                    <div style={{ clear: "right", }}>
                        <button
                            className={styles.submitButton}
                            style={{
                                width: "100px", height: "30px", marginTop: "15px", marginRight: "15px", float: "right",
                            }}
                        >
                            새 상품 등록
                        </button>
                    </div>
                    <div className={styles.productList}>
                        <table className={styles.productListTable}>
                            <tbody>
                                <tr>
                                    <th style={{ width: "80px", }}>사료코드</th>
                                    <th style={{ width: "330px", }}>제품명</th>
                                    <th style={{ width: "100px", }}>제조사</th>
                                    <th style={{ width: "200px", }}>사이트 주소</th>
                                    <th style={{ width: "100px", }}></th>
                                    <th style={{ width: "100px", }}></th>
                                </tr>
                                <tr>
                                    <td colSpan={6}>
                                        <hr className={styles.tableLine} />
                                    </td>
                                </tr>
                                <SelectAllProducts 
                                    search={search}
                                    bool={bool}
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSelectAllProducts;