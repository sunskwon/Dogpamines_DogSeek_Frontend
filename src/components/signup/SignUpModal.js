import { useNavigate } from 'react-router-dom';

import styles from './SignUpModal.module.css';

function SignUpModal({ modal, setModal }) {

    const navigate = useNavigate();

    const onClickHandler = () => {

        setModal({
            modalOpen: false,
            modalType: '',
            modalText: '',
        });
    };

    return (
        <>
            {modal.modalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.iconContainer}>
                            <img src='./images/auth/exclamationmark_circle.png' alt='exclamation_circle'></img>
                        </div>
                        <div className={styles.modalTextContainer}>
                            <p>{modal.modalText}</p>
                        </div>
                        {modal.modalType === 'notice' ? (
                            <div className={styles.btnContainer}>
                                <button
                                    className={styles.rightBtn}
                                    onClick={onClickHandler}
                                >
                                    닫기
                                </button>
                            </div>
                        ) : (
                            <div className={styles.btnContainer}>
                                <button
                                    className={styles.leftBtn}
                                    onClick={onClickHandler}
                                >
                                    아니오
                                </button>
                                <button
                                    className={styles.rightBtn}
                                    onClick={() => navigate('/')}
                                >
                                    예
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default SignUpModal;