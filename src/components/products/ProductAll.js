import { useState, useEffect } from 'react';

import { GetAPIwoToken, PostAPIwoToken } from '../../api/RestAPIs';

import ProductCard from './ProductCard';
import PageButton from '../common/PageButton';

import styles from './ProductAll.module.css';

function ProductAll({ searchCriteria, setSearchCriteria, boolSearch }) {

    const [products, setProducts] = useState([]);
    const [sliceProducts, setSliceProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [boolSort, setBoolSort] = useState(false);
    const [emptyProducts, setEmptyProducts] = useState(false);

    useEffect(() => {

        window.scrollTo(0, 0);

        document.getElementById('priceSort').value = 'select';

        const fetch = async () => {

            const response = await GetAPIwoToken('/products');

            return response.products;
        };

        fetch()
            .then(res => setProducts(res));
    }, []);

    useEffect(() => {

        window.scrollTo(0, 0);
        setEmptyProducts(false);

        if (products.length == 0) {

            setEmptyProducts(true);
        } else {

            setSliceProducts(products.slice(16 * (page - 1), 16 * page));
        };
    }, [products, page, boolSort]);

    useEffect(() => {

        const fetch = async () => {

            const response = await PostAPIwoToken('/products/search', searchCriteria);

            return response;
        };

        fetch()
            .then(res => res.json())
            .then(res => setProducts(res.products));

        setPage(1);
        setSearchCriteria({
            type: 'prodName',
            input: '',
            prodPrice: '',
            prodAge: '',
            prodEffi: '',
            prodRecom: '',
            prodCook: '',
            prodSize: ''
        });
    }, [boolSearch]);

    const onChangeHandler = e => {

        let sortedProducts = products;

        if (e.target.value === 'priceDesc') {

            sortedProducts.sort((a, b) => b.prodPrice - a.prodPrice);
        } else if (e.target.value === 'priceAsc') {

            sortedProducts.sort((a, b) => a.prodPrice - b.prodPrice);
        };

        setProducts(sortedProducts);
        setPage(1);
        setBoolSort(!boolSort);
    };

    return emptyProducts ? (
        <>
            <div className={styles.container}>
                <div className={styles.errorBox}>
                    <img
                        src='/images/product/EmptyDogBowl.png'
                        alt='빈 사료그릇'
                    />
                    <p>검색된 사료가 없습니다</p>
                </div>
            </div>
        </>
    ) : (
        <div className={styles.container}>
            <div className={styles.sortBox}>
                <label htmlFor='priceSort'>정렬 기준</label>
                <select
                    id='priceSort'
                    defaultValue='select'
                    onChange={onChangeHandler}
                >
                    <option
                        value='select'
                        disabled
                    >
                        선택
                    </option>
                    <option
                        value='priceDesc'
                    >
                        가격 높은순
                    </option>
                    <option
                        value='priceAsc'
                    >
                        가격 낮은순
                    </option>
                </select>
            </div>
            <div className={styles.productsBox}>
                {sliceProducts
                    .map(product => (
                        <ProductCard
                            key={product.prodCode}
                            product={product}
                        />
                    ))
                }
            </div>
            <PageButton
                page={page}
                setPage={setPage}
                maxPage={Math.ceil(products?.length / 16)}
            />
        </div>
    );
}

export default ProductAll;