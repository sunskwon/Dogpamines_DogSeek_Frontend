import { useState } from "react";

import styles from "../adminCommon/AdminModal.module.css";

function ImageInput({ name, item, setItem, modalOpen, setModalOpen, modalBackground }) {

    const [input, setInput] = useState('');

    const onChangeHandler = (e) => {

        setInput(e.target.value);
    };

    const onClickHandler = () => {

        setItem({
            ...item,
            [name]: input
        });
        setModalOpen(false);
    };

    return (
        <>
            {modalOpen &&
                <div
                    className={styles.modalContainer}
                    style={{ paddingTop: "500px", }}
                    ref={modalBackground}
                    onClick={e => {
                        if (e.target === modalBackground.current) {
                            setModalOpen(false);
                        }
                    }}
                >
                    <div
                        className={styles.modalContent}
                        style={{ height: "260px", }}
                    >
                        <div className={styles.detailBox}>
                            <div className={styles.inputBox}>
                                <div>
                                    <p>url 주소를 입력하세요</p>
                                    <input
                                        name={name}
                                        type='text'
                                        onChange={onChangeHandler}
                                        style={{ width: "290px", }}
                                    />
                                    <div>
                                        <button
                                            className={styles.cancelButton}
                                            onClick={() => {
                                                setModalOpen(false);
                                            }}
                                        >
                                            취소
                                        </button>
                                        <button
                                            className={styles.acceptButton}
                                            onClick={onClickHandler}
                                        >
                                            등록
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default ImageInput;