import { useState, useEffect } from "react";

import { GetAPI } from "../../../api/RestAPIs";

import Loading from "../adminCommon/Loading";

import styles from "./AdminBoards.module.css";

function SelectBoardByCode({ Location }) {

    const [notice, setNotice] = useState({});
    const [error, setError] = useState(null);
    const [boolLoading, setBoolLoading] = useState(false);

    const call = async () => {

        setBoolLoading(true);

        try {

            const response = await GetAPI(Location);

            if (response.error) {

                setError(response.error);

                return null;
            }

            const result = await response.notice;

            return result;
        } catch (error) {

            setError(error);

            return null;
        } finally {

            setBoolLoading(false);
        }
    };

    useEffect(() => {
        call().then(res => {

            setBoolLoading(true);

            try {

                setNotice(res)
            } catch (error) {

                setError(error);
                setNotice(null);
            } finally {

                setBoolLoading(false);
            }
        }
        )
    }, []);

    if (error) {
        throw error;
    }

    return boolLoading ? (<Loading height="400px" />) : (
        notice ? (
            <>
                <div className={styles.detailBox}>
                    <div style={{ width: "680px", }}>
                        <div>
                            <div className={styles.detailBoxShort}>
                                <p>게시물 No.</p>
                                <div className={styles.spanBox}>
                                    <span>{notice?.postCode}</span>
                                </div>
                            </div>
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
                        </div>
                        <div style={{ clear: "both", }}>
                            <div className={styles.detailBoxLong}>
                                <p>제목</p>
                                <div className={styles.spanBox}>
                                    <span>{notice?.postTitle}</span>
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
            </>
        ) : (
            <>
                <div className={styles.errorBox}>
                    <div>
                        <img
                            src="/images/admin/CloseWindow.png"
                            alt="취소 아이콘"
                        />
                        <p>선택한 공지의 정보가 없습니다</p>
                        <p>다시 시도해주세요</p>
                    </div>
                </div>
            </>
        )
    );
}

export default SelectBoardByCode;