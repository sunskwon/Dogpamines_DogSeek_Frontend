import { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { DeleteAPI } from "../../../api/RestAPIs";

import SelectAllNotices from "../../../components/admin/board/SelectAllNotices";
import SelectAllBoards from "../../../components/admin/board/SelectAllBoards";
import FetchErrorBoundary from "../../../components/admin/adminCommon/FetchErrorBoundary";

import ConfirmModal from "../../../components/admin/adminCommon/ConfirmModal";
import BoardModal from "../../../components/admin/board/BoardModal";
import ReportsModal from "../../../components/admin/board/ReportsModal";

import styles from "../AdminPages.module.css";

function AdminSelectAllBoards() {

    const noticeSearchInput = document.getElementById('noticeSearchInput');
    const boardSearchInput = document.getElementById('boardSearchInput');

    const [searchNotice, setSearchNotice] = useState({
        type: 'postTitle',
        input: ''
    });

    const [searchBoard, setSearchBoard] = useState({
        type: 'postContext',
        input: ''
    });

    const [post, setPost] = useState({});
    const [board, setBoard] = useState({});
    const [reports, setReports] = useState([]);

    const [noticeBool, setNoticeBool] = useState(false);
    const [boardBool, setBoardBool] = useState(false);

    const [boardModalOpen, setBoardModalOpen] = useState(false);
    const [reportsModalOpen, setReportsModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const modalBackground = useRef();

    const navigate = useNavigate();

    const noticeValueChangeHandler = e => {
        setSearchNotice({
            ...searchNotice,
            [e.target.name]: e.target.value
        });
    };

    const boardValueChangeHandler = e => {
        setSearchBoard({
            ...searchBoard,
            [e.target.name]: e.target.value
        })
    }

    const deleteHandler = async () => {

        const address = `/post/${post.postCode}`;

        await DeleteAPI(address);

        if (post.postCategory === '공지') {
            setNoticeBool(!noticeBool);
        } else {
            setBoardBool(!boardBool);
        }
        setModalOpen(false);
    };

    return (
        <div>
            <p className={styles.subTitle}>게시판 관리</p>
            <div className={styles.mainOuter}>
                <div className={styles.mainBox}>
                    <div>
                        <p className={styles.subjectTitle}>공지사항 목록</p>
                        <div style={{ float: "right", }}>
                            <select
                                name="type"
                                style={{ width: "100px", height: "34px", }}
                                onChange={noticeValueChangeHandler}
                            >
                                <option value={'postTitle'}>
                                    제목
                                </option>
                                <option value={'postContext'}>
                                    내용
                                </option>
                                <option value={'userNick'}>
                                    작성자
                                </option>
                            </select>
                            <input
                                id="noticeSearchInput"
                                name="input"
                                style={{ width: "150px", height: "30px", }}
                                onChange={noticeValueChangeHandler}
                                onKeyDown={(e) => {
                                    if (e.keyCode === 13) {
                                        setNoticeBool(!noticeBool);
                                        noticeSearchInput.value = '';
                                    }
                                }}
                            />
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "10px", }}
                                onClick={() => {
                                    setNoticeBool(!noticeBool);
                                    noticeSearchInput.value = '';
                                }}
                            >
                                검색
                            </button>
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "15px", }}
                                onClick={() => {
                                    navigate("/admin/newboard");
                                }}
                            >
                                새 공지 등록
                            </button>
                        </div>
                    </div>
                    <div style={{ clear: "both", }}>
                        <div
                            className={styles.productList}
                            style={{ height: "220px", }}
                        >
                            <FetchErrorBoundary height="200px">
                                <SelectAllNotices
                                    search={searchNotice}
                                    noticeBool={noticeBool}
                                    setModalOpen={setModalOpen}
                                    setPost={setPost}
                                />
                            </FetchErrorBoundary>
                        </div>
                    </div>
                    <div style={{ paddingTop: "20px", }}>
                        <p className={styles.subjectTitle}>게시물 목록</p>
                        <div style={{ float: "right", }}>
                            <select
                                name="type"
                                style={{ width: "100px", height: "34px", }}
                                onChange={boardValueChangeHandler}
                            >
                                <option value={'postContext'}>
                                    내용
                                </option>
                                <option value={'userNick'}>
                                    작성자
                                </option>
                            </select>
                            <input
                                id="boardSearchInput"
                                name="input"
                                style={{ width: "150px", height: "30px", }}
                                onChange={boardValueChangeHandler}
                                onKeyDown={(e) => {
                                    if (e.keyCode === 13) {
                                        setBoardBool(!boardBool);
                                        boardSearchInput.value = '';
                                    }
                                }}
                            />
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "10px", }}
                                onClick={() => {
                                    setBoardBool(!boardBool);
                                    boardSearchInput.value = '';
                                }}
                            >
                                검색
                            </button>
                            <div style={{ float: "right", width: "100px", height: "30px", marginRight: "15px", }}></div>
                        </div>
                    </div>
                    <div
                        className={styles.productList}
                        style={{ height: "300px", }}
                    >
                        <FetchErrorBoundary height="300px">
                            <SelectAllBoards
                                search={searchBoard}
                                boardBool={boardBool}
                                setModalOpen={setModalOpen}
                                setBoardModalOpen={setBoardModalOpen}
                                setReportsModalOpen={setReportsModalOpen}
                                setPost={setPost}
                                setBoard={setBoard}
                                setReports={setReports}
                            />
                        </FetchErrorBoundary>
                    </div>
                </div>
            </div>
            <ConfirmModal
                message={
                    (post?.postStatus === 'Y') ?
                        `${post?.postCode}번 ${post?.postCategory}글을 게시 중단 하겠습니까?`
                        : `${post?.postCode}번 ${post?.postCategory}글을 게시 하겠습니까?`}
                onClickHandler={deleteHandler}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                modalBackground={modalBackground}
            />
            <BoardModal
                board={board}
                boardModalOpen={boardModalOpen}
                setBoardModalOpen={setBoardModalOpen}
                modalBackground={modalBackground}
            />
            <ReportsModal
                reports={reports}
                reportsModalOpen={reportsModalOpen}
                setReportsModalOpen={setReportsModalOpen}
                modalBackground={modalBackground}
            />
        </div>
    );
}

export default AdminSelectAllBoards;