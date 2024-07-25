import { useNavigate } from 'react-router-dom';

import styles from './ProductCard.module.css';

function ProductCard({ product }) {

    const navigate = useNavigate();

    const priceFormat = (price) => {

        return new Intl.NumberFormat('ko-KR').format(price);
    };

    const onClickHandler = () => {

        navigate('/products', {
            state: { prodCode: product.prodCode }
        });
    };

    return (
        <>
            <div className={styles.container}>
                <div
                    className={styles.cardBox}
                    onClick={onClickHandler}
                >
                    <div className={styles.imageBox}>
                        <img
                            src={product.prodImage}
                            alt={product.prodName}
                        />
                        <div className={styles.imageHoverBox}>
                            <p>
                                클릭하면
                                <br />
                                상세페이지로
                                <br />
                                이동합니다
                            </p>
                        </div>
                    </div>
                    <div className={styles.textBox}>
                        <div className={styles.textWrap}>
                            <p>제조사</p>
                            <span>{product.prodManufac}</span>
                        </div>
                        <div className={styles.textWrap}>
                            <p>제품명</p>
                            <span>{product.prodName}</span>
                        </div>
                        <div className={styles.textWrap}>
                            <p>출고가</p>
                            <span>{priceFormat(product.prodPrice)}원</span>
                        </div>
                        <div className={styles.textWrap}>
                            <p>주요 기능</p>
                            <span>{product.prodEffi}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductCard;