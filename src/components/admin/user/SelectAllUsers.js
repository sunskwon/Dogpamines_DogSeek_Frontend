import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { PostAPI, DeleteAPI } from "../../../api/RestAPIs"

import styles from "./AdminUsers.module.css";

function SelectAllUsers({ search, bool, setBool }) {

    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    const call = async () => {

        const address = '/admin/users';

        const welcomeSearch = {
            type: 'userName',
            input: ''
        }

        const response = await PostAPI(address, welcomeSearch)
            .then(res => res.json());

        const result = await response.users;

        return result;
    };

    const searchUser = async () => {

        const address = '/admin/users';

        const response = await PostAPI(address, search)
            .then(res => res.json());

        const result = await response.users;

        return result;
    };

    useEffect(() => {
        call().then(res => setUsers(res));
    }, []);

    useEffect(() => {
        searchUser().then(res => setUsers(res));
    }, [bool]);

    return (
        <>
            {users?.map(user => (
                <tr
                    key={user?.userCode}
                >
                    <td
                        style={{ width: "80px", textAlign: "center", }}
                    >
                        {user?.userCode}
                    </td>
                    <td>
                        <div
                            style={{ width: "270px", textAlign: "center", }}
                        >
                            {user?.userNick}
                        </div>
                    </td>
                    <td>
                        <div
                            style={{ width: "120px", textAlign: "center", }}
                        >
                            {user?.userAuth === 'ADMIN' ? '관리자' : (user.userAuth === 'USER' ? '회원' : '휴면회원')}
                        </div>
                    </td>
                    <td>
                        <div
                            style={{ width: "120px", textAlign: "center", }}
                        >
                            {user?.userSignup}
                        </div>
                    </td>
                    <td>
                        <div
                            style={{ width: "120px", textAlign: "center", }}
                        >
                            {user?.userLatest}
                        </div>
                    </td>
                    <td>
                        <button
                            className={styles.acceptButton}
                            onClick={() => {
                                navigate("/admin/userdetail", {
                                    state: { Location: `/users/${user?.userCode}` }
                                });
                            }}
                        >
                            상세
                        </button>
                    </td>
                    <td>
                        <button
                            className={styles.cancelButton}
                            onClick={async () => {

                                const address = `/admin/users/${user?.userCode}`;

                                if (user?.userAuth === 'ADMIN') {
                                    alert('관리자는 휴면 처리할 수 없습니다');
                                } else {
                                    const response = await DeleteAPI(address, search);
                                }

                                setBool(!bool);
                            }}
                        >
                            휴면
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
}

export default SelectAllUsers;