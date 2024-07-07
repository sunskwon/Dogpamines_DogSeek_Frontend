import React from 'react';

const ChatMessage = ({ message }) => (
  <div className={`chat-message ${message.type}`}>
    <span className="sender">{message.sender}: </span>
    <span className="content">{message.content}</span>
  </div>
);

export default ChatMessage;