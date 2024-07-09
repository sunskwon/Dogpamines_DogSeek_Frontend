import styles from "./BoardWiting.module.css";
import { PostAPI } from "../../api/RestAPIs";
import { useNavigate } from 'react-router-dom';


function BoardWiting(){

    const navigate = useNavigate();

    const onClickHome = () => {
        navigate("/board");
    }
    return(
        <div className={styles.w_all_display}>
            <div>
                <span className={styles.w_title}>제목</span>
                <input className={styles.w_title_box} 
                    type="text" 
                    maxLength="20" 
                    placeholder="제발...제목을 입력해주세요..제발!!"></input>
            </div>
            <hr color="D4D4D4"/>
            <div className={styles.w_context}>
                <textarea
                    maxLength="500"
                    rows="24"
                    cols="24"
                    className={styles.w_context_text}
                    type="text" 
                    placeholder=
                    "500자 이내에서 내용을 입력해주세요"
                    ></textarea>
            </div>
            <hr color="D4D4D4"/>
            <div className={styles.button_interval}>
                <button className={styles.button_cancel} onClick={onClickHome}>취소</button>
                <button className={styles.button_witing}>등록</button>
            </div>
        </div>
    )
}

export default BoardWiting;