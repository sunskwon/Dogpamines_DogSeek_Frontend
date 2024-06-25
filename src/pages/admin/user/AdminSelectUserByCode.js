import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { PutAPI } from "../../../api/RestAPIs";


import SelectUserByCode from "../../../components/admin/user/SelectUserByCode";

import styles from "../AdminPages.module.css";

function AdminSelectUserByCode() {


    const [user, setUser] = useState();
    const [bool, setBool] = useState(true);

    const { state } = useLocation();

    const navigate = useNavigate();


    const updateHandler = async () => {

        if (user?.userAuth === 'ADMIN') {
            alert("관리자 계정입니다.");
        } else if (user?.userAuth === 'USER') {

            const address = '/admin/users';
            const object = {
                userCode: `${user.userCode}`
            }

            const response = await PutAPI(address, object);

            setBool(!bool);

            navigate("/admin/userdetail", {
                state: { Location: response.headers.get('Location') }
            });
        } else {
            alert("휴면 계정은 관리자 승급이 불가능합니다.");
        }
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
                                className={styles.submitButton}
                                style={{ marginRight: "10px", }}
                                onClick={updateHandler}
                            >
                                관리자 승급
                            </button>
                            <button
                                className={styles.cancelButton}
                                style={{ marginRight: "15px", }}
                                onClick={() => {
                                    navigate("/admin/users");
                                }}
                            >
                                돌아가기
                            </button>
                        </div>
                        <div className={styles.productDetail}>
                            <SelectUserByCode
                                Location={state.Location}
                                user={user}
                                setUser={setUser}
                                bool={bool}
                                setBool={setBool}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSelectUserByCode;