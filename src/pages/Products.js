import { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom'

import ProductList from '../components/products/ProductList';
import Product from '../components/products/Product';

function Products() {

    const [prodCode, setProdCode] = useState(0);

    const { state } = useLocation();

    useEffect(() => {

        if (state?.prodCode) {

            setProdCode(state.prodCode);
        };
    }, [state]);

    return prodCode === 0 ? (
        <>
            <ProductList />
        </>
    ) : (
        <>
            <Product
                prodCode={prodCode}
                setProdCode={setProdCode}
            />
        </>
    );
}

export default Products;