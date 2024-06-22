import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { PostAPI } from "../../../api/RestAPIs";

import InsertProduct from "../../../components/admin/products/InsertProduct";

import styles from "../AdminPages.module.css";

function AdminInsertProduct() {

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

        const address = '/products';

        const response = await PostAPI(address, product);

        navigate("/admin/productdetail", {
            state: { Location: response.headers.get('Location') }
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
                                style={{ marginRight: "10px", }}
                                onClick={submitHandler}
                            >
                                등록
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