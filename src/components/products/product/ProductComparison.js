import styles from './ProductComparison.module.css';

function ProductComparison({ product, comparisonProduct, modalOpen, setModalOpen }) {

    const formatPrice = (price) => {

        return new Intl.NumberFormat('ko-KR').format(price);
    };

    const onClickHandler = () => {

        setModalOpen(false);
    };

    return modalOpen ? (
        <>
            <div className={styles.modalContainer}>
                <div className={styles.modalContent}>
                    <div className={styles.titleBox}>
                        <img
                            src='/images/common/Back.png'
                            alt='뒤로'
                            onClick={onClickHandler}
                        />
                        <p style={{ color: "#63c54a", }}>DogSeek</p>
                        <p>&nbsp;Comparison</p>
                    </div>
                    <div className={styles.contentBox}>
                        <div className={styles.content}>
                            <img
                                src={product.prodImage}
                                alt={product.prodName}
                            />
                            <img
                                src={comparisonProduct.prodImage}
                                alt={comparisonProduct.prodName}
                            />
                        </div>
                        <p>제조사</p>
                        <hr />
                        <div className={styles.content}>
                            <div className={styles.textWrap}>
                                <span>{product.prodManufac}</span>
                            </div>
                            <div className={styles.textWrap}>
                                <span>{comparisonProduct.prodManufac}</span>
                            </div>
                        </div>
                        <p>상품명</p>
                        <hr />
                        <div className={styles.content}>
                            <div className={styles.textWrap}>
                                <span>{product.prodName}</span>
                            </div>
                            <div className={styles.textWrap}>
                                <span>{comparisonProduct.prodName}</span>
                            </div>
                        </div>
                        <p>가격</p>
                        <hr />
                        <div className={styles.content}>
                            <div className={styles.textWrap}>
                                <span>{formatPrice(product.prodPrice)}원</span>
                            </div>
                            <div className={styles.textWrap}>
                                <span>{formatPrice(comparisonProduct.prodPrice)}원</span>
                            </div>
                        </div>
                        <p>추천 견종</p>
                        <hr />
                        <div className={styles.content}>
                            <div className={styles.textWrap}>
                                <span>{product.prodRecom}</span>
                            </div>
                            <div className={styles.textWrap}>
                                <span>{comparisonProduct.prodRecom}</span>
                            </div>
                        </div>
                        <p>조리 방식</p>
                        <hr />
                        <div className={styles.content}>
                            <div className={styles.textWrap}>
                                <span>{product.prodCook}</span>
                            </div>
                            <div className={styles.textWrap}>
                                <span>{comparisonProduct.prodCook}</span>
                            </div>
                        </div>
                        <p>입자 크기</p>
                        <hr />
                        <div className={styles.content}>
                            <div className={styles.textWrap}>
                                <span>{product.prodSize}mm</span>
                            </div>
                            <div className={styles.textWrap}>
                                <span>{comparisonProduct.prodSize}mm</span>
                            </div>
                        </div>
                        <p>제품 기능</p>
                        <hr />
                        <div className={styles.content}>
                            <div className={styles.textWrap}>
                                <span>{product.prodEffi}</span>
                            </div>
                            <div className={styles.textWrap}>
                                <span>{comparisonProduct.prodEffi}</span>
                            </div>
                        </div>
                        <p>재료</p>
                        <hr />
                        <div className={styles.content}>
                            <div className={styles.textWrap}>
                                <span>{product.prodIngra}</span>
                            </div>
                            <div className={styles.textWrap}>
                                <span>{comparisonProduct.prodIngra}</span>
                            </div>
                        </div>
                        <p>사이트</p>
                        <hr />
                        <div className={styles.content}>
                            <div
                                className={styles.textWrap}
                                onClick={() => window.open(product.prodSite)}
                            >
                                <p>{product.prodSite}</p>
                            </div>
                            <div
                                className={styles.textWrap}
                                onClick={() => window.open(comparisonProduct.prodSite)}
                            >
                                <p>{comparisonProduct.prodSite}</p>
                            </div>
                        </div>
                        <div className={styles.buttonBox}>
                            <div
                                className={styles.button}
                                onClick={onClickHandler}
                            >
                                <p>닫기</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : (
        <>
        </>
    );
}

export default ProductComparison;