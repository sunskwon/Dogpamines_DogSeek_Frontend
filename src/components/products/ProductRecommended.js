import MostProducts from './MostProducts';

import styles from './ProductRecommended.module.css';

function ProductRecommended() {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.titleBox}>
                    <span style={{ color: "#63C54A" }}>DogSeek</span>
                    <span>Recommendation</span>
                </div>
                <MostProducts />
            </div>
        </>
    );
}

export default ProductRecommended;