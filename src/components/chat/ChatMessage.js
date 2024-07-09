import React from 'react';

const ChatMessage = ({ message }) => (
  <div>
    <span>{message.userNick} :</span>
    <span>{message.message}</span>
    <span>({message.date})</span>
  </div>
);

export default ChatMessage;