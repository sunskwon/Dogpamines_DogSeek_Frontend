import { useNavigate } from "react-router-dom";
import React from 'react';
import PropTypes from 'prop-types';
import styles from "./DictModal.module.css";

const DictModal = ({
    isModalOpen,
    setIsModalOpen,
    modalContent,
    modalAfterPath,
    onConfirm,
    showConfirmButton = true,
    confirmButtonText = "확인",
}) => {
    const navigate = useNavigate();

    if (!isModalOpen) return null;

    const closeModal = () => {
        setIsModalOpen(false);
        if (modalAfterPath) navigate(modalAfterPath);
    };

    const handleConfirm = () => {
        if (onConfirm) onConfirm();
        closeModal();
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modal_wrap} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modal_content}>
                    {modalContent.map((content, index) => (
                        <p key={index}>{content}</p>
                    ))}
                </div>
                <div className={styles.btnContainer}>
                    {showConfirmButton && (
                        <span className={styles.modal_btn} onClick={handleConfirm}>
                            {confirmButtonText}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

DictModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    setIsModalOpen: PropTypes.func.isRequired,
    modalContent: PropTypes.arrayOf(PropTypes.string).isRequired,
    modalAfterPath: PropTypes.string,
    onConfirm: PropTypes.func,
    showConfirmButton: PropTypes.bool,
    confirmButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
};

export default DictModal;