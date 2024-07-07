import { useLocation, useNavigate } from "react-router-dom";

import SelectBoardByCode from "../../../components/admin/board/SelectBoardByCode";
import FetchErrorBoundary from "../../../components/admin/adminCommon/FetchErrorBoundary";

import styles from "../AdminPages.module.css";

function AdminSelectBoardByCode() {

    const { state } = useLocation();

    const navigate = useNavigate();

    return (
        <div>
            <p className={styles.subTitle}>게시판 관리</p>
            <div className={styles.mainOuter}>
                <div className={styles.mainBox}>
                    <div>
                        <p className={styles.subjectTitle}>상세 공지 내용</p>
                        <div style={{ float: "right", }}>
                            <button
                                className={styles.cancelButton}
                                style={{ marginRight: "15px", }}
                                onClick={() => {
                                    navigate("/admin/boards");
                                }}
                            >
                                돌아가기
                            </button>
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "10px", }}
                                onClick={() => {
                                    navigate("/admin/updateboard", {
                                        state: { Location: state.Location }
                                    });
                                }}
                            >
                                수정
                            </button>
                        </div>
                        <div
                            className={styles.productDetail}
                            style={{ paddingTop: "100px", }}
                        >
                            <FetchErrorBoundary height="460px">
                                <SelectBoardByCode
                                    Location={state.Location}
                                />
                            </FetchErrorBoundary>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSelectBoardByCode;