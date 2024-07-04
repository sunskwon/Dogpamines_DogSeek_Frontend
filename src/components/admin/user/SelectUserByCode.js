import { useState, useEffect } from "react";

import { GetAPI } from "../../../api/RestAPIs";

import styles from "./AdminUsers.module.css"

function SelectUserByCode({ Location, user, setUser, bool, }) {

    const [dogs, setDogs] = useState(
        [
            {
                curationCode: 0
            }
        ]
    );
    const [boards, setBoards] = useState([]);

    const call = async () => {

        const response = await GetAPI(Location);

        const result = await response.user;

        return result;
    };

    useEffect(() => {
        call().then((res) => {

            const user = res.user;
            const dogNames = res.dogs;
            // const boardList = res.boardList;
            // const countList = res.countList;

            var dogList = new Array;

            if (dogNames?.length > 0) {

                for (var dog of dogNames) {

                    dogList = [...dogList, res[dog]];
                }
            }

            // if (boardList?.length > 0) {

            //     for (var board of boardList) {

            //         board.countComment = countList[board.postCode];
            //     }
            // }

            setUser(user);
            setDogs(dogList);
            // setBoards(boardList);
        });
    }, []);

    useEffect(() => {
        call().then((res) => setUser(res.user));
    }, [bool]);

    return (
        <div className={styles.detailBox}>
            <div style={{ width: "680px", }}>
                <div style={{ width: "680px", }}>
                    <div>
                        <div className={styles.detailBoxShort}>
                            <p>회원코드</p>
                            <div className={styles.spanBox}>
                                <span>{user?.userCode}</span>
                            </div>
                        </div>
                        <div className={styles.detailBoxShort}>
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
                                    {user?.userAuth === 'ADMIN' ? '관리자' : (user?.userAuth === 'USER' ? '회원' : '휴면회원')}
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
                            {boards.length > 0 &&
                                <table
                                    className={styles.itemListTable}
                                    style={{ height: "240px", }}
                                >
                                    <tbody>
                                        <tr>
                                            <th style={{ width: "120px", }}>게시물코드</th>
                                            <th style={{ width: "200px", }}>제목</th>
                                            <th style={{ width: "120px", }}>작성일</th>
                                            <th style={{ width: "120px", }}>게시 여부</th>
                                            <th style={{ width: "120px", }}>댓글 갯수</th>
                                        </tr>
                                        <tr>
                                            <td colSpan={5}>
                                                <hr />
                                            </td>
                                        </tr>
                                        {/* {boards.map((board, index) => (
                                        <tr key={index}>
                                            <td>{board?.postCode}</td>
                                            <td>{board?.postTitle}</td>
                                            <td>{board?.postDate}</td>
                                            <td>{board?.postStatus}</td>
                                            <td>{board?.countComment}</td>
                                        </tr>
                                    ))} */}
                                    </tbody>
                                </table>
                            }
                        </div>
                    </div>
                </div >
            </div >
        </div >
    );
}

export default SelectUserByCode;