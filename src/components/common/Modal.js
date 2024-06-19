import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import styles from "./Modal.module.css";

const Modal = ({
    isModalOpen,
    setIsModalOpen,
    modalContent,
    modalAfterpath,
}) => {
    const navigate = useNavigate();

    if(!isModalOpen) return null;
    const closeModal = () => {
        setIsModalOpen(false);
        navigate(modalAfterpath);
    };

    return (
        <div className={styles.modal} onClick={closeModal}>
            <div className={styles.modal_wrap} onClick={(e) => e.stopPropagation()}>
                <p className={styles.modal_content}>
                    {modalContent.map((content, index) => (
                        <p key={index}>{content}</p>
                    ))}
                </p>
                <span className={styles.modal_btn} onClick={closeModal}>닫기</span>
            </div>
        </div>
    );
};
  
  export default Modal;