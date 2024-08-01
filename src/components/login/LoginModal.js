import styles from './LoginModal.module.css';

function LoginModal({ modalOpen, setModalOpen, modalText }) {

    const onClickHandler = () => {

        setModalOpen(prev => !prev);
    };

    return (
        <>
            {modalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.iconContainer}>
                            <img
                                src='./images/auth/exclamationmark_circle.png'
                                alt='exclamation_circle'
                            />
                        </div>
                        <div className={styles.modalTextContainer}>
                            <p>{modalText}</p>
                        </div>
                        <button onClick={onClickHandler}>닫기</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default LoginModal;