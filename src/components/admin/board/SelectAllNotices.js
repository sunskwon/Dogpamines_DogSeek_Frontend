import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { GetAPI, DeleteAPI } from "../../../api/RestAPIs"

import styles from "./AdminBoards.module.css";

function SelectAllNotices({ search, bool, setBool }) {

    const [notices, setNotices] = useState([]);

    const navigate = useNavigate();

    const call = async () => {

        const address = '/notice';

        const response = await GetAPI(address);

        const result = await response.notice;

        return result;
    };

    const searchProd = async () => {

        const address = `/notice/search?type=${search.type}&input=${search.input}`;

        const response = await GetAPI(address);

        const result = await response.notice;

        return result;
    };

    useEffect(() => {
        call().then(res => setNotices(res));
    }, []);

    useEffect(() => {
        searchProd().then(res => setNotices(res));
    }, [bool]);

    return (
        <>
            {notices.map(notice => (
                <tr
                    key={notice.postCode}
                >
                    <td
                        style={{ width: "100px", textAlign: "center", }}
                    >
                        {notice.postCode}
                    </td>
                    <td>
                        <div
                            style={{ width: "150px", height: "30px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", }}
                        >
                            {notice.userNick}
                        </div>
                    </td>
                    <td>
                        <div
                            style={{ width: "210px", height: "30px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", }}
                        >
                            {notice.postTitle}
                        </div>
                    </td>
                    <td>
                        <div
                            style={{ width: "150px", height: "30px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", }}
                        >
                            {notice.postDate}
                        </div>
                    </td>
                    <td>
                        <div
                            style={{ width: "100px", height: "30px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", }}
                        >
                            <span>{notice.postStatus}</span>
                        </div>
                    </td>
                    <td>
                        <button
                            className={styles.acceptButton}
                            onClick={() => {
                                navigate("/admin/boarddetail", { state: { Location: `/post/${notice.postCode}` } });
                            }}
                        >
                            상세
                        </button>
                    </td>
                    <td>
                        <button
                            className={
                                notice?.postStatus === 'Y' ? styles.cancelButton : styles.acceptButton
                            }
                            onClick={async () => {

                                const address = `/post/${notice.postCode}`;

                                await DeleteAPI(address);

                                setBool(!bool);
                            }}
                        >
                            {notice?.postStatus === 'Y' ? '게시 중단' : '게시'}
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
}

export default SelectAllNotices;