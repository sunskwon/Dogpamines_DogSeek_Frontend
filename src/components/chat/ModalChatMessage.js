import React from 'react';

import styles from "./UserChat.module.css";

const ModalChatMessage = ({ user, message }) => {

  return message.type !== 'CHAT' ? (
    <>
      <div className={styles.modalInfoMessage}>
        <p>{message.message}</p>
      </div>
    </>
  ) : (user == message.userCode ? (
    <>
      <div className={styles.myMessage}>
        <div className={styles.modalMessage}>
          <div className={styles.myModalBubble}>
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
        <div className={styles.modalMessage}>
          <div className={styles.otherModalBubble}>
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
  )
  )
};

export default ModalChatMessage;