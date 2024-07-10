import ChatList from "../../../components/admin/chat/ChatList";

import styles from "../AdminPages.module.css";

function AdminChatList() {

    return (
        <div>
            <p className={styles.subTitle}>1:1 문의 관리</p>
            <div className={styles.mainOuter}>
                <div className={styles.mainBox}>
                    <div>
                        <p className={styles.subjectTitle}>문의 목록</p>
                    </div>
                    <div className={styles.productList}>
                        <ChatList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminChatList;