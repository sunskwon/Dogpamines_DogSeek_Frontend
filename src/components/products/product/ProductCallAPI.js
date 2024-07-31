import { useState, useEffect } from 'react';

import { CallShopAPI } from '../../../api/RestAPIs';

import ProductSearchedCard from './ProductSearchedCard';

import styles from './ProductCallAPI.module.css';

function ProductCallAPI({ name }) {

    const [searchedProducts, setSearchedProducts] = useState([]);

    useEffect(() => {

        CallShopAPI(name)
            .then(res => setSearchedProducts(res));
    }, [name]);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.warningBox}>
                    <div style={{ display: "flex", }}>
                        <p style={{ color: "#63c54a", }}>DogSeek</p>
                        <p>은 통신판매중개자이며, 통신판매의 당사자가 아닙니다</p>
                    </div>
                    <p>상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있습니다</p>
                </div>
                <div className={styles.titleBox}>
                    <p style={{ color: "#63c54a", }}>DogSeek</p>
                    <p>이 '더' 찾아드려요</p>
                </div>
                <div className={styles.searchedBox}>
                    {searchedProducts.map((searched, index) => (
                        <ProductSearchedCard
                            key={index}
                            searched={searched}
                        />
                    ))}
                </div>
            </div >
        </>
    );
}

export default ProductCallAPI;