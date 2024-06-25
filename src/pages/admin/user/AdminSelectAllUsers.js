import { useState } from "react";

// import { useNavigate } from "react-router-dom";

import SelectAllUsers from "../../../components/admin/user/SelectAllUsers";

import styles from "../AdminPages.module.css";

function AdminSelectAllUsers() {

    const [search, setSearch] = useState({
        type: 'userNick',
        input: ''
    });
    const [bool, setBool] = useState(false);

    // const navigate = useNavigate();

    const valueChangeHandler = e => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        });
    };

    const searchSubmitHandler = () => {
        setBool(!bool);
        document.getElementById('input').value = '';
    };

    return (
        <div>
            <p className={styles.subTitle}>회원 관리</p>
            <div className={styles.mainOuter}>
                <div className={styles.mainBox}>
                    <div>
                        <p className={styles.subjectTitle}>회원 목록</p>
                        <div style={{ float: "right", }}>
                            <select
                                name="type"
                                style={{ width: "80px", height: "34px", }}
                                onChange={valueChangeHandler}
                            >
                                <option value={'userNick'}>
                                    닉네임
                                </option>
                                <option value={'admin'}>
                                    관리자
                                </option>
                                <option value={'user'}>
                                    회원
                                </option>
                                <option value={'sleep'}>
                                    휴면
                                </option>
                            </select>
                            <input
                                id="input"
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
                            <div style={{ width: "100px", height: "34px", marginRight: "15px", }}></div>
                        </div>
                    </div>
                    <div style={{ clear: "both", }}>
                        <div className={styles.productList}>
                            <table className={styles.productListTable}>
                                <tbody>
                                    <tr>
                                        <th style={{ width: "80px", }}>회원코드</th>
                                        <th style={{ width: "270px", }}>닉네임</th>
                                        <th style={{ width: "120px", }}>권한</th>
                                        <th style={{ width: "120px", }}>가입일</th>
                                        <th style={{ width: "120px", }}>최근 접속일</th>
                                        <th style={{ width: "100px", }}></th>
                                        <th style={{ width: "100px", }}></th>
                                    </tr>
                                    <tr>
                                        <td colSpan={7}>
                                            <hr className={styles.tableLine} />
                                        </td>
                                    </tr>
                                    <SelectAllUsers
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
        </div>
    );
}

export default AdminSelectAllUsers;