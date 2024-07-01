import styles from "../adminCommon/AdminModal.module.css";

function CommentModal({ commentModalOpen, setCommentModalOpen, modalBackground, comments }) {

    return (
        <>
            {
                commentModalOpen &&
                <div
                    className={styles.modalContainer}
                    ref={modalBackground}
                    onClick={e => {
                        if (e.target === modalBackground.current) {
                            setCommentModalOpen(false);
                        }
                    }}
                >
                    <div
                        className={styles.modalContent}
                        style={{ width: "720px", height: "390px", }}
                    >
                        <div
                            className={styles.detailBox}
                            style={{ height: "350px", overflowY: "auto", }}
                        >
                            <div style={{ width: "710px", }}>
                                {comments[0].map((comment, index) => (
                                    <div
                                        key={index}
                                        style={{ borderRadius: "10px", border: "1px solid rgba(212, 212, 212, 1)", margin: "5px", padding: "5px", }}
                                    >
                                        <div>
                                            <div className={styles.detailBoxShort}>
                                                <p>댓글코드</p>
                                                <div className={styles.spanBox}>
                                                    <span>{comment.commentCode}</span>
                                                </div>
                                            </div>
                                            <div className={styles.detailBoxShort}>
                                                <p>작성일</p>
                                                <div className={styles.spanBox}>
                                                    <span>{comment.commentDate}</span>
                                                </div>
                                            </div>
                                            <div className={styles.detailBoxShort}>
                                                <p>게시여부</p>
                                                <div className={styles.spanBox}>
                                                    <span>
                                                        {comment.commentStatus === 'Y' ? '게시중' : '게시중단'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={styles.detailBoxShort}>
                                                <p>신고</p>
                                                <div className={styles.spanBox}>
                                                    {/* <span>{comment.commentDate}</span> */}
                                                </div>
                                            </div>
                                            <div className={styles.detailBoxFull}>
                                                <p>내용</p>
                                                <div className={styles.spanBox}>
                                                    <span>{comment.commentContext}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default CommentModal;