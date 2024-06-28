import styles from "./AdminModal.module.css";

function ConfirmModal({ setModalOpen, message, onClickHandler }) {

    return (
        <>
            {
                boardModalOpen &&
                <div
                    className={styles.modalContainer}
                    ref={modalBackground}
                    onClick={e => {
                        if (e.target === modalBackground.current) {
                            setModalOpen(false);
                        }
                    }}
                >
                    <div
                        className={styles.modalContent}
                        style={{ height: "390px", }}
                    >
                        <div>
                            {message}
                        </div>
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
            }
        </>
    );
}

export default ConfirmModal;