import { useEffect } from "react";

import { GetAPI } from "../../../api/RestAPIs";

import styles from "./AdminBoards.module.css";

function UpdateProduct({ Location, notice, setNotice }) {

    const call = async () => {

        const response = await GetAPI(Location);

        const result = await response.notice;

        return result;
    };

    useEffect(() => {
        call().then(res => setNotice(res));
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
                        <p>게시물코드</p>
                        <input
                            style={{ backgroundColor: "rgba(212, 212, 212, 1)" }}
                            disabled
                            placeholder={notice?.postCode}
                        />
                    </div>
                    <div className={styles.detailBoxLong}>
                        <p>제목</p>
                        <input
                            type="text"
                            name="postTitle"
                            style={{ width: "460px", }}
                            onChange={valueChangeHandler}
                            placeholder={notice?.postTitle}
                        />
                    </div>
                </div>
                <div style={{ clear: "both", }}>
                    <div className={styles.detailBoxShort}>
                        <p>분류</p>
                        <input
                            style={{ backgroundColor: "rgba(212, 212, 212, 1)" }}
                            disabled
                            placeholder={notice?.postCategory}
                        />
                    </div>
                    <div className={styles.detailBoxShort}>
                        <p>작성자</p>
                        <input
                            style={{ backgroundColor: "rgba(212, 212, 212, 1)" }}
                            disabled
                            placeholder={notice?.userNick}
                        />
                    </div>
                    <div className={styles.detailBoxShort}>
                        <p>작성일</p>
                        <input
                            style={{ backgroundColor: "rgba(212, 212, 212, 1)" }}
                            disabled
                            placeholder={notice?.postDate}
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
            </div>
        </div>
    );
}

export default UpdateProduct;