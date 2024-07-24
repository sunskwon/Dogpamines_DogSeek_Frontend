import { useState, useEffect } from 'react';

import ProductRecommended from './ProductRecommended';
import ProductSearch from './ProductSearch';
import ProductAll from './ProductAll';

import styles from './ProductList.module.css';

function ProductList() {

    const [searchCriteria, setSearchCriteria] = useState({
        type: 'prodName',
        input: '',
        prodPrice: '',
        prodAge: '',
        prodEffi: '',
        prodRecom: '',
        prodCook: '',
        prodSize: ''
    });
    const [boolSearch, setBoolSearch] = useState(false);

    useEffect(() => {

        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <ProductRecommended />
            <hr style={{ width: "1100px", }} />
            <ProductSearch
                searchCriteria={searchCriteria}
                setSearchCriteria={setSearchCriteria}
                boolSearch={boolSearch}
                setBoolSearch={setBoolSearch}
            />
            <ProductAll
                searchCriteria={searchCriteria}
                setSearchCriteria={setSearchCriteria}
                boolSearch={boolSearch}
            />
        </>
    );
}

export default ProductList;