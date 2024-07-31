import React, { useState, useEffect } from 'react';

import { GetAPIWCookie, GetAPIwoToken } from "../../api/RestAPIs";

import ProductDetail from "./product/ProductDetail";
import ProductCallAPI from './product/ProductCallAPI';
import ProductSimilar from './product/ProductSimilar';
import ProductComparison from './product/ProductComparison';

import styles from './Product.module.css';

function Product({ prodCode, setProdCode }) {

    const [product, setProduct] = useState({});
    const [differentVolumeProducts, setDifferentVolumeProducts] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [comparisonProduct, setComparisonProduct] = useState({});
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {

        const fetch = async () => {

            const response = await GetAPIWCookie(`/products/${prodCode}`);

            return response.product;
        };

        window.scrollTo(0, 0);

        fetch()
            .then(res => setProduct(res));
    }, [prodCode]);

    const fetch = async (address) => {

        return await GetAPIwoToken(address);
    };

    useEffect(() => {

        fetch(`/products/volume?prodName=${product.prodName}`)
            .then(res => setDifferentVolumeProducts(res.product));
    }, [product.prodName]);

    useEffect(() => {

        const ingra = product.prodIngra?.split(',')[0];
        const disease = product.prodEffi?.split(',')[0];

        fetch(`/curation?curationAge=${product.prodAge}&curationIngra=${ingra}&curationDisease=${disease}&curationAllergy=&curationCook=${product.prodCook}&curationSize=${product.prodSize}`)
            .then(res => res.curationProducts.filter(prod => prod.prodCode !== product.prodCode))
            .then(res => setSimilarProducts(res));
    }, [product]);

    const onClickHandler = () => {

        setProdCode(0);
    };

    if (modalOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    };

    return (
        <>
            <div className={styles.container}>
                <ProductDetail
                    setProdCode={setProdCode}
                    product={product}
                    differentVolumeProducts={differentVolumeProducts}
                />
                <ProductCallAPI
                    name={product.prodName}
                />
                <ProductSimilar
                    similarProducts={similarProducts}
                    setComparisonProduct={setComparisonProduct}
                    setModalOpen={setModalOpen}
                />
                <ProductComparison
                    product={product}
                    comparisonProduct={comparisonProduct}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                />
                <div
                    className={styles.button}
                    onClick={onClickHandler}
                >
                    <p>돌아가기</p>
                </div>
            </div>
        </>
    );
}

export default Product;