import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { GetAPI } from "../../api/RestAPIs";
import { useNavigate } from 'react-router-dom';
import styles from "./BoardPost.module.css";
import { jwtDecode } from 'jwt-decode';


function PostDetail() {
  const { code } = useParams();
  const [postDetail, setPostDetail] = useState([]);
//  const [post, setPost] = useState(null);
//  const [load, setLoad] = useState('');

    // 로그인토큰
    const decodedToken = jwtDecode(window.localStorage.getItem("accessToken"));
    const userCode = decodedToken.userCode;
    const userNick = decodedToken.userNick;
    const userAuth = decodedToken.userAuth;

  const navigate = useNavigate();
  const location = useLocation();

  const {postCode} = location.state


  const fetchPostDetail = async () => {

      const boardAddress = `/boards/${postCode}`;
      const response = await GetAPI(boardAddress);
      setPostDetail(response.boards)
  };

  useEffect(() => {
      fetchPostDetail()
  }, [postCode]); 

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
              <button className={styles.button_modify} onClick={() => navigate("/boardupdate", {
                state : { postCode : postCode }
              })}>수정</button>
              <button className={styles.button_list} onClick={() => navigate("/board")}>목록</button>
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
          <button className={styles.button_delete}>삭제</button>
          <div className={styles.siren_icon}>
            <button className={styles.report_button}>
              <img src="/images/board/siren.svg" />
              <span>신고하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default PostDetail;
