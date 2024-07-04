import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { GetAPI } from "../../../api/RestAPIs"

import styles from "./AdminBoards.module.css";

function SelectAllNotices({ search, noticeBool, setModalOpen, setPost }) {

    const [notices, setNotices] = useState(
        [
            {
                postCode: 0
            }
        ]
    );

    const navigate = useNavigate();

    const call = async () => {

        const address = '/notice';

        const response = await GetAPI(address);

        const result = await response.notice;

        return result;
    };

    const searchNotice = async () => {

        const address = `/notice/search?type=${search.type}&input=${search.input}`;

        const response = await GetAPI(address);

        const result = await response.notice;

        return result;
    };

    useEffect(() => {
        call().then(res => setNotices(res));
    }, []);

    useEffect(() => {
        searchNotice().then(res => setNotices(res));
    }, [noticeBool]);

    return (
        <>
            {notices.length === 0 &&
                <div className={styles.errorBox}>
                    <div style={{ display: "flex", paddingTop: "30px", }}>
                        <div
                            style={{ display: "flex", alignItems: "center", }}
                        >
                            <img
                                src="/images/admin/NothingFound.png"
                                alt="슬픈 돋보기 아이콘"
                            />
                        </div>
                        <div>
                            <p>검색 결과가 없습니다</p>
                            <p>다시 시도해주세요</p>
                        </div>
                    </div>
                </div>
            }
            {notices.length > 0 &&
                <table className={styles.productListTable}>
                    <tbody>
                        <tr>
                            <th style={{ width: "80px", }}>게시물코드</th>
                            <th style={{ width: "150px", }}>작성자</th>
                            <th style={{ width: "240px", }}>제목</th>
                            <th style={{ width: "150px", }}>작성일</th>
                            <th style={{ width: "80px", }}>게시여부</th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <td colSpan={7}>
                                <hr className={styles.tableLine} />
                            </td>
                        </tr>
                        {notices.map(notice => (
                            <tr
                                key={notice.postCode}
                            >
                                <td>
                                    {notice.postCode}
                                </td>
                                <td>
                                    {notice.userNick}
                                </td>
                                <td>
                                    <div
                                        className={styles.ellipsisBox}
                                        style={{ width: "240px", }}
                                    >
                                        {notice.postTitle}
                                    </div>
                                </td>
                                <td>
                                    {notice.postDate}
                                </td>
                                <td>
                                    {notice.postStatus === 'Y' ? '게시중' : '게시 중단'}
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
                                        onClick={() => {

                                            setModalOpen(true)
                                            setPost(notice)
                                        }}
                                    >
                                        {notice?.postStatus === 'Y' ? '게시 중단' : '게시'}
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

export default SelectAllNotices;