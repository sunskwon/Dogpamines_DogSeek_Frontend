import { useState } from "react";

import { useNavigate } from "react-router-dom";

import SelectAllNotices from "../../../components/admin/board/SelectAllNotices";
import SelectAllBoards from "../../../components/admin/board/SelectAllBoards";

import styles from "../AdminPages.module.css";

function AdminSelectAllBoards() {

    const [searchNotice, setSearchNotice] = useState({
        type: 'postTitle',
        input: ''
    });

    const [searchBoard, setSearchBoard] = useState({
        type: 'postTitle',
        input: ''
    });

    const [noticeBool, setNoticeBool] = useState(true);
    const [boardBool, setBoardBool] = useState(true);

    const navigate = useNavigate();

    const noticeValueChangeHandler = e => {
        setSearchNotice({
            ...searchNotice,
            [e.target.name]: e.target.value
        });
    };

    const boardValueChangeHandler = e => {
        setSearchBoard({
            ...searchBoard,
            [e.target.name]: e.target.value
        })
    }

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
                                onChange={noticeValueChangeHandler}
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
                                onChange={noticeValueChangeHandler}
                            />
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "10px", }}
                                onClick={() => {
                                    setNoticeBool(!noticeBool);
                                }}                            >
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
                                        <th style={{ width: "100px", }}>게시물코드</th>
                                        <th style={{ width: "150px", }}>작성자</th>
                                        <th style={{ width: "210px", }}>제목</th>
                                        <th style={{ width: "150px", }}>작성일</th>
                                        <th style={{ width: "100px", }}>게시여부</th>
                                        <th style={{ width: "100px", }}></th>
                                        <th style={{ width: "100px", }}></th>
                                    </tr>
                                    <tr>
                                        <td colSpan={7}>
                                            <hr className={styles.tableLine} />
                                        </td>
                                    </tr>
                                    <SelectAllNotices
                                        search={searchNotice}
                                        bool={noticeBool}
                                        setBool={setNoticeBool}
                                    />
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div style={{ paddingTop: "20px", }}>
                        <p className={styles.subjectTitle}>게시물 목록</p>
                        <div style={{ float: "right", }}>
                            <select
                                name="type"
                                style={{ width: "80px", height: "34px", }}
                                onChange={boardValueChangeHandler}
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
                                onChange={boardValueChangeHandler}
                            />
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "10px", }}
                                onClick={() => {
                                    setBoardBool(!boardBool);
                                }}                            >
                                검색
                            </button>
                            <div style={{ float: "right", width: "100px", height: "30px", marginRight: "15px", }}></div>
                        </div>
                    </div>
                    <div
                        className={styles.productList}
                        style={{ height: "300px", }}
                    >
                        <table className={styles.productListTable}>
                            <tbody>
                                <tr>
                                    <th style={{ width: "100px", }}>게시물코드</th>
                                    <th style={{ width: "100px", }}>작성자</th>
                                    <th style={{ width: "110px", }}>제목</th>
                                    <th style={{ width: "100px", }}>작성일</th>
                                    <th style={{ width: "100px", }}>게시여부</th>
                                    <th style={{ width: "100px", }}></th>
                                    <th style={{ width: "100px", }}></th>
                                    <th style={{ width: "100px", }}>신고 횟수</th>
                                    <th style={{ width: "100px", }}></th>
                                </tr>
                                <tr>
                                    <td colSpan={9}>
                                        <hr className={styles.tableLine} />
                                    </td>
                                </tr>
                                <SelectAllBoards
                                    search={searchBoard}
                                    bool={boardBool}
                                    setBool={setBoardBool}
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSelectAllBoards;