import { useState } from "react";

import styles from "./AdminProducts.module.css";

function InsertProduct() {

    const baseUrl = 'http://localhost:8080';
    
    const [product, setProduct] = useState({
        prodCode: 0,
        prodName: '',
        prodPrice: 0,
        prodAge: '전체',
        prodEffi: '',
        prodRecom: '전체',
        prodSite: '',
        prodCook: '',
        prodGrade: 0,
        prodIngra: '',
        prodSize: '',
        prodImage: '',
    });

    const valueChangeHandler = e => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const submitHandler = async () => {

        const url = `${baseUrl}/products`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Cross-Access-Allow-Origin': '*',
            }
        });
    };

    return (
        <div>
            <h1>insert product</h1>
        </div>
    );
}

export default InsertProduct;