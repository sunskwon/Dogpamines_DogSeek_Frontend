import styles from './ProductDetail.module.css';

function ProductDetail({ setProdCode, product, differentVolumeProducts }) {

    const priceFormat = (price) => {

        return new Intl.NumberFormat('ko-KR').format(price);
    };

    const onClickHandler = () => {

        window.open(product.prodSite);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.nameBox}>
                    <img
                        src='/images/common/Back.png'
                        alt='뒤로'
                        onClick={() => setProdCode(0)}
                    />
                    <p>{product.prodName}</p>
                </div>
                <div className={styles.infoBox}>
                    <img
                        src={product.prodImage}
                        alt={product.prodName}
                    />
                    <div className={styles.textBox}>
                        <p className={styles.manufac}>{product.prodManufac}</p>
                        <p className={styles.price}>{priceFormat(product.prodPrice)}원</p>
                        <div className={styles.textWrap}>
                            <div className={styles.titleBox}>
                                <p>용량</p>
                            </div>
                            <div className={styles.contentBox}>
                                {differentVolumeProducts.map(other => (
                                    <p
                                        key={other.prodCode}
                                        className={product.prodVolume === other.prodVolume ? styles.selected : styles.selectable}
                                        onClick={() => setProdCode(other.prodCode)}
                                    >
                                        {other.prodVolume}kg
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className={styles.textWrap}>
                            <div className={styles.titleBox}>
                                <p>제품 기능</p>
                            </div>
                            <div className={styles.contentBox}>
                                <span>{product.prodEffi}</span>
                            </div>
                        </div>
                        <div className={styles.textWrap}>
                            <div className={styles.titleBox}>
                                <p>추천 견종</p>
                            </div>
                            <div className={styles.contentBox}>
                                <span>{product.prodRecom}</span>
                            </div>
                        </div>
                        <div className={styles.textWrap}>
                            <div className={styles.titleBox}>
                                <p>조리 방식</p>
                            </div>
                            <div className={styles.contentBox}>
                                <span>{product.prodCook}</span>
                            </div>
                        </div>
                        <div className={styles.textWrap}>
                            <div className={styles.titleBox}>
                                <p>입자 크기</p>
                            </div>
                            <div className={styles.contentBox}>
                                <span>{product.prodSize}mm</span>
                            </div>
                        </div>
                        <div className={styles.textWrap}>
                            <div className={styles.titleBox}>
                                <p>재료</p>
                            </div>
                            <div className={styles.hoverWrap}>
                                <div className={styles.ellipsisBox}>
                                    <span>{product.prodIngra}</span>
                                </div>
                                <div className={styles.hoverBox}>
                                    <span>{product.prodIngra}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.textWrap}>
                            <div className={styles.titleBox}>
                                <p>사이트</p>
                            </div>
                            <div
                                className={styles.ellipsisBox}
                                onClick={onClickHandler}
                            >
                                <p>{product.prodSite}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetail;