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

  const inhandler = async () => {
    const address = "/boards";
    console.log('postTitle', postDetail.postTitle);

    console.log('제목 수정 확인', updateTitle);
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
        navigate("/postdetail", {
          state: {
            postCode: postCode,
          },
        }); // 게시물 등록 후 목록으로 이동하거나 화면을 갱신할 수 있음
      }
    } catch (error) {
      console.error("Error posting new data", error);
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
          onChange={(e) => setPostDetail({...postDetail, postTitle: e.target.value})}
        ></input>
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
          onChange={(e) => setPostDetail({...postDetail, postContext: e.target.value})}
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
    </div>
  );
}

export default BoardUpdate;
