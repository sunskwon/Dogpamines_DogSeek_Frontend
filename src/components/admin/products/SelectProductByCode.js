import { useState, useEffect } from "react";

import styles from "./AdminProducts.module.css"

function SelectProductByCode({ prodCode }) {

    const baseUrl = 'http://localhost:8080';

    const [product, setProduct] = useState();

    const call = async () => {

        const url = `${baseUrl}/products/${prodCode}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Control-Allow-Origin': '*',
            },
        }).then(res => res.json());

        const result = await response.product;

        return result;
    };

    useEffect(() => {
        call().then(res => setProduct(res));
    }, []);

    return (
        <div
            style={{ width: "100px", height: "100px", backgroundColor: "red", }}
        >

        </div>
    );
}

export default SelectProductByCode;