import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { GetAPI } from "../../../api/RestAPIs"

import Loading from "../adminCommon/Loading";

import styles from "./AdminDict.module.css";

function SelectAllDicts({ search, bool, setModalOpen, setDict }) {

    const [dicts, setDicts] = useState([]);
    const [error, setError] = useState(null);
    const [boolLoading, setBoolLoading] = useState(false);

    const navigate = useNavigate();

    const call = async () => {

        const address = '/dict';

        setBoolLoading(true);

        try {

            const response = await GetAPI(address);

            if (response.error) {

                setError(response.error);
                setBoolLoading(false);

                return [];
            }

            const result = await response.dict;

            return result;
        } catch (error) {

            setError(error);
            setBoolLoading(false);

            return [];
        } finally {

            setBoolLoading(false);
        }
    };

    const searchDict = async () => {

        const address = `/dict/dictsearch?type=${search.type}&input=${search.input}`;

        setBoolLoading(true);

        try {

            const response = await GetAPI(address);

            if (response.error) {

                setError(error);
                setBoolLoading(false);

                return [];
            }

            const result = await response.dict;

            return result;
        } catch (error) {

            setError(error);
            setBoolLoading(false);

            return [];
        } finally {

            setBoolLoading(false);
        }
    };

    useEffect(() => {
        call().then(res => setDicts(res));
    }, []);

    useEffect(() => {
        searchDict().then(res => setDicts(res));
    }, [bool]);

    if (error) {
        throw error;
    }

    return boolLoading ? (<Loading />) : (
        dicts.length > 0 ? (
            <>
                <table className={styles.productListTable}>
                    <tbody>
                        <tr>
                            <th>견종 No.</th>
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
                                                state: { Location: `/admin/dict/${dict.dogCode}` }
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
            </>
        ) : (
            <>
                <div className={styles.errorBox}>
                    <div>
                        <img
                            src="/images/admin/NothingFound.png"
                            alt="슬픈 돋보기 아이콘"
                        />
                        <p>조건에 맞는 견종이 없습니다</p>
                        <p>다시 시도해주세요</p>
                    </div>
                </div>
            </>
        )
    )
};

export default SelectAllDicts;