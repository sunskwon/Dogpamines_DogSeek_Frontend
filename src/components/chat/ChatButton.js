import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import PrivateChat from '../chat/PrivateChat';

import { jwtDecode } from "jwt-decode";

import styles from './UserChat.module.css';

function ChatButton() {

    const [button, setButton] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const [userCode, setUserCode] = useState();
    const [userNick, setUserNick] = useState();

    const navigate = useNavigate();

    useEffect(() => {

        try {

            if (!localStorage.getItem('accessToken')) {

                setButton(false);
                setModalOpen(false);
            } else {

                const decodedToken = jwtDecode(localStorage.getItem('accessToken'));
                const code = decodedToken.userCode;
                const nick = decodedToken.userNick;

                setButton(true);
                setUserCode(code);
                setUserNick(nick);
            }
        } catch (error) {
            console.log(error);
        }

        return () => {

            setModalOpen(false);
        }
    }, [localStorage.getItem('accessToken'), localStorage.getItem('refreshToken')]);

    return modalOpen ? (
        <div className={styles.chat__container}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "15px", }}>
                <p className={styles.modalTitle}>1:1 문의 하기</p>
                <button
                    className={styles.exitButton}
                    onClick={() => { setModalOpen(false) }}
                >
                    닫기
                </button>
            </div>
            <div>
                <PrivateChat
                    code={userCode}
                    nick={userNick}
                />
            </div>
        </div>
    ) : (
        !modalOpen && button ? (
            <div className={styles.scroll__container}>
                <div
                    className={styles.button__container}
                    onClick={() => { setModalOpen(true) }}
                >
                    <img src='/images/main/Consultation.png' />
                </div>
            </div>
        ) : (
            <>
                <div style={{ opacity: "0", }}></div>
            </>
        )
    )
}

export default ChatButton;