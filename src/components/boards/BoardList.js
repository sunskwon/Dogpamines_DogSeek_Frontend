import { useState, useEffect } from 'react';

import { GetAPIwoToken } from '../../api/RestAPIs';

import BoardNoticeList from './BoardNoticeList';
import BoardPostList from './BoardPostList';

import styles from './BoardList.module.css';

function BoardWelcome() {

    const [noticeList, setNoticeList] = useState([]);
    const [postList, setPostList] = useState([]);

    useEffect(() => {

        const fetch = async () => {

            const response = await GetAPIwoToken('/boards');

            return response.boards;
        };

        window.scrollTo(0, 0);

        fetch()
            .then(res => res.filter(post => post.postStatus !== 'N'))
            .then(res => {

                const notices = res.filter(post => post.postCategory === '공지');
                const posts = res.filter(post => post.postCategory === '자유');

                setNoticeList(notices);
                setPostList(posts);
            });
    }, []);

    return (
        <>
            <div className={styles.container}>
                <img
                    src='/images/board/dogsa.png'
                    alt='댕댕이들이 사는 이야기'
                    className={styles.welcomeImg}
                />
                <BoardNoticeList
                    noticeList={noticeList}
                />
                <BoardPostList
                    postList={postList}
                />
            </div>
        </>
    );
}

export default BoardWelcome;