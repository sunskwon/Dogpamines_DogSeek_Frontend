import styles from './BoardPostCard.module.css';

function BoardPostCard({ post, setModalOpen }) {

    const onClickHandler = () => {

        if (localStorage.getItem('accessToken')) {

        } else {
            setModalOpen(true);
        };
    };

    return (
        <>
            <div
                className={styles.cardBox}
                onClick={onClickHandler}
            >
                <p className={styles.title}>{post.postTitle}</p>
                <p className={styles.context}>{post.postContext}</p>
                <div className={styles.infoBox}>
                    <div className={styles.nickBox}>
                        <p>{post.userNick}</p>
                    </div>
                    <div className={styles.dateBox}>
                        <p>{post.postDate}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BoardPostCard;