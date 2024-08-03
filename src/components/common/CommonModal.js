import styles from './CommonModal.module.css';

function LoginModal({ modal, setModal, modalOnClickHandler }) {

    return (
        <>
            {modal.open && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.iconContainer}>
                            {modal.type === 'allowed' ?
                                <img
                                    src='./images/auth/modal_check.png'
                                    alt='modal_check'
                                />
                                :
                                <img
                                    src='./images/auth/exclamationmark_circle.png'
                                    alt='exclamation_circle'
                                />
                            }
                        </div>
                        <div className={styles.modalTextContainer}>
                            <p>{modal.text}</p>
                        </div>
                        <div className={styles.modalButtonContainer}>
                            {modal.type === 'confirm' ?
                                <>
                                    <button
                                        className={styles.cancelButton}
                                        onClick={() => setModal({ ...modal, open: false })}
                                    >
                                        닫기
                                    </button>
                                    <button
                                        className={styles.acceptButton}
                                        onClick={() => modalOnClickHandler()}
                                    >
                                        확인
                                    </button>
                                </>
                                :
                                modal.type === 'transfer' ?
                                    <button
                                        className={styles.allowButton}
                                        onClick={() => {
                                            setModal({ ...modal, open: false })
                                            modalOnClickHandler()
                                        }}>
                                        닫기
                                    </button>
                                    :
                                    <button
                                        className={styles.allowButton}
                                        onClick={() => {

                                            // modalOnClickHandler ? modalOnClickHandler : 'none'
                                            setModal({ ...modal, open: false })
                                        }}
                                    >
                                        닫기
                                    </button>
                            }
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default LoginModal;