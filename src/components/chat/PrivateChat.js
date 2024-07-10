import React, { useState, useEffect } from 'react';

import { GetAPI } from "../../api/RestAPIs";

import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

import { jwtDecode } from 'jwt-decode';

import ChatMessage from './ChatMessage';

const PrivateChat = () => {

    const [userCode, setUserCode] = useState();
    const [userNick, setUserNick] = useState();

    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");

    const baseUrl = process.env.REACT_APP_SPRING_SERVER;

    const call = async () => {

        const address = `/chat/prev?roomId=/topic/room/${userCode}`;

        const response = await GetAPI(address);

        const result = await response.prevs;

        return result;
    };

    useEffect(() => {
        console.log('hi1');

        const decodedToken = jwtDecode(localStorage.getItem('accessToken'));

        const code = decodedToken.userCode;
        const nick = decodedToken.userNick;

        setUserCode(code);
        setUserNick(nick);

        return () => {
            console.log('bye1');
        }
    }, []);

    useEffect(() => {
        console.log('hi2');

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

        return () => {
            client.deactivate();
            console.log('bye2');
        };
    }, [userCode]);

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

export default PrivateChat;
