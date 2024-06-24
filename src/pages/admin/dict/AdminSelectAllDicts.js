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
            <p className={styles.subTitle}>견종 정보 관리</p>
            <div className={styles.mainOuter}>
                <div className={styles.mainBox}>
                    <div>
                        <p className={styles.subjectTitle}>등록된 견종 목록</p>
                        <div style={{ float: "right", }}>
                            <select
                                name="type"
                                onChange={valueChangeHandler}
                                style={{ width: "80px", height: "34px", }}
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
                                name="input"
                                onChange={valueChangeHandler}
                                style={{ width: "150px", height: "30px", }}
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
                    <div className={styles.productList}>
                        <table className={styles.productListTable}>
                            <tbody>
                                <tr>
                                    <th style={{ width: "120px", }}>견종코드</th>
                                    <th style={{ width: "370px", }}>견종명</th>
                                    <th style={{ width: "240px", }}>견종크기</th>
                                    <th style={{ width: "90px", }}></th>
                                    <th style={{ width: "90px", }}></th>
                                </tr>
                                <tr>
                                    <td colSpan={5}>
                                        <hr className={styles.tableLine} />
                                    </td>
                                </tr>
                                <SelectAllDicts
                                    search={search}
                                    bool={bool}
                                    setBool={setBool}
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSelectAllDicts;