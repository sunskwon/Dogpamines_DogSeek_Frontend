import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { PostAPI } from "../../../api/RestAPIs"

import styles from "./AdminUsers.module.css";

function SelectAllUsers({ search, bool, setModalOpen, setUser }) {

    const [users, setUsers] = useState(
        [
            {
                userCode: 0
            }
        ]
    );

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
            {users.length === 0 &&
                <div className={styles.errorBox}>
                    <div>
                        <img
                            src="/images/admin/Nothing Found.png"
                            alt="슬픈 돋보기 아이콘"
                        />
                        <p>적합한 사료가 없습니다</p>
                        <p>다시 시도해주세요</p>
                    </div>
                </div>
            }
            {users.length > 0 &&
                <table className={styles.productListTable}>
                    <tbody>
                        <tr>
                            <th>회원코드</th>
                            <th>닉네임</th>
                            <th>권한</th>
                            <th>가입일</th>
                            <th>최근 접속일</th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <td colSpan={7}>
                                <hr className={styles.tableLine} />
                            </td>
                        </tr>
                        {users?.map(user => (
                            <tr
                                key={user?.userCode}
                            >
                                <td style={{ width: "80px", }}>
                                    {user.userCode}
                                </td>
                                <td style={{ width: "250px", }}>
                                    {user?.userNick}
                                </td>
                                <td style={{ width: "120px", }}>
                                    {user?.userAuth === 'ADMIN' ? '관리자' : (user.userAuth === 'USER' ? '회원' : '휴면회원')}
                                </td>
                                <td style={{ width: "120px", }}>
                                    {user?.userSignup}
                                </td>
                                <td style={{ width: "120px", }}>
                                    {user?.userLatest}
                                </td>
                                <td>
                                    <button
                                        className={styles.acceptButton}
                                        onClick={() => {
                                            navigate("/admin/userdetail", {
                                                state: { Location: `/admin/users/${user?.userCode}` }
                                            });
                                        }}
                                    >
                                        상세
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className={
                                            user.userAuth === 'SLEEP' ? styles.acceptButton : styles.cancelButton
                                        }
                                        onClick={() => {

                                            setModalOpen(true);
                                            setUser(user);
                                        }}
                                    >
                                        {user.userAuth === 'SLEEP' ? '활성화' : '휴면'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </>
    );
}

export default SelectAllUsers;