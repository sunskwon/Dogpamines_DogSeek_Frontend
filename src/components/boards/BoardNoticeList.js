import { useState, useEffect } from 'react';

import BoardNoticeCard from './BoardNoticeCard';
import PageButton from '../common/PageButton';

import styles from './BoardNoticeList.module.css';

function BoardNotice({ noticeList }) {

    const [page, setPage] = useState(1);
    const [slicedNotice, setSlicedNotice] = useState([]);

    useEffect(() => {

        setSlicedNotice(noticeList.slice(3 * (page - 1), 3 * page));
    }, [noticeList, page]);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.titleBox}>
                    <p>Notices</p>
                </div>
                <div className={styles.noticeList}>
                    <hr />
                    {slicedNotice.map(notice => (
                        <BoardNoticeCard
                            key={notice.postCode}
                            notice={notice}
                        />
                    ))}
                </div>
                <PageButton
                    page={page}
                    setPage={setPage}
                    maxPage={Math.ceil(noticeList.length / 3)}
                />
            </div>
        </>
    );
}

export default BoardNotice;