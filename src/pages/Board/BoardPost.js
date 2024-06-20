import styles from "./BoardPost.module.css";

function Post(){

    return(

        <div className={styles.display_post}>
        <p className={styles.no_1}>no.1</p>
        <p className={styles.post_title}>안녕하세요 반갑습니다.</p>

        <div className={styles.member_button_line}>
            <div className={styles.post_nick}>
                <p>알로항</p>
                <p>작성일 2024.06.03</p>
            </div>
            <div>
                <button className={styles.buttons}>수정</button>
                <button className={styles.buttons}>목록</button>
            </div>
        </div>
        <hr color="D4D4D4"/>

        <div>
            게시글 내용 제가 최근에 최근을 넘어서 최근에 화재가 되고 있는걸 해보았습니다...
        </div>
        <hr color="D4D4D4"/>

        <div>
            <div>
                <span>신고 아이콘</span>
                <span>신고하기</span>
            </div>
                <button>
                    <span>삭제</span>
                </button>
        </div>

        <p>댓글</p>
        <p>닉네임</p>
        <p>글내용</p>
        
        <div>
            <input ></input>
            <button>등록</button>
        </div>
        </div>
        
    )
}

export default Post;