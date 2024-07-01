import { useState, useRef } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { PutAPI } from "../../../api/RestAPIs";

import UpdateProduct from "../../../components/admin/products/UpdateProduct";

import AlertModal from "../../../components/admin/adminCommon/AlertModal";

import styles from "../AdminPages.module.css";

function AdminUpdateProduct() {

    const [product, setProduct] = useState(
        {
            prodImage: '/images/admin/No Image Available.png',
            prodCode: 0,
            prodName: '',
            prodManufac: '',
            prodSite: '',
            prodDate: '2000-01-01',
            prodVisit: 0,
            prodStatus: '',
            prodPrice: 0,
            prodVolume: '',
            prodGrade: 0,
            prodSize: '',
            prodCook: '',
            prodRecom: '',
            prodAge: '',
            prodEffi: '',
            prodIngra: '',
        }
    );
    const [message, setMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const modalBackground = useRef();

    const { state } = useLocation();

    const navigate = useNavigate();

    const submitHandler = async () => {

        if (Object.is(Number(product.prodVolume), NaN)) {
            setMessage('사료 용량은 숫자로 입력해야 합니다');
            setModalOpen(true);
        } else {

            const address = '/products';

            const response = await PutAPI(address, product);

            navigate("/admin/productdetail", {
                state: { Location: response.headers.get('Location') }
            });
        }
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
                                변경
                            </button>
                        </div>
                        <AlertModal
                            message={message}
                            modalOpen={modalOpen}
                            setModalOpen={setModalOpen}
                            modalBackground={modalBackground}
                        />
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