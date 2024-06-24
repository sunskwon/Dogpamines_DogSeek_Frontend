import { useState } from "react";

import { useNavigate } from "react-router-dom";

import SelectAllProducts from "../../../components/admin/products/SelectAllProducts";

import styles from "../AdminPages.module.css";

function AdminSelectAllBoards() {

    const [search, setSearch] = useState({
        type: 'postTitle',
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
            <p className={styles.subTitle}>게시판 관리</p>
            <div className={styles.mainOuter}>
                <div className={styles.mainBox}>
                    <div>
                        <p className={styles.subjectTitle}>공지사항 목록</p>
                        <div style={{ float: "right", }}>
                            <select
                                name="type"
                                style={{ width: "80px", height: "34px", }}
                                onChange={valueChangeHandler}
                            >
                                <option value={'postTitle'}>
                                    제목
                                </option>
                                <option value={'postContext'}>
                                    내용
                                </option>
                            </select>
                            <input
                                name="input"
                                style={{ width: "150px", height: "30px", }}
                                onChange={valueChangeHandler}
                            />
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "10px", }}
                            // onClick={searchSubmitHandler}
                            >
                                검색
                            </button>
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "15px", }}
                            // onClick={() => {
                            //     navigate("/admin/insertproduct");
                            // }}
                            >
                                새 공지 등록
                            </button>
                        </div>
                    </div>
                    <div style={{ clear: "both", }}>
                        <div
                            className={styles.productList}
                            style={{ height: "220px", }}
                        >
                            <table className={styles.productListTable}>
                                <tbody>
                                    <tr>
                                        <th style={{ width: "80px", }}>게시물코드</th>
                                        <th style={{ width: "230px", }}>작성자</th>
                                        <th style={{ width: "100px", }}>제목</th>
                                        <th style={{ width: "200px", }}>사이트 주소</th>
                                        <th style={{ width: "100px", }}></th>
                                        <th style={{ width: "100px", }}></th>
                                        <th style={{ width: "100px", }}></th>
                                    </tr>
                                    <tr>
                                        <td colSpan={6}>
                                            <hr className={styles.tableLine} />
                                        </td>
                                    </tr>
                                    {/* <SelectAllProducts
                                    search={search}
                                    bool={bool}
                                    setBool={setBool}
                                /> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <p className={styles.subjectTitle}>게시물 목록</p>
                        <div style={{ float: "right", }}>
                            <select
                                name="type"
                                style={{ width: "80px", height: "34px", }}
                                onChange={valueChangeHandler}
                            >
                                <option value={'postTitle'}>
                                    제목
                                </option>
                                <option value={'postContext'}>
                                    내용
                                </option>
                            </select>
                            <input
                                name="input"
                                style={{ width: "150px", height: "30px", }}
                                onChange={valueChangeHandler}
                            />
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "10px", }}
                            // onClick={searchSubmitHandler}
                            >
                                검색
                            </button>
                            <div style={{ float: "right", width: "100px", height: "30px", marginRight: "15px", }}></div>
                        </div>
                    </div>
                    <div
                        className={styles.productList}
                        style={{ height: "320px", }}
                    >
                        <table className={styles.productListTable}>
                            <tbody>
                                <tr>
                                    <th style={{ width: "80px", }}>게시물코드</th>
                                    <th style={{ width: "230px", }}>작성자</th>
                                    <th style={{ width: "100px", }}>제목</th>
                                    <th style={{ width: "200px", }}>사이트 주소</th>
                                    <th style={{ width: "100px", }}></th>
                                    <th style={{ width: "100px", }}></th>
                                    <th style={{ width: "100px", }}></th>
                                </tr>
                                <tr>
                                    <td colSpan={6}>
                                        <hr className={styles.tableLine} />
                                    </td>
                                </tr>
                                {/* <SelectAllProducts
                                    search={search}
                                    bool={bool}
                                    setBool={setBool}
                                /> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSelectAllBoards;