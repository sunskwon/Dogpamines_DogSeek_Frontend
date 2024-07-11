import React, { useState, useEffect, useRef } from 'react';

import { GetAPI } from "../../api/RestAPIs";

import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

import Loading from '../admin/adminCommon/Loading';

import ChatMessage from './ChatMessage';

import styles from "./UserChat.module.css";

const PublicChat = ({ code, nick }) => {

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

        const address = '/chat/prev?roomId=/topic/public';

        setBoolLoading(true)

        try {

            await wait();

            const response = await GetAPI(address);

            const result = await response.prevs;

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
                client.subscribe('/topic/public', message => {
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

        return () => {
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
                roomId: '/topic/public',
                userCode: userCode,
                userNick: userNick,
                type: type,
                message: content,
                date: new Date().toLocaleString()
            };
            stompClient.publish({
                destination: '/app/chat.sendMessage',
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

    return boolLoading ? (<Loading />) : (
        stompClient && stompClient.connected ? (
            <>
                <div className={styles.chatBox}>
                    <div className={styles.messageBox}>
                        {messages.map((message, index) => (
                            <ChatMessage
                                key={index}
                                user={code}
                                message={message} />
                        ))}
                        <div ref={messageEnd}></div>
                    </div>
                    <div className={styles.inputBox}>
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
                <div className={styles.errorBox}>
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

export default PublicChat;
