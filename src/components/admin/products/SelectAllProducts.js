import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { GetAPI } from "../../../api/RestAPIs"

import styles from "./AdminProducts.module.css";

function SelectAllProducts({ search, bool, setModalOpen, setProduct }) {

    const [products, setProducts] = useState(
        [
            {
                prodCode: 0
            }
        ]
    );

    const navigate = useNavigate();

    const call = async () => {

        const address = '/products';

        const response = await GetAPI(address);

        const result = await response.products;

        return result;
    };

    const searchProd = async () => {

        const address = `/products/prodsearch?type=${search.type}&input=${search.input}`;

        const response = await GetAPI(address);

        const result = await response.products;

        return result;
    };

    useEffect(() => {
        call().then(res => setProducts(res));
    }, []);

    useEffect(() => {
        searchProd().then(res => setProducts(res));
    }, [bool]);

    return (
        <>
            {products.length === 0 &&
                <div className={styles.errorBox}>
                    <div>
                        <img
                            src="/images/admin/Nothing Found.png"
                            alt="슬픈 돋보기 아이콘"
                        />
                        <p>적합한 사료가 없습니다</p>
                        <p>다시 시도해주세요</p>
                    </div>
                </div>
            }
            {products.length > 0 &&
                <table className={styles.productListTable}>
                    <tbody>
                        <tr>
                            <th>사료코드</th>
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
            }
        </>
    );
}

export default SelectAllProducts;