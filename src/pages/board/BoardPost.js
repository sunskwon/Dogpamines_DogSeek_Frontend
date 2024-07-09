import { useState, useEffect } from "react";
import { GetAPI } from "../../api/RestAPIs";
import styles from "./BoardPost.module.css";

function Post() {
  const [boards, setBoards] = useState([]);
  const [postCode, setPostCode] = useState([]);

  const fetchPost = async () => {
    try {
      const boardAddress = `/boards?postCode=${postCode}`;
      const response = await GetAPI(boardAddress);
      const result = response.boards; // await 필요 없음

      return result;
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchPost();
      setBoards(res);
    };
    fetchData();
  }, [postCode]);

  return (
    <div>
      {boards.map((post, index) => (
        <div className={styles.display_post}>
          <div key={index}>
            <p className={styles.post_num}>No.{post.postCode}</p>
            <p className={styles.post_title}>{post.postTitle}</p>
            <div className={styles.post_user_button}>
              <div className={styles.post_user}>
                <p className={styles.post_nick}>{post.userNick}</p>
                <p className={styles.post_day}>{post.postDate}</p>
              </div>
              <div>
                <button className={styles.button_modify}>수정</button>
                <button className={styles.button_list}>목록</button>
              </div>
            </div>
          </div>
          <hr color="D4D4D4" />

          <div className={styles.hr_post}>
            {post.postContext}
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
        ))}
    </div>
  );
}

export default Post;
