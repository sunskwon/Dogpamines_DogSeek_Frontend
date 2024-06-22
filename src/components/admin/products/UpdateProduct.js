import { useState, useEffect } from "react";

import { GetAPI } from "../../../api/RestAPIs";

import GradeInput from "../adminCommon/GradeInput";
import ListInput from "../adminCommon/ListInput";

import styles from "./AdminProducts.module.css";

function UpdateProduct({ Location, product, setProduct }) {

    const [effiList, setEffiList] = useState([]);
    const [ingraList, setIngraList] = useState([]);

    const call = async () => {

        const response = await GetAPI(Location);

        const result = await response.product;

        return result;
    };

    useEffect(() => {
        call().then((res) => {

            const effi = res?.prodEffi.split(',');
            const ingra = res?.prodIngra.split(',');

            setProduct(res);
            setEffiList(effi);
            setIngraList(ingra);
        });
    }, []);

    const valueChangeHandler = e => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className={styles.detailBox}>
            <div style={{ width: "680px", }}>
                <div>
                    <div className={styles.detailBoxImage}>
                        <p>이미지</p>
                    </div>
                    <div style={{ width: "510px", float: "left", }}>
                        <div>
                            <div className={styles.detailBoxShort}>
                                <p>사료코드</p>
                                <input
                                    style={{ backgroundColor: "rgba(212, 212, 212, 1)" }}
                                    disabled
                                    value={product?.prodCode}
                                />
                            </div>
                            <div className={styles.detailBoxMid}>
                                <p>제품명</p>
                                <input
                                    type="text"
                                    name="prodName"
                                    style={{ width: "290px", }}
                                    onChange={valueChangeHandler}
                                    placeholder={product?.prodName}
                                />
                            </div>
                        </div>
                        <div style={{ clear: "both", }}>
                            <div className={styles.detailBoxShort}>
                                <p>제조사</p>
                                <input
                                    type="text"
                                    name="prodManufac"
                                    onChange={valueChangeHandler}
                                    placeholder={product?.prodManufac}
                                />
                            </div>
                            <div className={styles.detailBoxMid}>
                                <p>사이트 주소</p>
                                <input
                                    type="text"
                                    name="prodSite"
                                    style={{ width: "290px", }}
                                    onChange={valueChangeHandler}
                                    placeholder={product?.prodSite}
                                />
                            </div>
                        </div>
                        <div style={{ clear: "both", }}>
                            <div className={styles.detailBoxShort}>
                                <p>등록일</p>
                                <input
                                    style={{ backgroundColor: "rgba(212, 212, 212, 1)" }}
                                    disabled
                                    value={product?.prodDate}
                                />
                            </div>
                            <div className={styles.detailBoxShort}>
                                <p>조회수</p>
                                <input
                                    style={{ backgroundColor: "rgba(212, 212, 212, 1)" }}
                                    disabled
                                />
                            </div>
                            <div className={styles.detailBoxShort}>
                                <p>게시여부</p>
                                <select
                                    name="prodStatus"
                                    onChange={valueChangeHandler}
                                    value={product?.prodStatus}
                                >
                                    <option value={'Y'}>게시중</option>
                                    <option value={'N'}>게시중단</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ clear: "both", }}>
                    <div>
                        <div className={styles.detailBoxShort}></div>
                        <div className={styles.detailBoxShort}>
                            <p>가격(출고가)</p>
                            <input
                                type="number"
                                name="prodPrice"
                                style={{ width: "100px", }}
                                onChange={valueChangeHandler}
                                placeholder={product?.prodPrice}
                            />
                            <span>원</span>
                        </div>
                        <div className={styles.detailBoxShort}>
                            <p>용량</p>
                            <input
                                type="text"
                                name="prodVolume"
                                style={{ width: "100px" }}
                                onChange={valueChangeHandler}
                                placeholder={product?.prodVolume}
                            />
                            <span>kg</span>
                        </div>
                        <div className={styles.detailBoxShort}>
                            <p>평점</p>
                            <div className={styles.gradeBox}>
                                <GradeInput
                                    target={'prodGrade'}
                                    form={product}
                                    setForm={setProduct}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ clear: "both", }}>
                        <div className={styles.detailBoxShort}>
                            <p>입자크기</p>
                            <input
                                type="number"
                                name="prodSize"
                                style={{ width: "100px", }}
                                onChange={valueChangeHandler}
                                placeholder={product?.prodSize}
                            />
                            <span>mm</span>
                        </div>
                        <div className={styles.detailBoxShort}>
                            <p>조리방식</p>
                            <select
                                id="prodCook"
                                name="prodCook"
                                onChange={valueChangeHandler}
                                value={product?.prodCook}
                            >
                                <option value={'건식'}>건식</option>
                                <option value={'습식'}>습식</option>
                                <option value={'화식'}>화식</option>
                            </select>
                        </div>
                        <div className={styles.detailBoxShort}>
                            <p>추천 견종</p>
                            <select
                                name="prodRecom"
                                onChange={valueChangeHandler}
                                value={product?.prodRecom}
                            >
                                <option value={'전체'}>전체</option>
                                <option value={'소형견'}>소형견</option>
                                <option value={'중형견'}>중형견</option>
                                <option value={'대형견'}>대형견</option>
                            </select>
                        </div>
                        <div className={styles.detailBoxShort}>
                            <p>추천 연령</p>
                            <select
                                name="prodAge"
                                onChange={valueChangeHandler}
                                value={product?.prodAge}
                            >
                                <option value={'전체'}>전체</option>
                                <option value={'유아기'}>유아기</option>
                                <option value={'청년기'}>청년기</option>
                                <option value={'노년기'}>노년기</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.detailBoxFull}>
                        <p>제품기능</p>
                        <div className={styles.listBox}>
                            <div
                                className={styles.scrollBox}
                                style={{ height: "35px", }}
                            >
                                <ListInput
                                    target={'prodEffi'}
                                    list={effiList}
                                    setList={setEffiList}
                                    form={product}
                                    setForm={setProduct}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.detailBoxFull}>
                        <p>재료</p>
                        <div className={styles.listBox}>
                            <div className={styles.scrollBox} style={{ height: "70px", }}>
                                <ListInput
                                    target={'prodIngra'}
                                    list={ingraList}
                                    setList={setIngraList}
                                    form={product}
                                    setForm={setProduct}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProduct;