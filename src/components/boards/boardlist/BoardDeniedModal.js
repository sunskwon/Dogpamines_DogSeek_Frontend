import { useNavigate } from 'react-router-dom';

import styles from './BoardDeniedModal.module.css';

function BoardDeniedModal({ modalOpen, setModalOpen }) {

    const navigate = useNavigate();

    return (
        <>
            {modalOpen &&
                <div className={styles.modalContainer}>
                    <div className={styles.modalContent}>
                        <div className={styles.textBox}>
                            <p>로그인이 필요한 서비스입니다</p>
                            <p>로그인 페이지로 이동하시겠습니까?</p>
                        </div>
                        <div className={styles.buttonBox}>
                            <button
                                className={styles.modalCancelButton}
                                onClick={() => setModalOpen(false)}
                            >
                                취소
                            </button>
                            <button
                                className={styles.modalCheckButton}
                                onClick={() => navigate('/login')}
                            >
                                이동
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default BoardDeniedModal;