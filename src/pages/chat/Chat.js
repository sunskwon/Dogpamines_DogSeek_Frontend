import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import ChatComponent from '../../components/chat/ChatComponent';

import { jwtDecode } from 'jwt-decode';

function Chat() {

  const [userCode, setUserCode] = useState(0);
  const [userNick, setUserNick] = useState('');

  const navigate = useNavigate();

  useEffect(() => {

    try {
      const decodedToken = jwtDecode(localStorage.getItem('accessToken'));
      const decodedUserCode = decodedToken.userCode;
      const decodedUserNick = decodedToken.userNick;

      setUserCode(decodedUserCode);
      setUserNick(decodedUserNick);
    } catch (error) {

      navigate('/login');
    }
  }, []);

  return (
    <div>
      <h1>chat</h1>
      <ChatComponent
        userCode={userCode}
        userNick={userNick}
      />
    </div>
  );
}

export default Chat;
