import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { PutAPI } from "../../../api/RestAPIs";

import UpdateProduct from "../../../components/admin/products/UpdateProduct";

import styles from "../AdminPages.module.css";

function AdminUpdateProduct() {

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

        const address = '/products';

        const response = await PutAPI(address, product);
        
        navigate("/admin/productdetail", {
            state: {Location: response.headers.get('Location')}
        });
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
                                style={{ marginRight: "10px", }}
                                onClick={submitHandler}
                            >
                                수정
                            </button>
                            <button
                                className={styles.cancelButton}
                                style={{ marginRight: "15px", }}
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                돌아가기
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