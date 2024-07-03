import { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { PostAPI } from "../../../api/RestAPIs";

import InsertProduct from "../../../components/admin/products/InsertProduct";

import AlertModal from "../../../components/admin/adminCommon/AlertModal";

import styles from "../AdminPages.module.css";

function AdminInsertProduct() {

    const [product, setProduct] = useState({
        prodImage: '/images/admin/No Image Available.png',
        prodCode: 0,
        prodName: '',
        prodManufac: '',
        prodSite: '',
        prodPrice: 0,
        prodVolume: '',
        prodGrade: 0,
        prodSize: '',
        prodCook: '건식',
        prodRecom: '전체',
        prodAge: '전체',
        prodEffi: '',
        prodIngra: '',
    });
    const [message, setMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const modalBackground = useRef();

    const navigate = useNavigate();

    const submitHandler = async () => {

        if (product.prodName === '') {
            setMessage('사료의 제품명을 입력해야 합니다');
            setModalOpen(true);
        } else if (product.prodManufac === '') {
            setMessage('사료의 제조사를 입력해야 합니다');
            setModalOpen(true);
        } else if (product.prodSite === '') {
            setMessage('사료의 사이트 주소를 입력해야 합니다');
            setModalOpen(true);
        } else if (product.prodPrice === 0) {
            setMessage('사료의 가격을 입력해야 합니다');
            setModalOpen(true);
        } else if (product.prodVolume === '') {
            setMessage('사료 용량을 입력해야 합니다');
            setModalOpen(true);
        } else if (Object.is(Number(product.prodVolume), NaN)) {
            setMessage('사료 용량은 숫자로 입력해야 합니다');
            setModalOpen(true);
        } else if (product.prodSize === '') {
            setMessage('사료 크기를 입력해야 합니다');
            setModalOpen(true);
        } else {
            const address = '/products';

            const response = await PostAPI(address, product);

            navigate("/admin/productdetail", {
                state: { Location: response.headers.get('Location') }
            })
        };
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
                                className={styles.cancelButton}
                                style={{ marginRight: "10px", }}
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                돌아가기
                            </button>
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "15px", }}
                                onClick={submitHandler}
                            >
                                등록
                            </button>
                        </div>
                        <AlertModal
                            message={message}
                            modalOpen={modalOpen}
                            setModalOpen={setModalOpen}
                            modalBackground={modalBackground}
                        />
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