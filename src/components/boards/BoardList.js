import { useState, useEffect } from 'react';

import { GetAPIwoToken } from '../../api/RestAPIs';

import BoardNotice from './BoardNotice';

import styles from './BoardList.module.css';

function BoardWelcome() {

    const [noticeList, setNoticeList] = useState([]);
    const [postList, setPostList] = useState([]);

    useEffect(() => {

        const fetch = async (address) => {

            return await GetAPIwoToken(address);
        };

        window.scrollTo(0, 0);

        fetch('/notice')
            .then(res => setNoticeList(res.notice));
        fetch('/board')
            .then(res => setPostList(res.board));
    }, []);

    console.log(noticeList);
    console.log(postList);

    return (
        <>
            <div className={styles.container}>
                <img
                    src='/images/board/dogsa.png'
                    alt='댕댕이들이 사는 이야기'
                />
                <BoardNotice />
            </div>
        </>
    );
}

export default BoardWelcome;