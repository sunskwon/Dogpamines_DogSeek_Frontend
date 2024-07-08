import { useState, useRef } from "react";

import { DeleteAPI } from "../../../api/RestAPIs";

import SelectAllUsers from "../../../components/admin/user/SelectAllUsers";
import FetchErrorBoundary from "../../../components/admin/adminCommon/FetchErrorBoundary";

import AlertModal from "../../../components/admin/adminCommon/AlertModal";
import ConfirmModal from "../../../components/admin/adminCommon/ConfirmModal";

import styles from "../AdminPages.module.css";

function AdminSelectAllUsers() {

    const [search, setSearch] = useState({
        type: 'userNick',
        input: ''
    });
    const [bool, setBool] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [user, setUser] = useState({});

    const modalBackground = useRef();

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

        const address = `/admin/users/${user?.userCode}`;

        const response = await DeleteAPI(address, search);

        setBool(!bool);
        setModalOpen(false);
    };

    return (
        <div>
            <p className={styles.subTitle}>회원 관리</p>
            <div className={styles.mainOuter}>
                <div className={styles.mainBox}>
                    <div>
                        <p className={styles.subjectTitle}>회원 목록</p>
                        <div style={{ float: "right", }}>
                            <select
                                name="type"
                                style={{ width: "100px", height: "34px", }}
                                onChange={valueChangeHandler}
                            >
                                <option value={'userNick'}>
                                    닉네임
                                </option>
                                <option value={'admin'}>
                                    관리자
                                </option>
                                <option value={'user'}>
                                    회원
                                </option>
                                <option value={'sleep'}>
                                    휴면
                                </option>
                            </select>
                            <input
                                id="typeInput"
                                name="input"
                                style={{ width: "150px", height: "30px", }}
                                onChange={valueChangeHandler}
                                onKeyDown={(e) => {
                                    if (e.keyCode === 13) {
                                        searchSubmitHandler();
                                    }
                                }}
                            />
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "10px", }}
                                onClick={searchSubmitHandler}
                            >
                                검색
                            </button>
                            <div style={{ width: "100px", height: "34px", marginRight: "15px", }}></div>
                        </div>
                    </div>
                    <div style={{ clear: "both", }}>
                        <div className={styles.productList}>
                            <FetchErrorBoundary height="560px">
                                <SelectAllUsers
                                    search={search}
                                    bool={bool}
                                    setModalOpen={setModalOpen}
                                    setUser={setUser}
                                />
                            </FetchErrorBoundary>
                        </div>
                    </div>
                </div>
            </div>
            {user?.userAuth === 'ADMIN' &&
                <AlertModal
                    message='관리자는 휴면 처리할 수 없습니다'
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    modalBackground={modalBackground}
                />
            }
            {user?.userAuth === 'USER' &&
                <ConfirmModal
                    message={`${user.userCode}번 사용자(${user.userNick})를(을) 휴면 처리 하시겠습니까?`}
                    onClickHandler={deleteHandler}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    modalBackground={modalBackground}
                />
            }
            {user?.userAuth === 'SLEEP' &&
                <ConfirmModal
                    message={`${user.userCode}번 사용자(${user.userNick})를(을) 활성화 처리 하시겠습니까?`}
                    onClickHandler={deleteHandler}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    modalBackground={modalBackground}
                />
            }
        </div>
    );
}

export default AdminSelectAllUsers;