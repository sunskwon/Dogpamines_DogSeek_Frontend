import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { GetAPI } from "../../../api/RestAPIs";

import Loading from "../adminCommon/Loading";

import styles from "./AdminChat.module.css";

function ChatList() {

    const [checkList, setCheckList] = useState([]);
    const [error, setError] = useState(null);
    const [boolLoading, setBoolLoading] = useState(false);

    const navigate = useNavigate();

    const wait = () => {

        return new Promise((resolve) => setTimeout(resolve, 3000));
    };

    const call = async () => {

        const address = '/chat/check';

        setBoolLoading(true);

        try {

            await wait();

            const response = await GetAPI(address);

            if (response.error) {

                setError(response.error);

                return [];
            }

            const result = await response.check;

            return result;
        } catch (error) {

            setError(error);

            return [];
        } finally {
            
            setBoolLoading(false);
        }
    };

    useEffect(() => {
        call().then(res => setCheckList(res));
    }, []);

    return boolLoading ? (<Loading />) : (
        checkList?.length > 0 ? (
            <>
                <div style={{ display: "flex", padding: "10px", }}>
                    {checkList?.map((check, index) => (
                        <div
                            key={index}
                            className={check.status ? styles.newIssue : styles.endIssue}
                            onClick={() => {
                                navigate('/admin/chat', {
                                    state: { 
                                        userCode: check.userCode,
                                        userNick: check.userNick
                                    }
                                });
                            }}
                        >
                            <div>
                                <img
                                    src="/images/admin/New.png"
                                    alt="new 아이콘"
                                    style={{ display: check.status ? "" : "none" }}
                                />
                            </div>
                            <div>
                                <p>{check.userNick}님의 문의</p>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        ) : (
            <>
                <div className={styles.errorBox}>
                    <div>
                        <img
                            src="/images/admin/UsedProduct.png"
                            alt="찌그러진 박스 아이콘"
                        />
                        <p>현재 1:1 문의 목록이 없습니다</p>
                    </div>
                </div>
            </>
        )
    );
};

export default ChatList;