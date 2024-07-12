import ChatList from "../../../components/admin/chat/ChatList";
import FetchErrorBoundary from "../../../components/admin/adminCommon/FetchErrorBoundary";

import styles from "../AdminPages.module.css";

function AdminChatList() {

    return (
        <div>
            <p className={styles.subTitle}>1:1 문의 관리</p>
            <div className={styles.mainOuter}>
                <div className={styles.mainBox}>
                    <div>
                        <p className={styles.subjectTitle}>문의 목록</p>
                        <div style={{ float: "right", }}>
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "15px", }}
                                onClick={() => { window.location.replace("/admin/chatlist"); }}
                            >
                                새로고침
                            </button>
                        </div>
                    </div>
                    <div style={{ clear: "both", }}>
                        <div className={styles.productList}>
                            <FetchErrorBoundary height="560px">
                                <ChatList />
                            </FetchErrorBoundary>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminChatList;