import { useState } from "react";

import styles from "../adminCommon/AdminModal.module.css";

function ImageInput({ name, item, setItem, modalOpen, setModalOpen, modalBackground }) {

    const [input, setInput] = useState('');

    const onChangeHandler = (e) => {

        setInput(e.target.value);
    };

    const onClickHandler = () => {

        if (input.length < 255) {

            setItem({
                ...item,
                [name]: input
            });
            setInput('');
            setModalOpen(false);
        }
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
                            setInput('');
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
                                        placeholder="255자 이내로 입력하세요"
                                        onKeyDown={(e) => {
                                            if (e.keyCode === 13) {
                                                onClickHandler();
                                            }
                                        }}
                                    />
                                    <div
                                        style={{ marginBottom: "20px", }}
                                    >
                                        <span
                                            style={{
                                                color: input.length === 0 ?
                                                    "rgba(153, 153, 153, 1)" :
                                                    (input.length < 255 ? "rgba(99, 197, 74, 1)" :
                                                        "rgba(255, 0, 0, 1)"
                                                    ),
                                            }}
                                        >
                                            {input.length}
                                        </span>
                                        <span>/255</span>
                                    </div>
                                    <div>
                                        <button
                                            className={styles.cancelButton}
                                            onClick={() => {
                                                setInput('');
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