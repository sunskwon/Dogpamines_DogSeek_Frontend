import { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { DeleteAPI, GetAPI } from "../../api/RestAPIs";
import { useNavigate } from 'react-router-dom';
import styles from "./BoardPost.module.css";
import {jwtDecode} from 'jwt-decode';

function PostDetail() {
  const { code } = useParams();
  const [postDetail, setPostDetail] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState({
    state: false,
    isCheck: false,
    isOneBtn: true,
    text: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const modalBackground = useRef();

  // 로그인한 회원 정보 가져오기
  const decodedToken = jwtDecode(window.localStorage.getItem("accessToken"));
  const userCode = decodedToken.userCode;
  const userNick = decodedToken.userNick;
  const userAuth = decodedToken.userAuth;
  const isLoggedIn = Boolean(decodedToken);

  const deleteOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const closeModal = () => {
    setModal({ ...modal, state: false });
  };

  const { postCode } = location.state;

  const fetchPostDetail = async () => {
    const boardAddress = `/boards/${postCode}`;
    console.log("Fetching post details from: ", boardAddress); // 로그 추가
    const response = await GetAPI(boardAddress);
    setPostDetail(response.boards);
  };

  useEffect(() => {
    fetchPostDetail();
  }, [postCode]);

  const postDelete = async () => {
    const address = `/boards/${postCode}`;
    console.log("Deleting post at: ", address); // 로그 추가

    try {
      const response = await DeleteAPI(address);

      if (response.ok) {
        console.log("Delete successful"); // 로그 추가
        setIsModalOpen(false);
        setModal({ ...modal, state: true, isCheck: true, isOneBtn: true, text: '게시물이 삭제 되었습니다.' });
        setTimeout(() => {
          navigate("/board");
          window.location.reload();
        });
      } else {
        console.log("Delete failed with status: ", response.status); // 로그 추가
        setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '게시물 삭제에 실패하셨습니다.' });
      }
    } catch (error) {
      console.log("Delete error: ", error); // 로그 추가
      setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '게시물 삭제에 실패하였습니다.' });
    }
  };

  return (
    <div>
      <div className={styles.display_post}>
        <div>
          <p key={postDetail.postCode} className={styles.post_num}>No.{postDetail.postCode}</p>
          <p className={styles.post_title}>{postDetail.postTitle}</p>
          <div className={styles.post_user_button}>
            <div className={styles.post_user}>
              <p className={styles.post_nick}>{postDetail.userNick}</p>
              <p className={styles.post_day}>{postDetail.postDate}</p>
            </div>
            <div>
              {isLoggedIn && userCode === postDetail.userCode && (
                <>
                  <button className={styles.button_modify} onClick={() => navigate("/boardupdate", {
                    state: { postCode: postCode }
                  })}>수정</button>
                  <button className={styles.button_list} onClick={() => navigate("/board")}>목록</button>
                </>
              )}
            </div>
          </div>
        </div>

        <hr color="D4D4D4" />
        <div className={styles.hr_post}>
          {postDetail.postContext}
        </div>

        <hr color="D4D4D4" />

        <div>
          <div className={styles.button_siren}>
            {isLoggedIn && userCode === postDetail.userCode && (
              <button className={styles.button_delete} onClick={deleteOpenModal}>삭제</button>
            )}
            <div className={styles.siren_icon}>
              <button className={styles.report_button}>
                <img src="/images/board/siren.svg" alt="신고하기" />
                <span>신고하기</span>
              </button>
            </div>
          </div>
        </div>
        
        {isModalOpen && (
          <div className={styles.modalContainer} ref={modalBackground}>
            <div className={styles.modalContent}>
              <div className={styles.modalTextContainer}>
                <p>게시물을</p>
                <p>삭제 하시겠습니까?</p>
              </div>
              <div className={styles.btnContainer}>
                <button className={styles.modalCloseBtn} onClick={handleCancel}>취소</button>
                <button className={styles.modalDeleteBtn} onClick={postDelete}>삭제</button>
              </div>
            </div>
          </div>
        )}
        
        {modal.state && (
          <div className={styles.modalContainer}>
            <div className={styles.modalContent1}>
              <div className={styles.iconContainer}>
                {modal.isCheck ? (
                  <img src='./images/auth/modal_check.png' alt='modal_check' />
                ) : (
                  <img src='./images/auth/exclamationmark_circle.png' alt='exclamation_circle' />
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
    </div>
  );
}

export default PostDetail;
