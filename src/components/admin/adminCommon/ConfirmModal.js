import styles from "./AdminModal.module.css";

function ConfirmModal({ message, onClickHandler, modalOpen, setModalOpen, modalBackground }) {

    return (
        <>
            {
                modalOpen &&
                <div
                    className={styles.modalContainer}
                    style={{ paddingTop: "500px", }}
                    ref={modalBackground}
                    onClick={e => {
                        if (e.target === modalBackground.current) {
                            setModalOpen(false);
                        }
                    }}
                >
                    <div
                        className={styles.modalContent}
                        style={{ height: "260px", }}
                    >
                        <div className={styles.detailBox}>
                            <div className={styles.inputBox}>
                                <div style={{ paddingTop: "20px", }}>
                                    <p>{message}</p>
                                    <div style={{ paddingTop: "70px", }}>
                                        <button
                                            className={styles.cancelButton}
                                            onClick={() => {
                                                setModalOpen(false);
                                            }}
                                        >
                                            취소
                                        </button>
                                        <button
                                            className={styles.acceptButton}
                                            onClick={onClickHandler}
                                        >
                                            확인
                                        </button>
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

export default ConfirmModal;