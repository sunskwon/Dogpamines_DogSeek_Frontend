import React, { useState, useEffect } from "react";
import { GetAPI, PutAPI } from "../../api/RestAPIs";
import styles from "./BoardUpdate.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function BoardUpdate() {
  const date = new Date();
  const today = `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }-${date.getDate()}`;
  const currentTime = `${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;

  const [updatePost, setUpdatePost] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [postDetail, setPostDetail] = useState([]);
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
  const location = useLocation();

  const { postCode } = location.state;

  const onClickHome = () => {
    navigate("/postdetail", {
      state: {
        postCode: postCode,
      },
    });
  };

  const fetchPostDetail = async () => {
    const boardAddress = `/boards/${postCode}`;
    const response = await GetAPI(boardAddress);
    setPostDetail(response.boards)
  };

  useEffect(() => {
    fetchPostDetail()
  }, [postCode]);

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
    const address = "/boards";
    console.log('postTitle', postDetail.postTitle);

    const newPostData = {
      postCode: postCode,
      postTitle: postDetail.postTitle,
      postContext: postDetail.postContext,
      postCategory: "자유",
      postTime: `${today} ${currentTime}`, // 날짜와 시간을 합쳐서 전송
      postStatus: "Y",
      userCode: userCode, // 유저 코드 설정
      userNick: userNick, // 유저 닉네임 설정
    };

    try {
      const response = await PutAPI(address, newPostData);
      if (response) {
        showModal('게시물이 수정되었습니다.', true);
        setTimeout(() => {
          navigate(`/post/${postCode}`, {
            state: {
              postCode: postCode,
            },
          });
        }, 1000); // 게시물 수정 후 3초 뒤에 이동
      }
    } catch (error) {
      console.error("Error posting new data", error);
      showModal('게시물 수정에 실패하였습니다.', false);
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
          value={postDetail.postTitle}
          onChange={(e) => setPostDetail({ ...postDetail, postTitle: e.target.value })}
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
          value={postDetail.postContext}
          onChange={(e) => setPostDetail({ ...postDetail, postContext: e.target.value })}
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
                <img src='../images/auth/modal_check.png' alt='modal_check' />
              ) : (
                <img src='../images/auth/exclamationmark_circle.png' alt='exclamation_circle' />
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

export default BoardUpdate;
