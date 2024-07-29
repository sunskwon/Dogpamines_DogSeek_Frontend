import { useState, useEffect } from 'react';

import BoardPostCard from './BoardPostCard';
import PageButton from '../common/PageButton';

import styles from './BoardPostList.module.css';

function BoardPostList({ postList, searchCriteria, setSearchCriteria, boolSearch, setBoolSearch, setModalOpen }) {

    const [slicedPostList, setSlicedPostList] = useState([]);
    const [page, setPage] = useState(1);
    const [emptyPostList, setEmptyPostList] = useState(false);

    useEffect(() => {

        setEmptyPostList(false);

        if (postList.length === 0) {

            setEmptyPostList(true);
        } else {

            setSlicedPostList(postList.slice(5 * (page - 1), 5 * page));
        }
    }, [postList, page]);

    const onChangeHandler = e => {

        setSearchCriteria({
            ...searchCriteria,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitHandler = e => {

        e.preventDefault();
        setBoolSearch(!boolSearch);
    };

    const onClickHandler = () => {

        if (localStorage.getItem('accessToken')) {

        } else {
            setModalOpen(true);
        };
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.titleBox}>
                    <p className={styles.title}>Posts</p>
                    <div className={styles.searchAndWriteBox}>
                        <div className={styles.wrapBox}>
                            <form
                                className={styles.searchBox}
                                onSubmit={onSubmitHandler}
                            >
                                <input
                                    type='text'
                                    name='input'
                                    placeholder='검색어를 입력하세요'
                                    value={searchCriteria.input}
                                    onChange={onChangeHandler}
                                />
                                <button
                                    type='submit'
                                >
                                    <img
                                        src='/images/product/Search.png'
                                        alt=''
                                    />
                                </button>
                            </form>
                            <div
                                className={styles.button}
                                onClick={onClickHandler}
                            >
                                <p>글쓰기</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {emptyPostList ? (
                        <div className={styles.emptyBox}>
                            <p>게시물이 없습니다</p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.postList}>
                                {slicedPostList.map(post => (
                                    <BoardPostCard
                                        key={post.postCode}
                                        post={post}
                                        setModalOpen={setModalOpen}
                                    />
                                ))}
                            </div>
                            <PageButton
                                page={page}
                                setPage={setPage}
                                maxPage={Math.ceil(postList.length / 5)}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default BoardPostList;