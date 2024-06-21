import styles from "./BoardPost.module.css";


function Post(){



    return(
        <div className={styles.display_post}>
        <div>
            <p className={styles.post_num}>no.1</p>
            <p className={styles.post_title}>안녕하세요 반갑습니다.</p>
        <div className={styles.post_user_button}>
            <div className={styles.post_user}>
                <p className={styles.post_nick}>알로항</p>
                <p className={styles.post_day}>작성일 2024.06.03</p>
            </div>
            <div>
                <button className={styles.button_modify}>수정</button>
                <button className={styles.button_list}>목록</button>
            </div>
        </div>
        </div>
        <hr color="D4D4D4"/>
        <div className={styles.hr_post}>
            게시글 내용 제가 최근에 최근을 넘어서 최근에 화재가 되고 있는걸 해보았습니다...
        </div>
        <hr color="D4D4D4"/>

        <div>
            <div className={styles.button_siren}>
                <button className={styles.button_delete}>삭제</button>
                <span className={styles.siren_icon}>
                    <img src="/images/board/siren.svg" />
                    <span>신고하기</span>
                </span>
            </div>
        </div>
        <div>
            <p className={styles.comment_title}>댓글</p>
            <span className={styles.comment_title}>점심먹고땡
                <span>2024.06.03</span>
            <p className={styles.comment_title}>한쿡말은 잘모르지만 쿠냥 마냥 좋은 갱얼쥐 good lol</p>
            </span>
            <div>
                
            </div>
        </div>

        <div className={styles.comment_wrap}>
            <input type="text" placeholder="댓글을 입력해주세요" className={styles.comment_box}/>
            <button className={styles.comment_button}>등록</button>
        </div>
        </div>
        
    )
}

export default Post;