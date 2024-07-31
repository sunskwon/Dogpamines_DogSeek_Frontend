import styles from './ProductSimilarCard.module.css';

function ProductSimilarCard({ similarProduct, setComparisonProduct, setModalOpen }) {

    const formatPrice = (price) => {

        return new Intl.NumberFormat('ko-KR').format(price);
    };

    const onClickHandler = () => {

        setComparisonProduct(similarProduct);
        setModalOpen(true);
    }

    return (
        <>
            <div className={styles.container}>
                <img
                    src={similarProduct.prodImage}
                    alt={similarProduct.prodName}
                />
                <div className={styles.contentBox}>
                    <div className={styles.textWrap}>
                        <p>제조사</p>
                        <span>{similarProduct.prodManufac}</span>
                    </div>
                    <div className={styles.textWrap}>
                        <p>상품명</p>
                        <span>{similarProduct.prodName}</span>
                    </div>
                    <div className={styles.textWrap}>
                        <p>가격</p>
                        <span>{formatPrice(similarProduct.prodPrice)}원</span>
                    </div>
                </div>
                <div
                    className={styles.button}
                    onClick={onClickHandler}
                >
                    <p>비교하기</p>
                </div>
            </div>
        </>
    );
}

export default ProductSimilarCard;