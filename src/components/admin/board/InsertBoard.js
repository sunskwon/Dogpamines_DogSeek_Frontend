import { jwtDecode } from "jwt-decode";

import styles from "./AdminBoards.module.css";

function InsertBoard({ notice, setNotice }) {

    const decodedToken = jwtDecode(window.localStorage.getItem("accessToken"));
    const userCode = decodedToken.userCode;
    const userNick = decodedToken.userNick;

    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate()}`;

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
                        />
                    </div>
                    <div className={styles.detailBoxLong}>
                        <p>제목</p>
                        <input
                            type="text"
                            name="postTitle"
                            style={{ width: "460px", }}
                            onChange={valueChangeHandler}
                        />
                    </div>
                </div>
                <div style={{ clear: "both", }}>
                    <div className={styles.detailBoxShort}>
                        <p>분류</p>
                        <input
                            style={{ backgroundColor: "rgba(212, 212, 212, 1)" }}
                            disabled
                            value={'공지'}
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
                            value={today}
                        />
                    </div>
                    <div className={styles.detailBoxShort}>
                        <p>게시여부</p>
                        <input
                            style={{ backgroundColor: "rgba(212, 212, 212, 1)" }}
                            disabled
                        />
                    </div>
                </div>
                <div className={styles.detailBoxFull}>
                    <p>내용</p>
                    <textarea
                        type="text"
                        name="postContext"
                        style={{ width: "630px", height: "105px", textAlign: "start", }}
                        onChange={valueChangeHandler}
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

export default InsertBoard;