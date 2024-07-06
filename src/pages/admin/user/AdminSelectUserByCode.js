import { useState, useRef } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import { PutAPI, DeleteAPI } from "../../../api/RestAPIs";

import SelectUserByCode from "../../../components/admin/user/SelectUserByCode";
import FetchErrorBoundary from "../../../components/admin/adminCommon/FetchErrorBoundary";

import AlertModal from "../../../components/admin/adminCommon/AlertModal";
import ConfirmModal from "../../../components/admin/adminCommon/ConfirmModal";

import styles from "../AdminPages.module.css";

function AdminSelectUserByCode() {

    const decodedToken = jwtDecode(window.localStorage.getItem("accessToken"));
    const logindUserCode = decodedToken.userCode;

    const [user, setUser] = useState();
    const [bool, setBool] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    const modalBackground = useRef();

    const { state } = useLocation();

    const navigate = useNavigate();

    const updateHandler = async () => {

        const address = '/admin/users';
        const object = {
            userCode: `${user.userCode}`,
            userAuth: `${user.userAuth}`
        }

        const response = await PutAPI(address, object);

        setBool(!bool);
        setModalOpen(false);

        navigate("/admin/userdetail", {
            state: { Location: response.headers.get('Location') }
        });
    };

    const deleteHandler = async () => {

        const address = `/admin/users/${user?.userCode}`;

        const response = await DeleteAPI(address);

        setBool(!bool);
        setModalOpen(false);
    };

    return (
        <div>
            <p className={styles.subTitle}>회원 관리</p>
            <div className={styles.mainOuter}>
                <div className={styles.mainBox}>
                    <div>
                        <p className={styles.subjectTitle}>회원 상세</p>
                        <div style={{ float: "right", }}>
                            <button
                                className={styles.cancelButton}
                                style={{ marginRight: "15px", }}
                                onClick={() => {
                                    navigate("/admin/users");
                                }}
                            >
                                돌아가기
                            </button>
                            <button
                                className={
                                    user?.userAuth === 'ADMIN' ? styles.cancelButton : styles.submitButton
                                }
                                style={{ marginRight: "10px", }}
                                onClick={() => setModalOpen(true)}
                            >
                                {
                                    user?.userAuth === 'ADMIN' ? '권한 박탈' : (
                                        user?.userAuth === 'USER' ? '권한 부여' : '계정 활성화'
                                    )
                                }
                            </button>
                        </div>
                        <div className={styles.productDetail}>
                            <FetchErrorBoundary height="560px">
                                <SelectUserByCode
                                    Location={state.Location}
                                    user={user}
                                    setUser={setUser}
                                    bool={bool}
                                />
                            </FetchErrorBoundary>
                        </div>
                    </div>
                </div>
            </div>
            {user?.userCode === logindUserCode &&
                <AlertModal
                    message='관리자는 스스로 권한을 박탈할 수 없습니다'
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    modalBackground={modalBackground}
                />
            }
            {user?.userCode != logindUserCode && user?.userAuth === 'ADMIN' &&
                <ConfirmModal
                    message={`${user.userCode}번 사용자(${user.userNick})의 관리자 권한을 박탈하시겠습니까?`}
                    onClickHandler={updateHandler}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    modalBackground={modalBackground}
                />
            }
            {user?.userAuth === 'USER' &&
                <ConfirmModal
                    message={`${user.userCode}번 사용자(${user.userNick})를(을) 관리자로 승급 시키시겠습니까?`}
                    onClickHandler={updateHandler}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    modalBackground={modalBackground}
                />
            }
            {user?.userAuth === 'SLEEP' &&
                <ConfirmModal
                    message={`휴면 해제부터 진행해야 합니다. ${user.userCode}번 사용자(${user.userNick})를(을) 휴면 해제하시겠습니까?`}
                    onClickHandler={deleteHandler}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    modalBackground={modalBackground}
                />
            }
        </div>
    );
}

export default AdminSelectUserByCode;