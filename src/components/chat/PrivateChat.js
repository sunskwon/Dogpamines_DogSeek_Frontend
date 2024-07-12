import React, { useState, useEffect, useRef } from 'react';

import { GetAPI, PostAPI } from "../../api/RestAPIs";

import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

import { jwtDecode } from 'jwt-decode';

import Loading from '../admin/adminCommon/Loading';

import ModalChatMessage from './ModalChatMessage';

import styles from "./UserChat.module.css";

const PrivateChat = ({ code, nick }) => {

    const [userCode, setUserCode] = useState();
    const [userNick, setUserNick] = useState();

    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");

    const [boolLoading, setBoolLoading] = useState(false);

    const messageEnd = useRef();

    const baseUrl = process.env.REACT_APP_SPRING_SERVER;

    const wait = () => {

        return new Promise((resolve) => setTimeout(resolve, 3000));
    };

    const call = async () => {

        const address = `/chat/prev?roomId=/topic/room/${userCode}`;

        setBoolLoading(true);

        try {

            await wait();

            const response = await GetAPI(address);

            const result = await response.prevs;

            if (result?.length === 0) {
                
                const infoMessage = {
                    roomId: `/topic/room/${userCode}`,
                    userCode: userCode,
                    userNick: userNick,
                    type: 'JOIN',
                    message: `1:1 문의는 다음날 자정까지 저장됩니다`,
                    date: new Date().toLocaleString()
                };

                return [infoMessage];
            }
            return result;
        } catch (error) {

        } finally {

            setBoolLoading(false);
        }
    };

    useEffect(() => {

        setUserCode(code);
        setUserNick(nick);
    }, [code, nick]);

    useEffect(() => {

        call().then(res => setMessages(res));

        const socket = new SockJS(`${baseUrl}/chat`);
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: (frame) => {
                console.log('Connected: ' + frame);
                client.subscribe(`/topic/room/${userCode}`, message => {
                    const newMessage = JSON.parse(message.body);
                    setMessages(prevMessages => [...prevMessages, newMessage]);
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });

        client.activate();
        setStompClient(client);

        const address = '/chat/comeandgo';

        const welcomeMessage = {
            roomId: `/topic/room/${userCode}`,
            userCode: userCode,
            userNick: userNick,
            type: 'JOIN',
            message: `${userNick}님이 접속했습니다`,
            date: new Date().toLocaleString()
        };

        PostAPI(address, welcomeMessage);


        return () => {

            const address = '/chat/comeandgo';

            const leaveMessage = {
                roomId: `/topic/room/${userCode}`,
                userCode: userCode,
                userNick: userNick,
                type: 'LEAVE',
                message: `${userNick}님이 떠났습니다`,
                date: new Date().toLocaleString()
            };

            PostAPI(address, leaveMessage);

            client.deactivate();
        };
    }, [userCode, userNick]);

    useEffect(() => {
        if (messageEnd.current) {
            messageEnd.current.scrollIntoView({ behavior: "smooth", });
        }
    }, [messages]);

    const sendMessage = (type, content) => {
        if (stompClient && stompClient.connected) {
            const chatMessage = {
                roomId: `/topic/room/${userCode}`,
                userCode: userCode,
                userNick: userNick,
                type: type,
                message: content,
                date: new Date().toLocaleString()
            };
            stompClient.publish({
                destination: `/app/chat.sendMessage/room/${userCode}`,
                body: JSON.stringify(chatMessage),
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputMessage.trim() !== "") {
            sendMessage('CHAT', inputMessage);
            setInputMessage("");
        }
    };

    return boolLoading ? (<Loading height="500px" />) : (
        stompClient && stompClient.connected ? (
            <>
                <div className={styles.chatBox}>
                    <div
                        className={styles.messageBox}
                        style={{ height: "480px", }}
                    >
                        {messages.map((message, index) => (
                            <ModalChatMessage
                                key={index}
                                user={code}
                                message={message} />
                        ))}
                        <div ref={messageEnd}></div>
                    </div>
                    <div className={styles.modalInputBox}>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                            />
                            <button type="submit">전송</button>
                        </form>
                    </div>
                </div>
            </>
        ) : (
            <>
                <div className={styles.modalErrorBox}>
                    <div>
                        <img
                            src="/images/admin/NoNetwork.png"
                            alt="인터넷 연결 안됨 아이콘"
                        />
                        <p>채팅 서버에 접속하지 못했습니다</p>
                        <p>다시 시도해주세요</p>
                    </div>
                </div>
            </>
        )
    );
};

export default PrivateChat;
