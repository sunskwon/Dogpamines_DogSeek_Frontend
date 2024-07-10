import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import PrivateChat from '../../components/chat/PrivateChat';

import { jwtDecode } from 'jwt-decode';

function UserPrivateChat() {

  const navigate = useNavigate();

  useEffect(() => {

    try {
      
      const decodedToken = jwtDecode(localStorage.getItem('accessToken'));
    } catch (error) {

      navigate('/login');
    }
  }, []);

  return (
    <div>
      <h1>chat</h1>
      <PrivateChat />
    </div>
  );
}

export default UserPrivateChat;
