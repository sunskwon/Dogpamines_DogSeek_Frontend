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
          <h2>자유 채팅방</h2>
          {/* <p style={{textAlign:'center', color:'green'}}>댕댕이 사료 뜯어먹는 소리</p> */}
          <div className={styles.background}>
            <img src="/images/animal/cuteDog.png" />
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
