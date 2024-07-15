import React, { useState } from "react";
import styles from "./BoardWriting.module.css";
import { PostAPI } from "../../api/RestAPIs";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function Writing() {
  const date = new Date();
  const today = `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }-${date.getDate()}`;
  const currentTime = `${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;

  const [newPost, setNewPost] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState({
    state: false,
    isCheck: false,
    isOneBtn: true,
    text: '',
  });

  const decodedToken = jwtDecode(window.localStorage.getItem("accessToken"));
  const userCode = decodedToken.userCode;
  const userNick = decodedToken.userNick;

  const navigate = useNavigate();

  const onClickHome = () => {
    navigate("/board");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showModal = (text, isCheck) => {
    setModal({
      state: true,
      isCheck: isCheck,
      isOneBtn: true,
      text: text,
    });
    setIsModalOpen(true);
  };

  const inhandler = async () => {
    if (!newTitle || !newPost) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const address = "/boards";
    const newPostData = {
      postTitle: newTitle,
      postContext: newPost,
      postCategory: "자유",
      postTime: `${today} ${currentTime}`, // 날짜와 시간을 합쳐서 전송
      postStatus: "Y",
      userCode: userCode, // 유저 코드 설정
      userNick: userNick, // 유저 닉네임 설정
    };

    try {
      const response = await PostAPI(address, newPostData);
      if (response) {
        setNewPost(""); // 입력 필드 초기화
        setNewTitle(""); // 입력 필드 초기화
        showModal('게시물이 등록되었습니다.', true);
        setTimeout(() => {
          navigate("/board"); // 게시물 등록 후 목록으로 이동
        }, 1000);
      }
    } catch (error) {
      console.error("Error posting new data", error);
      showModal('게시물 등록에 실패하였습니다.', false);
    }
  };

  return (
    <div className={styles.w_all_display}>
      <div>
        <span className={styles.w_title}>제목</span>
        <input
          className={styles.w_title_box}
          type="text"
          maxLength="20"
          placeholder="20자 이내에서 제목을 입력해주세요"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>
      <hr color="D4D4D4" />
      <div className={styles.w_context}>
        <textarea
          maxLength="500"
          rows="24"
          cols="24"
          className={styles.w_context_text}
          type="text"
          placeholder="500자 이내에서 내용을 입력해주세요"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
      </div>
      <hr color="D4D4D4" />
      <div className={styles.button_interval}>
        <button className={styles.button_cancel} onClick={onClickHome}>
          취소
        </button>
        <button className={styles.button_writing} onClick={inhandler}>
          등록
        </button>
      </div>
      {isModalOpen && (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent1}>
            <div className={styles.iconContainer}>
              {modal.isCheck ? (
                <img src='/images/auth/modal_check.png' alt='modal_check' />
              ) : (
                <img src='/images/auth/exclamationmark_circle.png' alt='exclamation_circle' />
              )}
            </div>
            <div className={styles.modalTextContainer}>
              <p>{modal.text}</p>
            </div>
            {modal.isOneBtn && (
              <button onClick={closeModal}>닫기</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Writing;
