import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import { PutAPI } from "../../../api/RestAPIs";

import UpdateBoard from "../../../components/admin/board/UpdateBoard";

import styles from "../AdminPages.module.css";

function AdminUpdateBoard() {

    const decodedToken = jwtDecode(window.localStorage.getItem("accessToken"));
    const userCode = decodedToken.userCode;

    const [notice, setNotice] = useState(
        {
            postCode: 0,
            postTitle: '',
            postContext: '',
            postDate: '',
            postCategory: '공지',
            postStatus: 'N',
            userCode: userCode
        }
    );

    const { state } = useLocation();

    const navigate = useNavigate();

    const submitHandler = async () => {

        const address = '/post';

        const response = await PutAPI(address, notice);

        navigate("/admin/boarddetail", {
            state: { Location: response.headers.get('Location') }
        });
    };

    return (
        <div>
            <p className={styles.subTitle}>사료 정보 관리</p>
            <div className={styles.mainOuter}>
                <div className={styles.mainBox}>
                    <div>
                        <p className={styles.subjectTitle}>사료 정보 수정</p>
                        <div style={{ float: "right", }}>
                            <button
                                className={styles.cancelButton}
                                style={{ marginRight: "15px", }}
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                돌아가기
                            </button>
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "10px", }}
                                onClick={submitHandler}
                            >
                                변경
                            </button>
                        </div>
                        <div
                            className={styles.productDetail}
                            style={{ paddingTop: "100px", }}
                        >
                            <UpdateBoard
                                Location={state.Location}
                                notice={notice}
                                setNotice={setNotice}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminUpdateBoard;