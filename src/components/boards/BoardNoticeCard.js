import { useState } from 'react';

import styles from './BoardNoticeCard.module.css';

function BoardNoticeCard({ notice }) {

    const [noticeOpen, setNoticeOpen] = useState(false);

    const onClickHandler = () => {

        setNoticeOpen(!noticeOpen);
    };

    return noticeOpen ? (
        <>
            <div
                className={styles.container}
                onClick={onClickHandler}
            >
                <div className={styles.titleBox}>
                    <img
                        src='/images/common/Minus.png'
                        alt=''
                    />
                    <p>{notice.postTitle}</p>
                </div>
                <div className={styles.contentBox}>
                    <p>{notice.postContext}</p>
                </div>
                <hr />
            </div>
        </>
    ) : (
        <>
            <div
                className={styles.container}
                onClick={onClickHandler}
            >
                <div className={styles.titleBox}>
                    <img
                        src='/images/common/Plus.png'
                        alt=''
                    />
                    <p>{notice.postTitle}</p>
                </div>
                <hr />
            </div>
        </>
    );
}

export default BoardNoticeCard;