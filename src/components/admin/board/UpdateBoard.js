import { useEffect } from "react";

import { jwtDecode } from "jwt-decode";

import { GetAPI } from "../../../api/RestAPIs";

import styles from "./AdminBoards.module.css";

function UpdateProduct({ Location, notice, setNotice }) {

    const decodedToken = jwtDecode(window.localStorage.getItem("accessToken"));
    const userCode = decodedToken.userCode;
    const userNick = decodedToken.userNick;

    const call = async () => {

        const response = await GetAPI(Location);

        const result = await response.notice;

        return result;
    };

    useEffect(() => {
        call().then(res => {

            var notice = res;

            notice.userCode = userCode;
            notice.userNick = userNick;

            setNotice(notice);
        });
    }, []);

    const valueChangeHandler = e => {
        setNotice({
            ...notice,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className={styles.detailBox}>
            <div style={{ width: "680px", }}>
                <div>
                    <div className={styles.detailBoxShort}>
                        <p>게시물 No.</p>
                        <input
                            style={{ backgroundColor: "rgba(212, 212, 212, 1)" }}
                            disabled
                            value={notice?.postCode}
                        />
                    </div>
                    <div className={styles.detailBoxShort}>
                        <p>분류</p>
                        <input
                            style={{ backgroundColor: "rgba(212, 212, 212, 1)" }}
                            disabled
                            value={notice?.postCategory}
                        />
                    </div>
                    <div className={styles.detailBoxShort}>
                        <p>작성자</p>
                        <input
                            style={{ backgroundColor: "rgba(212, 212, 212, 1)" }}
                            disabled
                            value={userNick}
                        />
                    </div>
                    <div className={styles.detailBoxShort}>
                        <p>작성일</p>
                        <input
                            style={{ backgroundColor: "rgba(212, 212, 212, 1)" }}
                            disabled
                            value={notice?.postDate}
                        />
                    </div>

                </div>
                <div style={{ clear: "both", }}>
                    <div className={styles.detailBoxLong}>
                        <p>제목</p>
                        <input
                            type="text"
                            name="postTitle"
                            style={{ width: "460px", }}
                            onChange={valueChangeHandler}
                            value={notice?.postTitle}
                        />
                    </div>
                    <div className={styles.detailBoxShort}>
                        <p>게시여부</p>
                        <select
                            name="postStatus"
                            onChange={valueChangeHandler}
                            value={notice?.postStatus}
                        >
                            <option value={'Y'}>게시중</option>
                            <option value={'N'}>게시중단</option>
                        </select>
                    </div>
                </div>
                <div className={styles.detailBoxFull}>
                    <p>내용</p>
                    <textarea
                        type="text"
                        name="postContext"
                        style={{ width: "630px", height: "105px", textAlign: "start", }}
                        onChange={valueChangeHandler}
                        value={notice?.postContext}
                    />
                </div>
                <input
                    type="hidden"
                    name="userCode"
                    value={userCode}
                />
            </div>
        </div>
    );
}

export default UpdateProduct;