import { useState } from 'react';

import ProductRecommended from './ProductRecommended';
import ProductSearch from './ProductSearch';

import styles from './ProductList.module.css';

function ProductList() {

    const [searchCriteria, setSearchCriteria] = useState({
        type: 'prodName',
        input: ''
    })

    return (
        <>
            <ProductRecommended />
            <ProductSearch
                searchCriteria={searchCriteria}
                setSearchCriteria={setSearchCriteria}
            />
        </>
    );
}

export default ProductList;