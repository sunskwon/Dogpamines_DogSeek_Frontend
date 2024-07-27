import styles from './BoardPostList.module.css';

function BoardPostList({ postList }) {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.titleBox}>
                    <p>Posts</p>
                    <div className={styles.searchAndWriteBox}>
                        <div className={styles.searchBox}>
                            <form>
                                <input
                                    type='text'
                                    name='input'
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BoardPostList;