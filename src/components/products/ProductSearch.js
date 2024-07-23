import styles from './ProductSearch.module.css';

function ProductSearch({ searchCriteria, setSearchCriteria }) {

    const onChangeHandler = (e) => {

        setSearchCriteria({
            ...searchCriteria,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapBox}>
                    <form className={styles.searchBox}>
                        <input
                            type='text'
                            name='input'
                            placeholder='키워드를 입력하세요'
                            value={searchCriteria.input}
                            onChange={onChangeHandler}
                        />
                        <hr className={styles.verticalLine} />
                        <button>
                            <img
                                src='/images/product/Search.png'
                                alt='search'
                            />
                        </button>
                    </form>
                    <div
                        className={styles.filter}
                    >
                        <img
                            src='/images/product/Filter.png'
                            alt='filter'
                            className={styles.filterIcon}
                        />
                        <div className={styles.hoverFilter}>
                            <form className={styles.filterContents}>
                                <p className={styles.subtitle}>크기</p>
                                <hr />
                                <div className={styles.selectWrapBox}>
                                    <p>소형견</p>
                                    <p>중형견</p>
                                    <p>대형견</p>
                                </div>
                                <p className={styles.subtitle}>나이</p>
                                <hr />
                                <div className={styles.selectWrapBox}>
                                    <p>유아기</p>
                                    <p>청년기</p>
                                    <p>노년기</p>
                                </div>
                                <p className={styles.subtitle}>조리방식</p>
                                <hr />
                                <div className={styles.selectWrapBox}>
                                    <p>건식</p>
                                    <p>습식</p>
                                    <p>화식</p>
                                    <p>소프트</p>
                                </div>
                                <p className={styles.subtitle}>입자크기</p>
                                <hr />
                                <div className={styles.selectWrapBox}>
                                    <p>8mm 미만</p>
                                    <p>8 ~ 13mm</p>
                                    <p>13mm 이상</p>
                                </div>
                                <p className={styles.subtitle}>제품기능</p>
                                <hr />
                                <div className={styles.selectWrapBox}>
                                    <p>관절</p>
                                    <p>면역</p>
                                    <p>식욕증진</p>
                                    <p>저알러지</p>
                                    <p>영양공급</p>
                                    <p>비타민</p>
                                    <p>다이어트</p>
                                    <p>눈물자국</p>
                                </div>
                                <p className={styles.subtitle}>가격</p>
                                <hr />
                                <div className={styles.selectWrapBox}>
                                    <p>소형견</p>
                                    <p>중형견</p>
                                    <p>대형견</p>
                                </div>
                                <div className={styles.buttonBox}>
                                    <div
                                        className={`${styles.button} ${styles.cancel}`}
                                    >
                                        취소
                                    </div>
                                    <button
                                        type='submit'
                                        className={`${styles.button} ${styles.accept}`}
                                    >
                                        적용
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductSearch;