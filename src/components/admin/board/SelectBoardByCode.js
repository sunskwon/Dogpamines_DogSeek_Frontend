import { useState, useEffect } from "react";

import { GetAPI } from "../../../api/RestAPIs";

import styles from "./AdminBoards.module.css";

function SelectBoardByCode({ Location }) {

    const [notice, setNotice] = useState();

    const call = async () => {

        const response = await GetAPI(Location);

        const result = await response.notice;

        return result;
    };

    useEffect(() => {
        call().then(res => setNotice(res));
    }, []);

    return (
        <div className={styles.detailBox}>
            <div style={{ width: "680px", }}>
                <div>
                    <div className={styles.detailBoxShort}>
                        <p>게시물코드</p>
                        <div className={styles.spanBox}>
                            <span>{notice?.postCode}</span>
                        </div>
                    </div>
                    <div className={styles.detailBoxLong}>
                        <p>제목</p>
                        <div className={styles.spanBox}>
                            <span>{notice?.postTitle}</span>
                        </div>
                    </div>
                </div>
                <div style={{ clear: "both", }}>
                    <div className={styles.detailBoxShort}>
                        <p>분류</p>
                        <div className={styles.spanBox}>
                            <span>{notice?.postCategory}</span>
                        </div>
                    </div>
                    <div className={styles.detailBoxShort}>
                        <p>작성자</p>
                        <div className={styles.spanBox}>
                            <span>{notice?.userNick}</span>
                        </div>
                    </div>
                    <div className={styles.detailBoxShort}>
                        <p>작성일</p>
                        <div className={styles.spanBox}>
                            <span>{notice?.postDate}</span>
                        </div>
                    </div>
                    <div className={styles.detailBoxShort}>
                        <p>게시여부</p>
                        <div className={styles.spanBox}>
                            <span>{notice?.postStatus === 'Y' ? '게시중' : '게시 중단'}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.detailBoxFull}>
                    <p>내용</p>
                    <div className={styles.spanBox}>
                        <span>{notice?.postContext}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectBoardByCode;