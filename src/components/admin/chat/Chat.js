import React, { useState, useEffect } from 'react';

import { GetAPI, PostAPI } from "../../../api/RestAPIs";

import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

import { jwtDecode } from 'jwt-decode';

import ChatMessage from './ChatMessage';

const Chat = ({ code }) => {

    const [userCode, setUserCode] = useState();
    const [userNick, setUserNick] = useState();
    const [userId, setUserId] = useState();

    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");

    const baseUrl = process.env.REACT_APP_SPRING_SERVER;

    const call = async () => {

        const address = `/chat/prev?roomId=/topic/room/${userId}`;

        const response = await GetAPI(address);

        const result = await response.prevs;

        return result;
    };

    useEffect(() => {

        const decodedToken = jwtDecode(localStorage.getItem('accessToken'));

        const myCode = decodedToken.userCode;
        const myNick = decodedToken.userNick;

        setUserId(code.userId);
        setUserCode(myCode);
        setUserNick(myNick);
    }, []);

    useEffect(() => {

        call().then(res => setMessages(res));

        const socket = new SockJS(`${baseUrl}/chat`);
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: (frame) => {
                console.log('Connected: ' + frame);
                client.subscribe(`/topic/room/${userId}`, message => {
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

        return async () => {
            client.deactivate();

            const leaveMessage = {
                roomId: `/topic/room/${userId}`,
                userCode: userCode,
                userNick: userNick,
                type: 'LEAVE',
                message: `운영자 ${userNick}님이 떠났습니다`,
                date: new Date().toLocaleString()
            };

            const address = '/chat/adminleave';

            const response = await PostAPI(address, leaveMessage);
        };
    }, [userId]);

    const sendMessage = async (type, content) => {
        if (stompClient && stompClient.connected) {
            const chatMessage = {
                roomId: `/topic/room/${userId}`,
                userCode: userCode,
                userNick: userNick,
                type: type,
                message: content,
                date: new Date().toLocaleString()
            };

            stompClient.publish({
                destination: `/app/chat.sendMessage/room/${userId}`,
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

    return (
        <div>
            <div>
                {messages.map((message, index) => (
                    <ChatMessage
                        key={index}
                        message={message} />
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;
