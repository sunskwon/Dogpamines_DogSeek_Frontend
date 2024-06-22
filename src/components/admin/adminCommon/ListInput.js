import { useState } from "react";

import styles from "./AdminCommon.module.css";

function ListInput({ target, list, setList, form, setForm }) {

    const [input, setInput] = useState('');

    return (
        <div style={{ display: "flex", flexDirection: "row", }}>
            <div style={{ float: "left", }}>
                {list.map((item, index) => (
                    <div
                        key={index}
                        style={{ display: "flex", float: "left", }}
                    >
                        <span>
                            {item}
                            &nbsp;
                            <img
                                src="/images/admin/Delete.png"
                                alt="X"
                                style={{ width: "15px", height: "15px", cursor: "pointer", }}
                                onClick={() => {

                                    const RemoveIndex = index;
                                    const originList = list;
                                    const removedList = originList.filter(
                                        function (_, index) {
                                            return index !== RemoveIndex;
                                        });

                                    setList(removedList);
                                    setForm({
                                        ...form,
                                        [target]: removedList.toString()
                                    });
                                }}
                            />
                        </span>
                    </div>
                ))}
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        id={target}
                        onChange={(e) => {
                            setInput(e.target.value);
                        }}
                    />
                    <img
                        src="/images/admin/Add.png"
                        alt="+"
                        onClick={() => {

                            const originList = list;
                            const updateList = [...originList, input];

                            setList(updateList);
                            setForm({
                                ...form,
                                [target]: updateList.toString()
                            });

                            document.getElementById(`${target}`).value = '';
                            setInput('');
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ListInput;