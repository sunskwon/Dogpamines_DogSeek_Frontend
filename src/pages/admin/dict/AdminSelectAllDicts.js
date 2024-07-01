import { useState } from "react";

import { useNavigate } from "react-router-dom";

import SelectAllDicts from "../../../components/admin/dict/SelectAllDicts";

import styles from "../AdminPages.module.css";

function AdminSelectAllDicts() {

    const [search, setSearch] = useState({
        type: 'dogName',
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
            <p className={styles.subTitle}>견종 정보 관리</p>
            <div className={styles.mainOuter}>
                <div className={styles.mainBox}>
                    <div>
                        <p className={styles.subjectTitle}>등록된 견종 목록</p>
                        <div style={{ float: "right", }}>
                            <select
                                name="type"
                                style={{ width: "80px", height: "34px", }}
                                onChange={valueChangeHandler}
                            >
                                <option
                                    value={'dogName'}
                                >
                                    견종명
                                </option>
                                <option
                                    value={'dogSize'}
                                >
                                    견종크기
                                </option>
                            </select>
                            <input
                                id="typeInput"
                                name="input"
                                style={{ width: "150px", height: "30px", }}
                                onChange={valueChangeHandler}
                                onKeyDown={(e) => {
                                    if (e.keyCode === 13) {
                                        searchSubmitHandler(e);
                                    }
                                }}
                            />
                            <button
                                onClick={searchSubmitHandler}
                                className={styles.submitButton}
                                style={{ marginRight: "10px", }}
                            >
                                검색
                            </button>
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "15px", }}
                                onClick={() => {
                                    navigate("/admin/insertdict");
                                }}
                            >
                                새 견종 등록
                            </button>
                        </div>
                    </div>
                    <div style={{ clear: "both", }}>
                        <div className={styles.productList}>
                            <SelectAllDicts
                                search={search}
                                bool={bool}
                                setBool={setBool}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSelectAllDicts;