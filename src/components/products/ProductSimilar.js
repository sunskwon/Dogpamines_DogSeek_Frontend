import ProductSimilarCard from './ProductSimilarCard';

import styles from './ProductSimilar.module.css';

function ProductSimilar({ similarProducts, setComparisonProduct, setModalOpen }) {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.titleBox}>
                    <p style={{ color: "#63c54a", }}>DogSeek</p>
                    <p>이 비교해드려요</p>
                </div>
                {similarProducts.length === 0 ? (
                    <>
                        <div className={styles.emptyBox}>
                            <img
                                src="/images/product/EmptyDogBowl.png"
                                alt='사료가 존재하지 않습니다'
                            />
                            <p>비교할 사료가 존재하지 않습니다</p>
                            <p>빠른 시일 내에 더 많은 사료로 찾아 뵙겠습니다</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.productsBox}>
                            {similarProducts.map(similarProduct => (
                                <ProductSimilarCard
                                    key={similarProduct.prodCode}
                                    similarProduct={similarProduct}
                                    setComparisonProduct={setComparisonProduct}
                                    setModalOpen={setModalOpen}
                                />
                            ))}
                        </div>
                    </>
                )
                }
            </div>
        </>
    );
}

export default ProductSimilar;