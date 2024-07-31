import { useState, useEffect } from 'react';

import ProductRecommended from './productlist/ProductRecommended';
import ProductSearch from './productlist/ProductSearch';
import ProductAll from './productlist/ProductAll';

function ProductList() {

    // const [maxPrice, setMaxPrice] = useState(0);
    const [searchCriteria, setSearchCriteria] = useState({
        type: 'prodName',
        input: '',
        prodPrice: 0,
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
                // maxPrice={maxPrice}
                // setMaxPrice={setMaxPrice}
                searchCriteria={searchCriteria}
                setSearchCriteria={setSearchCriteria}
                boolSearch={boolSearch}
                setBoolSearch={setBoolSearch}
            />
            <ProductAll
                // setMaxPrice={setMaxPrice}
                searchCriteria={searchCriteria}
                setSearchCriteria={setSearchCriteria}
                boolSearch={boolSearch}
            />
        </>
    );
}

export default ProductList;