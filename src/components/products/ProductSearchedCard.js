import styles from './ProductSearchedCard.module.css';

function ProductSearchedCard({ searched }) {

    const formatPrice = (price) => {

        return new Intl.NumberFormat('ko-KR').format(price);
    };

    const onClickHandler = () => {

        window.open(searched.link);
    };

    return (
        <>
            <div
                className={styles.container}
                onClick={onClickHandler}
            >
                <div className={styles.sellerBox}>
                    <p>판매처</p>
                    <span>{searched.mallName}</span>
                </div>
                <div className={styles.nameBox}>
                    <p>상품명</p>
                    <span>{searched.title.replace(/(<([^>]+)>)/ig, "")}</span>
                </div>
                <div className={styles.priceBox}>
                    <p>가격</p>
                    <span>{formatPrice(searched.lprice)}원</span>
                </div>
            </div>
        </>
    );
}

export default ProductSearchedCard;