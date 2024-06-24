import { useNavigate } from "react-router-dom";
import React from 'react';
import PropTypes from 'prop-types';
import styles from "./Modal.module.css";

const Modal = ({
    isModalOpen,
    setIsModalOpen,
    modalContent,
    modalAfterPath,
    onConfirm,
    onCancel,
    showConfirmButton = true,
    showCancelButton = true,
    confirmButtonText = "확인",
    cancelButtonText = "취소"
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

    const handleCancel = (e) => {
        if (onCancel) onCancel();
        setIsModalOpen(false);
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
                    {showCancelButton && (
                        <span className={styles.modal_btn1} onClick={handleCancel}>
                            {cancelButtonText}
                        </span>
                    )}
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

Modal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    setIsModalOpen: PropTypes.func.isRequired,
    modalContent: PropTypes.arrayOf(PropTypes.string).isRequired,
    modalAfterPath: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    showConfirmButton: PropTypes.bool,
    showCancelButton: PropTypes.bool,
    confirmButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
};

export default Modal;