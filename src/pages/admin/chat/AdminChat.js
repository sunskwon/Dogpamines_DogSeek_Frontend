import React, { useState, useEffect, useRef } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import Chat from '../../../components/admin/chat/Chat';
import FetchErrorBoundary from '../../../components/admin/adminCommon/FetchErrorBoundary';

import ConfirmModal from '../../../components/admin/adminCommon/ConfirmModal';

import { jwtDecode } from 'jwt-decode';

import styles from "../AdminPages.module.css";

function AdminChat() {

  const [userCode, setUserCode] = useState();
  const [userNick, setUserNick] = useState();

  const [modalOpen, setModalOpen] = useState(false);

  const modalBackground = useRef();

  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {

    const decodedToken = jwtDecode(localStorage.getItem('accessToken'));
    const code = decodedToken.userCode;
    const nick = decodedToken.userNick;

    setUserCode(code);
    setUserNick(nick);
  }, []);

  return (
    <div>
      <p className={styles.subTitle}>1:1 문의 관리</p>
      <div className={styles.mainOuter}>
        <div className={styles.mainBox}>
          <div>
            <p className={styles.subjectTitle}>1:1 채팅 내용</p>
            <div style={{ float: "right", }}>
              <button
                className={styles.cancelButton}
                style={{ marginRight: "15px", }}
                onClick={() => setModalOpen(true)}
              >
                뒤로가기
              </button>
            </div>
          </div>
          <div style={{ clear: "both", }}>
            <FetchErrorBoundary height="560px">
              <Chat
                code={userCode}
                nick={userNick}
                connect={state}
              />
            </FetchErrorBoundary>
          </div>
        </div>
      </div>
      <ConfirmModal
        message={`${state.userNick}님과의 대화를 끝내시겠습니까?`}
        onClickHandler={() => navigate(-1)}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalBackground={modalBackground}
      />
    </div>
  );
}

export default AdminChat;
