import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { GetAPI, PostAPI, DeleteAPI } from "../../api/RestAPIs";
import { useNavigate } from 'react-router-dom';
import styles from "./BoardPost.module.css";
import { jwtDecode } from 'jwt-decode'; // jwt-decode에서 import 이름 수정

function PostDetail() {
  const { code } = useParams();
  const [postDetail, setPostDetail] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [modal, setModal] = useState({
    state: false,
    isCheck: false,
    isOneBtn: true,
    text: '',
  });
  const [reportReason, setReportReason] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();
  const modalBackground = useRef();

  // 로그인한 회원 정보 가져오기
  const accessToken = window.localStorage.getItem("accessToken");
  const decodedToken = accessToken ? jwtDecode(accessToken) : null; // localStorage에서 accessToken 가져오기

  const userCode = decodedToken ? decodedToken.userCode : null; // null 체크 추가
  const userNick = decodedToken ? decodedToken.userNick : null;
  const isLoggedIn = Boolean(decodedToken);

  const deleteOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setModal({ ...modal, state: false });
  };

  const { postCode } = location.state;

  const fetchPostDetail = async () => {
    const boardAddress = `/boards/${postCode}`;
    console.log("Fetching post details from: ", boardAddress);
    try {
      const response = await GetAPI(boardAddress);
      setPostDetail(response.boards);
    } catch (error) {
      console.error("Fetch post detail error:", error);
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, [postCode]);

  const postDelete = async () => {
    const address = `/boards/${postCode}`;
    console.log("Deleting post at: ", address);

    try {
      const response = await DeleteAPI(address);

      if (response.ok) {
        setIsModalOpen(false);
        setModal({ ...modal, state: true, isCheck: true, isOneBtn: true, text: '게시물이 삭제 되었습니다.' });

        // 모달을 닫은 후 3초 후에 board 페이지로 이동
        setTimeout(() => {
          navigate("/board");
        }, 3000);
      } else {
        console.log("Delete failed with status: ", response.status);
        setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '게시물 삭제에 실패하셨습니다.' });
      }
    } catch (error) {
      console.log("Delete error: ", error);
      setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '게시물 삭제에 실패하였습니다.' });
    }
  };

  const reportPost = async () => {
    try {

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];

      const reportData = {
        reportReason: reportReason,
        reportDate: formattedDate,
        reportUser: userCode,
        reportNick: userNick,
        postCode: postDetail.postCode // postDetail을 객체로 초기화
      };

      console.log("Sending report data: ", reportData); // 디버깅용 로그 추가

      const response = await PostAPI("/report/post", reportData);
      console.log("신고 결과:", response, );
      if (response.ok) {
        console.log("신고가 접수되었습니다.");
        setIsReportModalOpen(false);
        setModal({ ...modal, state: true, isCheck: true, isOneBtn: true, text: '신고가 접수되었습니다.' });
      } else {
        console.log("신고 접수 실패:", response.status);
        setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '신고 접수에 실패하였습니다.' });
      }
    } catch (error) {
      console.error("신고 접수 오류:", error);
      setModal({ ...modal, state: true, isCheck: false, isOneBtn: true, text: '신고 접수에 실패하였습니다.' });
    }
  };

  const handleReportCancel = () => {
    setIsReportModalOpen(false);
  };

  const openReportModal = () => {
    setIsReportModalOpen(true);
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
              <button className={styles.report_button} onClick={openReportModal}>
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
        
        {isReportModalOpen && (
          <div className={styles.modalContainer} ref={modalBackground}>
            <div className={styles.modalContent}>
              <div className={styles.modalTextContainer}>
                <p>게시물을</p>
                <p>신고 하시겠습니까?</p>
              </div>
              <div className={styles.reportContainer}>
                <label htmlFor="reportReason" className={styles.interval}>신고 사유:</label>
                <select
                  id="reportReason"
                  name="reportReason"
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className={styles.reportReasonSelect}
                >
                  <option value="">선택하세요</option>
                  <option value="욕설">욕설</option>
                  <option value="도배">도배</option>
                  <option value="부적절한 언행">부적절한 언행</option>
                  <option value="부적절한 닉네임">부적절한 닉네임</option>
                  <option value="비정상적인 접속">비정상적인 접속</option>
                </select>
              </div>
              <div className={styles.btnContainer2}>
                <button className={styles.modalCloseBtn} onClick={handleReportCancel}>취소</button>
                <button className={styles.modalReportBtn2} onClick={reportPost}>신고</button>
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
