import React from 'react';

import styles from "./AdminChat.module.css";

const ChatMessage = ({ user, message }) => {

  return user == message.userCode ? (
    <>
      <div className={styles.myMessage}>
        <div className={styles.message}>
          <div className={styles.myBubble}>
            <div className={styles.bubbleContent}>
              <p style={{ color: "white", }}>{message.message}</p>
            </div>
            <div className={styles.bubbleDate}>
              <p>{message.date}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className={styles.otherMessage}>
        <div className={styles.message}>
          <p style={{ margin: "10px", }}>{message.userNick}</p>
          <div className={styles.otherBubble}>
            <div className={styles.bubbleContent}>
              <p>{message.message}</p>
            </div>
            <div className={styles.bubbleDate}>
              <p>{message.date}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatMessage;