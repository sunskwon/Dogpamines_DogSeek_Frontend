import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import styles from "../AdminPages.module.css";
import UpdateProduct from "../../../components/admin/products/UpdateProduct";

function AdminUpdateProduct() {

    const baseUrl = 'http://localhost:8080';

    const [product, setProduct] = useState(
        {
            prodCode: 0,
            prodName: '',
            prodPrice: 0,
            prodAge: '',
            prodEffi: '',
            prodRecom: '',
            prodSite: '',
            prodCook: '',
            prodVolume: '',
            prodGrade: 0,
            prodIngra: '',
            prodSize: '',
            prodDate: '2000-01-01',
            prodImage: '/images/admin/No Image Available.png',
        }
    );

    const { state } = useLocation();

    const navigate = useNavigate();

    const submitHandler = async () => {

        const url = `${baseUrl}/products`;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
            },
            body: JSON.stringify(product),
        });

        console.log(response);
        console.log(response.headers);
        console.log(response.headers.get('Location'));
    };

    return (
        <div>
            <p className={styles.subTitle}>사료 정보 관리</p>
            <div className={styles.mainOuter}>
                <div className={styles.mainBox}>
                    <div>
                        <p className={styles.subjectTitle}>사료 정보 수정</p>
                        <div style={{ float: "right", }}>
                            <button
                                className={styles.submitButton}
                                style={{ width: "100px", height: "30px", marginTop: "11px", marginRight: "15px", }}
                                onClick={submitHandler}
                            >
                                수정
                            </button>
                        </div>
                        <div className={styles.productDetail}>
                            <UpdateProduct
                                Location={state.Location}
                                product={product}
                                setProduct={setProduct}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminUpdateProduct;