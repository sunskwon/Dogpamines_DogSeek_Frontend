import styles from "../adminCommon/AdminModal.module.css";

function BoardModal({ boardModalOpen, setBoardModalOpen, modalBackground, board }) {

    return (
        <>
            {
                boardModalOpen &&
                <div
                    className={styles.modalContainer}
                    ref={modalBackground}
                    onClick={e => {
                        if (e.target === modalBackground.current) {
                            setBoardModalOpen(false);
                        }
                    }}
                >
                    <div
                        className={styles.modalContent}
                        style={{ height: "390px", }}
                    >
                        <div className={styles.detailBox}>
                            <div style={{ width: "680px", }}>
                                <div>
                                    <div className={styles.detailBoxShort}>
                                        <p>게시물코드</p>
                                        <div className={styles.spanBox}>
                                            <span>{board?.postCode}</span>
                                        </div>
                                    </div>
                                    <div className={styles.detailBoxLong}>
                                        <p>제목</p>
                                        <div className={styles.spanBox}>
                                            <span>{board?.postTitle}</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ clear: "both", }}>
                                    <div className={styles.detailBoxShort}>
                                        <p>분류</p>
                                        <div className={styles.spanBox}>
                                            <span>{board?.postCategory}</span>
                                        </div>
                                    </div>
                                    <div className={styles.detailBoxShort}>
                                        <p>작성자</p>
                                        <div className={styles.spanBox}>
                                            <span>{board?.userNick}</span>
                                        </div>
                                    </div>
                                    <div className={styles.detailBoxShort}>
                                        <p>작성일</p>
                                        <div className={styles.spanBox}>
                                            <span>{board?.postDate}</span>
                                        </div>
                                    </div>
                                    <div className={styles.detailBoxShort}>
                                        <p>게시여부</p>
                                        <div className={styles.spanBox}>
                                            <span>{board?.postStatus}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.detailBoxFull}>
                                    <p>내용</p>
                                    <div className={styles.spanBox}>
                                        <span>{board?.postContext}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default BoardModal;