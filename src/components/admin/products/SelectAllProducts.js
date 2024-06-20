import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./AdminProducts.module.css";

function SelectAllProducts({ search, bool }) {

    const baseUrl = 'http://localhost:8080';

    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    const call = async () => {

        const url = `${baseUrl}/products`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Control-Allow-Origin': '*',
            }
        }).then(res => res.json());

        const result = await response.products;

        return result;
    };

    const searchProd = async () => {

        const url = `${baseUrl}/products/prodsearch?type=${search.type}&input=${search.input}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Control-Allow-Origin': '*',
            }
        }).then(res => res.json());

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
            {products.map(product => (
                <tr
                    key={product.prodCode}
                >
                    <td
                        style={{ width: "80px", textAlign: "center", }}
                    >
                        {product.prodCode}
                    </td>
                    <td>
                        <div
                            style={{ width: "330px", height: "30px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", }}
                        >
                            {product.prodName}
                        </div>
                    </td>
                    <td>
                        <div
                            style={{ width: "100px", height: "30px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", }}
                        >
                            {product.prodManufac}
                        </div>
                    </td>
                    <td>
                        <div
                            style={{ width: "200px", height: "30px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", }}
                        >
                            <a href={product.prodSite}
                                style={{
                                    fontSize: "14px",
                                    color: "rgba(112, 178, 222, 1)",
                                }}
                            >{product.prodSite}</a>
                        </div>
                    </td>
                    <td>
                        <button
                            className={styles.acceptButton}
                            onClick={() => {
                                navigate("/admin/productdetail", {state: {Location: `/products/${product.prodCode}`}});
                            }}
                        >
                            상세
                        </button>
                    </td>
                    <td>
                        <button className={styles.denyButton}>
                            삭제
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
}

export default SelectAllProducts;