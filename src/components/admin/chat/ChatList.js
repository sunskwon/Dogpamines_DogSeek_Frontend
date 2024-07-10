import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { GetAPI } from "../../../api/RestAPIs";

import styles from "./AdminChat.module.css";

function ChatList() {

    const [checkList, setCheckList] = useState([]);

    const navigate = useNavigate();

    const call = async () => {

        const address = '/chat/check';

        const response = await GetAPI(address);

        const result = await response.check;

        return result;
    };

    useEffect(() => {
        call().then(res => setCheckList(res));
    }, []);

    return (
        <>
            {checkList?.map((check, index) => (
                <div 
                key={index}
                onClick={() => {
                    navigate('/admin/chat', {
                        state: {userId: check.userCode}
                    });
                }}
                >
                    <div>
                        <p>{check.userNick}님의 문의</p>
                    </div>
                    <div>
                        <p>{check.status === true? '새 메세지' : ''}</p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ChatList;