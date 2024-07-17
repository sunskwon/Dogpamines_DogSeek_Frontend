import { useState, useEffect } from "react";

import { GetAPI } from "../../../api/RestAPIs";

import Loading from "../adminCommon/Loading";

import styles from "./AdminUsers.module.css"

function SelectUserByCode({ Location, user, setUser, bool }) {

    const [dogs, setDogs] = useState([]);
    const [boards, setBoards] = useState([]);
    const [error, setError] = useState(null);
    const [boolLoading, setBoolLoading] = useState(false);

    const call = async () => {

        setBoolLoading(true);

        try {

            const response = await GetAPI(Location);

            if (response.error) {

                setError(error);

                return null;
            }

            const result = await response.user;

            return result;
        } catch (error) {

            setError(error);

            return null;
        } finally {

            setBoolLoading(false);
        }
    };

    useEffect(() => {
        call().then((res) => {

            setBoolLoading(true);

            try {

                const user = res?.user;
                const dogNames = res?.dogs;
                const boards = res?.boardList;

                var dogList = new Array;
                var boardList = new Array;

                if (dogNames?.length > 0) {

                    for (var dog of dogNames) {

                        dogList = [...dogList, res[dog]];
                    }
                }

                if (boards?.length > 0) {

                    for (var board of boards) {

                        const newBoard = {
                            ...board,
                            countReport: res[board.postCode].length
                        }

                        boardList = [...boardList, newBoard];
                    }
                }

                setUser(user);
                setDogs(dogList);
                setBoards(boardList);
            } catch (error) {

                setError(error);
                setUser(null);
                setDogs([]);
                setBoards([]);
            } finally {

                setBoolLoading(false);
            }
        });
    }, []);

    if (error) {
        throw error;
    };

    return boolLoading ? (<Loading />) : (
        user ? (
            <>
                <div className={styles.detailBox}>
                    <div style={{ width: "680px", }}>
                        <div style={{ width: "680px", }}>
                            <div>
                                <div className={styles.detailBoxMid}>
                                    <p>닉네임</p>
                                    <div className={styles.spanBox}>
                                        <span>{user?.userNick}</span>
                                    </div>
                                </div>
                                <div className={styles.detailBoxMid}>
                                    <p>아이디</p>
                                    <div
                                        className={styles.spanBox}
                                        style={{ width: "290px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", }}
                                    >
                                        <span>{user?.userId}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ clear: "both", }}>
                                <div className={styles.detailBoxShort}>
                                    <p>권한</p>
                                    <div className={styles.spanBox}>
                                        <span>
                                            {user?.userAuth === 'ADMIN' ? '관리자' : user?.userAuth === 'USER' ? '회원' : user?.userAuth === 'SLEEP' ? '휴면회원' : user?.userAuth === 'LEAVE' ? '탈퇴회원' : '알 수 없음'}
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.detailBoxShort}>
                                    <p>연락처</p>
                                    <div className={styles.spanBox}>
                                        <span>{user?.userPhone}</span>
                                    </div>
                                </div>
                                <div className={styles.detailBoxShort}>
                                    <p>가입일</p>                                    <div className={styles.spanBox}>
                                        <span>{user?.userSignup}</span>
                                    </div>
                                </div>
                                <div className={styles.detailBoxShort}>
                                    <p>최근 접속일</p>
                                    <div className={styles.spanBox}>
                                        <span>{user?.userLatest}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.detailBoxFull}>
                                <div className={styles.itemList}>
                                    {dogs.length == 0 &&
                                        <div
                                            className={styles.emptyList}
                                            style={{ height: "120px", }}
                                        >
                                            <img
                                                src="/images/admin/Dog.png"
                                                alt="강아지 뒷모습"
                                                style={{ width: "100px", height: "100px", }}
                                            />
                                            <p>연결된 강아지 정보가 없습니다</p>
                                        </div>
                                    }
                                    {dogs.length > 0 &&
                                        <table
                                            className={styles.itemListTable}
                                            style={{ height: "80px", }}
                                        >
                                            <tbody>
                                                <tr>
                                                    <th style={{ width: "120px", }}>이름</th>
                                                    <th style={{ width: "120px", }}>견종</th>
                                                    <th style={{ width: "120px", }}>나이</th>
                                                    <th style={{ width: "120px", }}>크기</th>
                                                    <th style={{ width: "200px", }}>마지막 수정일</th>
                                                </tr>
                                                <tr>
                                                    <td colSpan={5}>
                                                        <hr />
                                                    </td>
                                                </tr>
                                                {dogs.map((dog, index) => (
                                                    <tr key={index}>
                                                        <td>{dog?.curationName}</td>
                                                        <td>{dog?.curationBreed}</td>
                                                        <td>{dog?.curationAge}</td>
                                                        <td>{dog?.curationSize}</td>
                                                        <td>{dog?.curationDate}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    }
                                </div>
                                <div className={styles.itemList}>
                                    {boards.length == 0 &&
                                        <div
                                            className={styles.emptyList}
                                            style={{ height: "240px", }}
                                        >
                                            <img
                                                src="/images/admin/UsedProduct.png"
                                                alt="빈 박스"
                                                style={{ width: "100px", height: "100px", }}
                                            />
                                            <p>작성된 게시물이 없습니다</p>
                                        </div>
                                    }
                                    {boards.length > 0 &&
                                        <table
                                            className={styles.itemListTable}
                                            style={{ height: "240px", }}
                                        >
                                            <tbody>
                                                <tr>
                                                    <th style={{ width: "100px", }}>게시물코드</th>
                                                    <th style={{ width: "200px", }}>내용</th>
                                                    <th style={{ width: "180px", }}>작성일</th>
                                                    <th style={{ width: "100px", }}>게시 여부</th>
                                                    <th style={{ width: "100px", }}>신고</th>
                                                </tr>
                                                <tr>
                                                    <td colSpan={5}>
                                                        <hr />
                                                    </td>
                                                </tr>
                                                {boards.map((board, index) => (
                                                    <tr key={index}>
                                                        <td>{board?.postCode}</td>
                                                        <td>
                                                            <div
                                                                className={styles.ellipsisBox}
                                                                style={{ width: "200px" }}
                                                            >
                                                                {board?.postContext}
                                                            </div>
                                                        </td>
                                                        <td>{board?.postDate}</td>
                                                        <td>{board?.postStatus}</td>
                                                        <td
                                                            style={{
                                                                color:
                                                                    (board?.postStatus === 'Y' && board?.countReport >= 1 ? "red" : "")
                                                            }}
                                                        >
                                                            {board?.countReport}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    }
                                </div>
                            </div>
                        </div >
                    </div >
                </div >
            </>
        ) : (
            <>
                <div className={styles.errorBox}>
                    <div>
                        <img
                            src="/images/admin/CloseWindow.png"
                            alt="취소 아이콘"
                        />
                        <p>선택한 사용자 정보가 없습니다</p>
                        <p>다시 시도해주세요</p>
                    </div>
                </div>
            </>
        )
    )
}

export default SelectUserByCode;