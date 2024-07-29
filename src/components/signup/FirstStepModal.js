import { useState } from 'react';

import styles from './FirstStepModal.module.css';

function FirstStepModal() {

    const [modal, setModal] = useState({
        state: false,
        isOneBtn: true,
        text: '',
    });

    return (
        <>
            {modal.state && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.iconContainer}>
                            <img src='./images/auth/exclamationmark_circle.png' alt='exclamation_circle'></img>
                        </div>
                        <div className={styles.modalTextContainer}>
                            <p>{modal.text}</p>
                        </div>
                        {modal.isOneBtn ? (
                            <button 
                            // onClick={closeModal}
                            >닫기</button>
                        ) : (
                            <div className={styles.btnContainer}>
                                <button className={styles.leftBtn} 
                                // onClick={confirmCancel}
                                >예</button>
                                <button className={styles.rightBtn} 
                                // onClick={closeModal}
                                >아니오</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default FirstStepModal;