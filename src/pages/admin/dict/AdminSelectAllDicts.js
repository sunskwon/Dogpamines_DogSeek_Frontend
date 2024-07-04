import { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { DeleteAPI } from "../../../api/RestAPIs";

import SelectAllDicts from "../../../components/admin/dict/SelectAllDicts";

import ConfirmModal from "../../../components/admin/adminCommon/ConfirmModal";

import styles from "../AdminPages.module.css";

function AdminSelectAllDicts() {

    const [search, setSearch] = useState({
        type: 'dogName',
        input: ''
    });
    const [bool, setBool] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [dict, setDict] = useState({});

    const modalBackground = useRef();

    const navigate = useNavigate();

    const input = document.getElementById('typeInput');

    const valueChangeHandler = e => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        });
    };

    const searchSubmitHandler = () => {
        input.value = '';
        setBool(!bool);
    };

    const deleteHandler = async () => {

        const address = `/dict/${dict.dogCode}`;

        const response = await DeleteAPI(address);

        setBool(!bool);
        setModalOpen(false);
    };

    return (
        <div>
            <p className={styles.subTitle}>견종 정보 관리</p>
            <div className={styles.mainOuter}>
                <div className={styles.mainBox}>
                    <div>
                        <p className={styles.subjectTitle}>등록된 견종 목록</p>
                        <div style={{ float: "right", }}>
                            <select
                                name="type"
                                style={{ width: "100px", height: "34px", }}
                                onChange={valueChangeHandler}
                            >
                                <option
                                    value={'dogName'}
                                >
                                    견종이름
                                </option>
                                <option
                                    value={'dogSize'}
                                >
                                    견종크기
                                </option>
                            </select>
                            <input
                                id="typeInput"
                                name="input"
                                style={{ width: "150px", height: "30px", }}
                                onChange={valueChangeHandler}
                                onKeyDown={(e) => {
                                    if (e.keyCode === 13) {
                                        searchSubmitHandler(e);
                                    }
                                }}
                            />
                            <button
                                onClick={searchSubmitHandler}
                                className={styles.submitButton}
                                style={{ marginRight: "10px", }}
                            >
                                검색
                            </button>
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "15px", }}
                                onClick={() => {
                                    navigate("/admin/insertdict");
                                }}
                            >
                                새 견종 등록
                            </button>
                        </div>
                    </div>
                    <div style={{ clear: "both", }}>
                        <div className={styles.productList}>
                            <SelectAllDicts
                                search={search}
                                bool={bool}
                                setModalOpen={setModalOpen}
                                setDict={setDict}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmModal
                message={`${dict.dogCode}번 견종(${dict.dogName})을(를) 삭제 하시겠습니까?`}
                onClickHandler={deleteHandler}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                modalBackground={modalBackground}
            />
        </div>
    );
}

export default AdminSelectAllDicts;