import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { GetAPI } from "../../../api/RestAPIs"

import styles from "./AdminDict.module.css";

function SelectAllDicts({ search, bool, setModalOpen, setDict }) {

    const [dicts, setDicts] = useState(
        [
            {
                dogCode: 0
            }
        ]
    );

    const navigate = useNavigate();

    const call = async () => {

        const address = '/dict';

        const response = await GetAPI(address);

        const result = await response.dict;

        return result;
    };

    const searchDict = async () => {

        const address = `/dict/dictsearch?type=${search.type}&input=${search.input}`;

        const response = await GetAPI(address);

        const result = await response.dict;

        return result;
    };

    useEffect(() => {
        call().then(res => setDicts(res));
    }, []);

    useEffect(() => {
        searchDict().then(res => setDicts(res));
    }, [bool]);

    return (
        <>
            {dicts.length === 0 &&
                <div className={styles.errorBox}>
                    <div>
                        <img
                            src="/images/admin/Nothing Found.png"
                            alt="슬픈 돋보기 아이콘"
                        />
                        <p>적합한 견종이 없습니다</p>
                        <p>다시 시도해주세요</p>
                    </div>
                </div>
            }
            {dicts.length > 0 &&
                <table className={styles.productListTable}>
                    <tbody>
                        <tr>
                            <th>견종코드</th>
                            <th>견종명</th>
                            <th>견종크기</th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <td colSpan={5}>
                                <hr className={styles.tableLine} />
                            </td>
                        </tr>
                        {dicts.map(dict => (
                            <tr key={dict.dogCode}>
                                <td style={{ width: "200px" }}>
                                    {dict.dogCode}
                                </td>
                                <td style={{ width: "250px", }}>
                                    {dict.dogName}
                                </td>
                                <td style={{ width: "200px", }}>
                                    {dict.dogSize}
                                </td>
                                <td>
                                    <button
                                        className={styles.acceptButton}
                                        onClick={() => {
                                            navigate("/admin/dictdetail", {
                                                state: { Location: `/dict/get/${dict.dogCode}` }
                                            });
                                        }}
                                    >
                                        상세
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className={styles.cancelButton}
                                        onClick={() => {

                                            setModalOpen(true);
                                            setDict(dict);
                                        }}
                                    >
                                        삭제
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

export default SelectAllDicts;