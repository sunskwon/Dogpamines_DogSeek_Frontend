import { useState } from 'react';

import styles from './ProductSearch.module.css';

function ProductSearch({ maxPrice, searchCriteria, setSearchCriteria, boolSearch, setBoolSearch }) {

    const recomList = ['소형견', '중형견', '대형견'];
    const ageList = ['유아기', '청년기', '노년기'];
    const cookList = ['건식', '습식', '화식', '소프트'];
    const sizeList = ['8', '10', '13'];
    const effiList = ['관절', '면역', '식욕증진', '저알러지', '영양공급', '비타민', '다이어트', '눈물자국'];

    const onChangeHandler = (e) => {

        setSearchCriteria({
            ...searchCriteria,
            [e.target.name]: e.target.value
        });
    };

    const onClickHandler = () => {

        setSearchCriteria({
            ...searchCriteria,
            prodPrice: maxPrice ?? 0,
            prodAge: '',
            prodEffi: '',
            prodRecom: '',
            prodCook: '',
            prodSize: ''
        });
    };

    const onSubmitHandler = e => {

        e.preventDefault();
        setBoolSearch(!boolSearch);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.welcomeBox}>
                    <div className={styles.textBox}>
                        <p>반려견에게 맞는 사료를 찾아보세요</p>
                        <span>다양한 조건의 사료를 검색하세요</span>
                    </div>
                    <img
                        src='/images/product/Dog.png'
                        alt='강아지'
                    />
                </div>
                <div className={styles.wrapBox}>
                    <form
                        className={styles.searchBox}
                        onSubmit={onSubmitHandler}
                    >
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
                            <form
                                className={styles.filterContents}
                                onSubmit={onSubmitHandler}
                            >
                                <p className={styles.subtitle}>크기</p>
                                <hr />
                                <div className={styles.selectWrapBox}>
                                    {recomList.map((recom, index) => (
                                        <div key={index}>
                                            <label
                                                htmlFor={recom}
                                                className={searchCriteria.prodRecom === recom ? styles.selected : styles.selectable}
                                            >
                                                {recom}
                                            </label>
                                            <input
                                                type='radio'
                                                id={recom}
                                                name='prodRecom'
                                                value={recom}
                                                onChange={onChangeHandler}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <p className={styles.subtitle}>나이</p>
                                <hr />
                                <div className={styles.selectWrapBox}>
                                    {ageList.map((age, index) => (
                                        <div key={index}>
                                            <label
                                                htmlFor={age}
                                                className={searchCriteria.prodAge === age ? styles.selected : styles.selectable}
                                            >
                                                {age}
                                            </label>
                                            <input
                                                type='radio'
                                                id={age}
                                                name='prodAge'
                                                value={age}
                                                onChange={onChangeHandler}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <p className={styles.subtitle}>조리방식</p>
                                <hr />
                                <div className={styles.selectWrapBox}>
                                    {cookList.map((cook, index) => (
                                        <div key={index}>
                                            <label
                                                htmlFor={cook}
                                                className={searchCriteria.prodCook === cook ? styles.selected : styles.selectable}
                                            >
                                                {cook}
                                            </label>
                                            <input
                                                type='radio'
                                                id={cook}
                                                name='prodCook'
                                                value={cook}
                                                onChange={onChangeHandler}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <p className={styles.subtitle}>입자크기</p>
                                <hr />
                                <div className={styles.selectWrapBox}>
                                    {sizeList.map((size, index) => (
                                        <div key={index}>
                                            <label
                                                htmlFor={size}
                                                className={searchCriteria.prodSize === size ? styles.selected : styles.selectable}
                                            >
                                                ~{size}mm
                                            </label>
                                            <input
                                                type='radio'
                                                id={size}
                                                name='prodSize'
                                                value={size}
                                                onChange={onChangeHandler}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <p className={styles.subtitle}>제품기능</p>
                                <hr />
                                <div className={styles.selectWrapBox}>
                                    {effiList.map((effi, index) => (
                                        <div key={index}>
                                            <label
                                                htmlFor={effi}
                                                className={searchCriteria.prodEffi === effi ? styles.selected : styles.selectable}
                                            >
                                                {effi}
                                            </label>
                                            <input
                                                type='radio'
                                                id={effi}
                                                name='prodEffi'
                                                value={effi}
                                                onChange={onChangeHandler}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {/* <p className={styles.subtitle}>최대 금액 ({searchCriteria.prodPrice}원)</p>
                                <hr />
                                <div className={styles.selectWrapBox}>
                                    <input
                                        type='range'
                                        name='prodPrice'
                                        min={0}
                                        max={maxPrice}
                                        value={searchCriteria.prodPrice}
                                        onChange={onChangeHandler}
                                    />
                                </div> */}
                                <div className={styles.buttonBox}>
                                    <div
                                        className={`${styles.button} ${styles.cancel}`}
                                        onClick={onClickHandler}
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