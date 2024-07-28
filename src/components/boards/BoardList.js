import { useState, useEffect } from 'react';

import { GetAPIwoToken } from '../../api/RestAPIs';

import BoardNoticeList from './BoardNoticeList';
import BoardPostList from './BoardPostList';

import styles from './BoardList.module.css';

function BoardWelcome() {

    const [noticeList, setNoticeList] = useState([]);
    const [postList, setPostList] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState({
        type: 'postTitle',
        input: ''
    });
    const [boolSearch, setBoolSearch] = useState(false);

    const fetch = async (address) => {

        return await GetAPIwoToken(address);
    };

    useEffect(() => {

        window.scrollTo(0, 0);

        fetch('/boards')
            .then(res => res.boards.filter(post => post.postStatus !== 'N'))
            .then(res => {

                const notices = res.filter(post => post.postCategory === '공지');
                const posts = res.filter(post => post.postCategory === '자유');

                setNoticeList(notices);
                setPostList(posts);
            });
    }, []);

    useEffect(() => {

        window.scrollTo(0, 0);

        fetch(`/boards/search?type=${searchCriteria.input}`)
            .then(res => res.boards.filter(post => post.postStatus !== 'N'))
            .then(res => {

                const posts = res.filter(post => post.postCategory === '자유');

                setPostList(posts);
            });

        setSearchCriteria({
            ...searchCriteria,
            input: ''
        });
    }, [boolSearch]);

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
                    searchCriteria={searchCriteria}
                    setSearchCriteria={setSearchCriteria}
                    boolSearch={boolSearch}
                    setBoolSearch={setBoolSearch}
                />
            </div>
        </>
    );
}

export default BoardWelcome;