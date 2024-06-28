import { useState } from "react";

import { useNavigate } from "react-router-dom";

import SelectAllProducts from "../../../components/admin/products/SelectAllProducts";

import styles from "../AdminPages.module.css";

function AdminSelectAllProducts() {

    const [search, setSearch] = useState({
        type: 'prodName',
        input: ''
    });
    const [bool, setBool] = useState(true);

    const navigate = useNavigate();

    const input = document.getElementById('typeInput');

    const valueChangeHandler = e => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        });
    };

    const searchSubmitHandler = () => {
        input.value = '';
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
                                style={{ width: "80px", height: "34px", }}
                                onChange={valueChangeHandler}
                            >
                                <option value={'prodName'}>
                                    제품명
                                </option>
                                <option value={'prodManufac'}>
                                    제조사
                                </option>
                            </select>
                            <input
                                id="typeInput"
                                name="input"
                                style={{ width: "150px", height: "30px", }}
                                onChange={valueChangeHandler}
                            />
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "10px", }}
                                onClick={searchSubmitHandler}
                            >
                                검색
                            </button>
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "15px", }}
                                onClick={() => {
                                    navigate("/admin/insertproduct");
                                }}
                            >
                                새 상품 등록
                            </button>
                        </div>
                    </div>
                    <div style={{ clear: "right", }}>
                    </div>
                    <div className={styles.productList}>
                        <SelectAllProducts
                            search={search}
                            bool={bool}
                            setBool={setBool}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSelectAllProducts;