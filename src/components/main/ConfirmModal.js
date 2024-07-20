import { useNavigate } from 'react-router-dom';

import styles from './ConfirmModal.module.css';

function ConfirmModal({ modalOpen, setModalOpen, modalBackground }) {

    const navigate = useNavigate();

    return (
        <>
            {
                modalOpen &&
                <div
                    className={styles.modalContainer}
                    ref={modalBackground}
                >
                    <div className={styles.modalContent}>
                        <div className={styles.allBox}>
                            <div style={{ marginTop: "80px" }}>
                                <p style={{ margin: "0", color: "#005600", fontSize: "16px", fontWeight: "600" }}>로그인이 필요한 서비스입니다</p>
                                <p style={{ margin: "0", color: "#005600", fontSize: "16px", fontWeight: "600" }}>로그인 페이지로 이동하시겠습니까?</p>
                            </div>
                            <div style={{ display: "flex", width: "270px", gap: "30px", margin: "0 auto", marginTop: "60px" }}>
                                <button className={styles.modalCancelButton} onClick={() => setModalOpen(false)}>취소</button>
                                <button className={styles.modalCheckButton} onClick={() => navigate("login")}>이동</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default ConfirmModal;