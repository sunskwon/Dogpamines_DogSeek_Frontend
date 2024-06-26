import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { PostAPI } from "../../../api/RestAPIs";

import InsertBoard from "../../../components/admin/board/InsertBoard";

import styles from "../AdminPages.module.css";

function AdminInsertBoard() {

    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate()}`;

    const [notice, setNotice] = useState({
        postCode: 0,
        postTitle: '',
        postContext: '',
        postDate: today,
        postCategory: '공지',
        postStatus: 'N',
        userCode: 1
    });

    const navigate = useNavigate();

    const submitHandler = async () => {

        const address = '/post';

        const response = await PostAPI(address, notice);

        navigate(-1);
    };

    return (
        <div>
            <p className={styles.subTitle}>게시판 관리</p>
            <div className={styles.mainOuter}>
                <div className={styles.mainBox}>
                    <div>
                        <p className={styles.subjectTitle}>신규 공지 등록</p>
                        <div style={{ float: "right", }}>
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "10px", }}
                                onClick={submitHandler}
                            >
                                등록
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
                    </div>
                    <div
                        className={styles.productDetail}
                        style={{ paddingTop: "100px", }}
                    >
                        <InsertBoard
                            notice={notice}
                            setNotice={setNotice}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminInsertBoard;