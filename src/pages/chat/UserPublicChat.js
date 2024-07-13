import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import PublicChat from '../../components/chat/PublicChat';

import { jwtDecode } from 'jwt-decode';

import styles from "./UserChat.module.css";

function UserPublicChat() {

  const [userCode, setUserCode] = useState();
  const [userNick, setUserNick] = useState();

  const navigate = useNavigate();

  useEffect(() => {

    if (!localStorage.getItem('accessToken')) {

      navigate('/login');
    } else {

      const decodedToken = jwtDecode(localStorage.getItem('accessToken'));
      const code = decodedToken.userCode;
      const nick = decodedToken.userNick;

      setUserCode(code);
      setUserNick(nick);
    }
  }, []);

  return (
    <>
      <div className={styles.outerContainer}>
        <div className={styles.innerContainer}>
          <h1>댕댕이 사료 뜯어 먹는 소리</h1>
          <div className={styles.background}>
            <img src="/images/common/ChatBack.gif" />
          </div>
          <div className={styles.chatContainer}>
            <PublicChat
              code={userCode}
              nick={userNick}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPublicChat;
