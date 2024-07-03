import { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { DeleteAPI } from "../../../api/RestAPIs";

import SelectAllProducts from "../../../components/admin/products/SelectAllProducts";

import ConfirmModal from "../../../components/admin/adminCommon/ConfirmModal";

import styles from "../AdminPages.module.css";

function AdminSelectAllProducts() {

    const [search, setSearch] = useState({
        type: 'prodName',
        input: ''
    });
    const [bool, setBool] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [product, setProduct] = useState({});

    const modalBackground = useRef();

    const navigate = useNavigate();

    const input = document.getElementById('typeInput');

    const valueChangeHandler = e => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        });
    };

    const searchSubmitHandler = () => {
        input.value = '';
        setBool(!bool);
    };

    const deleteHandler = async () => {

        const address = `/products/${product.prodCode}`;

        await DeleteAPI(address);

        setBool(!bool);
        setModalOpen(false);
    };

    return (
        <div>
            <p className={styles.subTitle}>사료 정보 관리</p>
            <div className={styles.mainOuter}>
                <div className={styles.mainBox}>
                    <div>
                        <p className={styles.subjectTitle}>등록된 사료 목록</p>
                        <div style={{ float: "right", }}>
                            <select
                                name="type"
                                style={{ width: "100px", height: "34px", }}
                                onChange={valueChangeHandler}
                            >
                                <option value={'prodName'}>
                                    제품명
                                </option>
                                <option value={'prodManufac'}>
                                    제조사
                                </option>
                            </select>
                            <input
                                id="typeInput"
                                name="input"
                                style={{ width: "150px", height: "30px", }}
                                onChange={valueChangeHandler}
                                onKeyDown={(e) => {
                                    if (e.keyCode === 13) {
                                        searchSubmitHandler();
                                    }
                                }}
                            />
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "10px", }}
                                onClick={searchSubmitHandler}
                            >
                                검색
                            </button>
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "15px", }}
                                onClick={() => {
                                    navigate("/admin/insertproduct");
                                }}
                            >
                                새 상품 등록
                            </button>
                        </div>
                    </div>
                    <div style={{ clear: "both", }}>
                        <div className={styles.productList}>
                            <SelectAllProducts
                                search={search}
                                bool={bool}
                                setModalOpen={setModalOpen}
                                setProduct={setProduct}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmModal
                message={`${product.prodCode}번 사료(${product.prodName})을(를) 삭제 하시겠습니까?`}
                onClickHandler={deleteHandler}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                modalBackground={modalBackground}
            />
        </div>
    );
}

export default AdminSelectAllProducts;