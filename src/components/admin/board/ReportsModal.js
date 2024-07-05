import styles from "../adminCommon/AdminModal.module.css";

function ReportsModal({ reportsModalOpen, setReportsModalOpen, modalBackground, reports }) {

    return (
        <>
            {
                reportsModalOpen &&
                <div
                    className={styles.modalContainer}
                    ref={modalBackground}
                    onClick={e => {
                        if (e.target === modalBackground.current) {
                            setReportsModalOpen(false);
                        }
                    }}
                >
                    <div
                        className={styles.modalContent}
                        style={{ width: "720px", height: "390px", }}
                    >
                        {reports.length > 0 &&
                            <div
                                className={styles.detailBox}
                                style={{ height: "350px", overflowY: "auto", }}
                            >
                                <div style={{ width: "710px", }}>
                                    {reports.map(report => (
                                        <div key={report.reportCode}>
                                            <div className={styles.reportsBox}>
                                                <div className={styles.detailBoxShort}>
                                                    <p>신고 No.</p>
                                                    <div className={styles.spanBox}>
                                                        <span>{report.reportCode}</span>
                                                    </div>
                                                </div>
                                                <div className={styles.detailBoxShort}>
                                                    <p>신고일</p>
                                                    <div className={styles.spanBox}>
                                                        <span>{report.reportDate}</span>
                                                    </div>
                                                </div>
                                                <div className={styles.detailBoxShort}>
                                                    <p>신고자</p>
                                                    <div className={styles.spanBox}>
                                                        <span>{report.reportNick}</span>
                                                    </div>
                                                </div>
                                                <div className={styles.detailBoxShort}>
                                                    <p>신고 사유</p>
                                                    <div className={styles.spanBox}>
                                                        <span>{report.reportReason}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    );
}

export default ReportsModal;