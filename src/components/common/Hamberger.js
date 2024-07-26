import { useState } from "react";

import { useNavigate } from "react-router-dom";

import styles from './Hamberger.module.css';

function Hamberger() {

    const [modalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate();

    const curation = () => {
        const token = window.localStorage.getItem("accessToken")
        if (token != null) {
            navigate("/curation")
        } else {
            setModalOpen(true);
        }
    }

    if (modalOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    };

    return (
        <>
            {
                modalOpen &&
                <div className={styles.modalContainer}>
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
            <div className={styles.scroll__container}>
                <div className={styles.wrapBox}>
                    <div style={{ display: "flex", }}>
                        <div className={styles.buttons}>
                            <div
                                className={styles.button__container}
                                onClick={() => navigate('/animal-info')}
                            >
                                <img
                                    src='/images/common/Search.png'
                                    alt=''
                                />
                            </div>
                            <div
                                className={styles.button__container}
                                onClick={() => navigate('/dogs')}
                            >
                                <img
                                    src='/images/common/Dog.png'
                                    alt=''
                                />
                            </div>
                            <div
                                className={styles.button__container}
                                onClick={curation}
                            >
                                <img
                                    src='/images/common/DogBowl.png'
                                    alt=''
                                />
                            </div>
                            <div
                                className={styles.button__container}
                                onClick={() => navigate('/boards')}
                            >
                                <img
                                    src='/images/common/Notepad.png'
                                    alt=''
                                />
                            </div>
                            <div
                                className={styles.button__container}
                                onClick={() => navigate('/public-chat')}
                            >
                                <img
                                    src='/images/common/Chat.png'
                                    alt=''
                                />
                            </div>
                        </div>
                        <div className={styles.button}>
                            <div className={styles.button__container}>
                                <img
                                    src='/images/common/BulletedList.png'
                                    alt=''
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hamberger;