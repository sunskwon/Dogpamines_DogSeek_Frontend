import { useState } from "react";

import { useNavigate } from "react-router-dom";

import InsertProduct from "../../../components/admin/products/InsertProduct";

import styles from "../AdminPages.module.css";

function AdminInsertProduct() {

    const baseUrl = 'http://localhost:8080';

    const [product, setProduct] = useState({
        prodCode: 0,
        prodName: '',
        prodPrice: 0,
        prodAge: '전체',
        prodEffi: '',
        prodRecom: '전체',
        prodSite: '',
        prodCook: '건식',
        prodVolume: '',
        prodGrade: 0,
        prodIngra: '',
        prodSize: '',
        prodImage: '/images/admin/No Image Available.png',
    });

    const navigate = useNavigate();

    const submitHandler = async () => {

        const url = `${baseUrl}/products`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Cross-Access-Allow-Origin': '*',
            },
            body: JSON.stringify(product),
        });

        console.log(response.headers.get('Location'));

        navigate("/admin/productdetail", {
            state: { Location: response.headers.get('Location')}
        })
    };

    return (
        <div>
            <p className={styles.subTitle}>사료 정보 관리</p>
            <div className={styles.mainOuter}>
                <div className={styles.mainBox}>
                    <div>
                        <p className={styles.subjectTitle}>신규 사료 등록</p>
                        <div style={{ float: "right", }}>
                            <button
                                className={styles.submitButton}
                                style={{ width: "100px", height: "30px", marginTop: "11px", marginRight: "15px", }}
                                onClick={submitHandler}
                            >
                                등록
                            </button>
                        </div>
                    </div>
                    <div className={styles.productDetail}>
                        <InsertProduct 
                            product={product}
                            setProduct={setProduct}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminInsertProduct;