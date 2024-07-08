import { useState, useEffect } from "react";

import { GetAPI } from "../../../api/RestAPIs"

import Loading from "../adminCommon/Loading";

import styles from "./AdminBoards.module.css";

function SelectAllBoards({ search, boardBool, setModalOpen, setBoardModalOpen, setReportsModalOpen, setPost, setBoard, setReports }) {

    const [boards, setBoards] = useState([]);
    const [error, setError] = useState(null);
    const [boolLoading, setBoolLoading] = useState(false);

    const call = async () => {

        setBoolLoading(true);

        try {

            const address = '/board';

            const response = await GetAPI(address);

            if (response.error) {

                setError(response.error);

                return [];
            }

            const result = await response.board;

            return result;
        } catch (error) {

            setError(error);

            return [];
        } finally {

            setBoolLoading(false);
        }
    };

    const searchProd = async () => {

        setBoolLoading(true);

        try {

            const address = `/board/search?type=${search.type}&input=${search.input}`;

            const response = await GetAPI(address);

            if (response.error) {

                setError(error);

                return [];
            }

            const result = await response.board;

            return result;
        } catch (error) {

            setError(error);

            return [];
        } finally {

            setBoolLoading(false);
        }
    };

    useEffect(() => {
        call().then((res) => {

            const boardList = res.boardList;

            if (boardList?.length > 0) {

                for (var board of boardList) {

                    board.countReport = res[board?.postCode]?.length;
                    board.reports = res[board?.postCode];
                }
            }

            setBoards(boardList);
        });
    }, []);

    useEffect(() => {
        searchProd().then((res) => {

            const boardList = res.boardList;

            if (boardList?.length > 0) {

                for (var board of boardList) {

                    board.countReport = res[board?.postCode]?.length;
                    board.reports = res[board?.postCode];
                }
            }

            setBoards(boardList);
        });
    }, [boardBool]);

    if (error) {
        throw error;
    }

    return boolLoading ? (<Loading height="300px" />) : (
        boards?.length > 0 ? (
            <>
                <table className={styles.productListTable}>
                    <tbody>
                        <tr>
                            <th style={{ width: "80px", }}>게시물 No.</th>
                            <th style={{ width: "150px", }}>작성자</th>
                            <th style={{ width: "150px", }}></th>
                            <th style={{ width: "150px", }}>작성일</th>
                            <th style={{ width: "80px", }}>게시여부</th>
                            <th style={{ width: "80px", }}>신고 횟수</th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <td colSpan={8}>
                                <hr className={styles.tableLine} />
                            </td>
                        </tr>
                        {boards.map(board => (
                            <tr key={board.postCode}>
                                <td>
                                    {board.postCode}
                                </td>
                                <td>
                                    {board.userNick}
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
                                    {board.postDate}
                                </td>
                                <td>
                                    {board.postStatus === 'Y' ? '게시중' : '게시 중단'}
                                </td>
                                <td>
                                    {board.countReport ? board.countReport : 0}
                                </td>
                                <td>
                                    <button
                                        className={
                                            board?.postStatus === 'Y' && board?.countReport > 0 ?
                                                styles.alertButton :
                                                (board?.postStatus === 'N' && board?.countReport > 0 ?
                                                    styles.warningButton :
                                                    styles.cancelButton
                                                )
                                        }
                                        onClick={async () => {
                                            if (board?.countReport > 0) {

                                                setReports(board.reports);
                                                setReportsModalOpen(true);
                                            }
                                        }}
                                    >
                                        신고 확인
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className={
                                            board?.postStatus === 'Y' && board?.countReport > 0 ?
                                                styles.alertButton :
                                                (board?.postStatus === 'N' && board?.countReport > 0 ?
                                                    styles.warningButton :
                                                    (board?.postStatus === 'Y' ?
                                                        styles.cancelButton : styles.acceptButton
                                                    )
                                                )
                                        }
                                        onClick={() => {

                                            setModalOpen(true)
                                            setPost(board)
                                        }}
                                    >
                                        {board?.postStatus === 'Y' ? '게시 중단' : '게시'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        ) : (
            <>
                <div className={styles.errorBox}>
                    <div style={{ display: "flex", paddingTop: "60px", }}>
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
            </>
        )
    );
}

export default SelectAllBoards;