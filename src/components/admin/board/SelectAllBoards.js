import { useState, useEffect } from "react";

import { GetAPI, DeleteAPI } from "../../../api/RestAPIs"

import styles from "./AdminBoards.module.css";

function SelectAllBoards({ search, bool, setBool, setBoardModalOpen, setCommentModalOpen, setBoard, setComments }) {

    const [boards, setBoards] = useState([]);

    const call = async () => {

        const address = '/board';

        const response = await GetAPI(address);

        return response;
    };

    const searchProd = async () => {

        const address = `/board/search?type=${search.type}&input=${search.input}`;

        const response = await GetAPI(address);

        return response;
    };

    useEffect(() => {
        call().then((res) => {

            const boardList = res.boardList;
            const commentList = res.commentList;
            const boardReportList = res.boardReportList;

            if (boardList?.length > 0) {

                for (var board of boardList) {

                    board.comments = [commentList[board.postCode]];
                    board.countReport = boardReportList[board.postCode].length;
                }
            }

            setBoards(boardList);
        });
    }, []);

    useEffect(() => {
        searchProd().then((res) => {

            const boardList = res.boardList;
            const commentList = res.commentList;
            const boardReportList = res.boardReportList;

            if (boardList?.length > 0) {

                for (var board of boardList) {

                    board.comments = [commentList[board.postCode]];
                    board.countReport = boardReportList[board.postCode].length;
                }
            }

            setBoards(boardList);
        });
    }, [bool]);

    return (
        <>
            {boards.map(board => (
                <tr
                    key={board.postCode}
                >
                    <td
                        style={{ width: "100px", }}
                    >
                        {board.postCode}
                    </td>
                    <td>
                        <div
                            style={{ width: "100px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", }}
                        >
                            {board.userNick}
                        </div>
                    </td>
                    <td>
                        <div
                            style={{ width: "110px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", }}
                        >
                            {board.postTitle}
                        </div>
                    </td>
                    <td>
                        <div
                            style={{ width: "100px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", }}
                        >
                            {board.postDate}
                        </div>
                    </td>
                    <td>
                        <div
                            style={{ width: "100px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", }}
                        >
                            <span>{board.postStatus}</span>
                        </div>
                    </td>
                    <td>
                        <button
                            className={styles.acceptButton}
                            onClick={() => {
                                setBoard(board);
                                setBoardModalOpen(true);
                            }}
                        >
                            상세
                        </button>
                    </td>
                    <td>
                        <button
                            className={styles.acceptButton}
                            onClick={async () => {
                                setComments(board.comments);
                                setCommentModalOpen(true);
                            }}
                        >
                            댓글
                        </button>
                    </td>
                    <td>
                        <div
                            style={{ width: "100px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", }}
                        >
                            {board.countReport}
                        </div>
                    </td>
                    <td>
                        <button
                            className={
                                board?.postStatus === 'Y' ? styles.cancelButton : styles.acceptButton
                            }
                            onClick={async () => {

                                const address = `/post/${board.postCode}`;

                                await DeleteAPI(address);

                                setBool(!bool);
                            }}
                        >
                            {board?.postStatus === 'Y' ? '게시 중단' : '게시'}
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
}

export default SelectAllBoards;