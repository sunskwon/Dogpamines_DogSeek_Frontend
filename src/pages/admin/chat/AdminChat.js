import React, { useState, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import Chat from '../../../components/admin/chat/Chat';

import { jwtDecode } from 'jwt-decode';

function AdminChat() {

  const { state } = useLocation();

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
      <Chat
        code={state}
      />
    </div>
  );
}

export default AdminChat;
