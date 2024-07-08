import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { GetAPI } from "../../../api/RestAPIs"

import Loading from "../adminCommon/Loading";

import styles from "./AdminProducts.module.css";

function SelectAllProducts({ search, bool, setModalOpen, setProduct }) {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [boolLoading, setBoolLoading] = useState(false);

    const navigate = useNavigate();

    const call = async () => {

        const address = '/products';

        setBoolLoading(true);

        try {

            const response = await GetAPI(address);

            if (response.error) {

                setError(response.error);
                setBoolLoading(false);

                return [];
            }

            const result = await response.products;

            return result;
        } catch (error) {

            setError(error);
            setBoolLoading(false);

            return [];
        } finally {

            setBoolLoading(false);
        }
    };

    const searchProd = async () => {

        const address = `/products/prodsearch?type=${search.type}&input=${search.input}`;

        setBoolLoading(true);

        try {

            const response = await GetAPI(address);

            if (response.error) {

                setError(response.error);
                setBoolLoading(false);

                return [];
            }

            const result = await response.products;

            return result;
        } catch (error) {

            setError(error);
            setBoolLoading(false);

            return [];
        } finally {

            setBoolLoading(false);
        }
    };

    useEffect(() => {
        call().then(res => setProducts(res));
    }, []);

    useEffect(() => {
        searchProd().then(res => setProducts(res));
    }, [bool]);

    if (error) {
        throw error;
    }

    return boolLoading ? (<Loading />) : (
        products?.length > 0 ? (
            <>
                <table className={styles.productListTable}>
                    <tbody>
                        <tr>
                            <th>사료 No.</th>
                            <th>제품명</th>
                            <th>제조사</th>
                            <th>조회수</th>
                            <th>사이트 주소</th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <td colSpan={7}>
                                <hr className={styles.tableLine} />
                            </td>
                        </tr>
                        {products.map(product => (
                            <tr key={product.prodCode}>
                                <td style={{ width: "80px", }}>
                                    {product.prodCode}
                                </td>
                                <td>
                                    <div
                                        className={styles.ellipsisBox}
                                        style={{ width: "200px", }}
                                    >
                                        {product.prodName}
                                    </div>
                                </td>
                                <td>
                                    <div
                                        className={styles.ellipsisBox}
                                        style={{ width: "100px", }}
                                    >
                                        {product.prodManufac}
                                    </div>
                                </td>
                                <td>
                                    <div
                                        className={styles.ellipsisBox}
                                        style={{ width: "80px", }}
                                    >
                                        {product.prodVisit}
                                    </div>
                                </td>
                                <td>
                                    <div
                                        className={styles.ellipsisBox}
                                        style={{ width: "200px", }}
                                    >
                                        <a href={product.prodSite}>{product.prodSite}</a>
                                    </div>
                                </td>
                                <td>
                                    <button
                                        className={styles.acceptButton}
                                        onClick={() => {
                                            navigate("/admin/productdetail", {
                                                state: { Location: `/products/${product.prodCode}` }
                                            });
                                        }}
                                    >
                                        상세
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className={styles.cancelButton}
                                        onClick={() => {

                                            setModalOpen(true);
                                            setProduct(product);
                                        }}
                                    >
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        ) : (
            <>
                <div className={styles.errorBox}>
                    <div>
                        <img
                            src="/images/admin/NothingFound.png"
                            alt="슬픈 돋보기 아이콘"
                        />
                        <p>조건에 맞는 사료가 없습니다</p>
                        <p>다시 시도해주세요</p>
                    </div>
                </div>
            </>
        )
    )
};

export default SelectAllProducts;