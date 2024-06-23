import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { GetAPI, DeleteAPI } from "../../../api/RestAPIs"

import styles from "./AdminDict.module.css";

function SelectAllDicts({ search, bool, setBool }) {

    const [dicts, setDicts] = useState([]);

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
            {dicts.map(dict => (
                <tr
                    key={dict.dogCode}
                >
                    <td
                        style={{ width: "120px", textAlign: "center", }}
                    >
                        {dict.dogCode}
                    </td>
                    <td>
                        <div
                            style={{ width: "370px", textAlign: "center", }}
                        >
                            {dict.dogName}
                        </div>
                    </td>
                    <td>
                        <div
                            style={{ width: "240px", textAlign: "center", }}
                        >
                            {dict.dogSize}
                        </div>
                    </td>
                    <td>
                        <button
                            className={styles.acceptButton}
                            onClick={() => {
                                navigate("/admin/dictdetail", {
                                    state: { Location: `/dict/${dict.dogCode}` }
                                });
                            }}
                        >
                            상세
                        </button>
                    </td>
                    <td>
                        <button
                            className={styles.cancelButton}
                            onClick={async () => {

                                const address = `/dict/${dict.dogCode}`;

                                const response = await DeleteAPI(address);

                                setBool(!bool);
                            }}
                        >
                            삭제
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
}

export default SelectAllDicts;