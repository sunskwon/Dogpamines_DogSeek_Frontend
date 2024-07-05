import { useState, useEffect, useRef } from "react";

import GradeInput from "../adminCommon/GradeInput";
import ListInput from "../adminCommon/ListInput";

import ImageInputModal from "../adminCommon/ImageInputModal";

import styles from "./AdminProducts.module.css";

function InsertProduct({ product, setProduct }) {

    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;

    const [effiList, setEffiList] = useState([]);
    const [ingraList, setIngraList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const modalBackground = useRef();

    const valueChangeHandler = e => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
    }, [product]);

    return (
        <div className={styles.detailBox}>
            <div style={{ width: "680px", }}>
                <div>
                    <div className={styles.detailBoxImage}>
                        <p>이미지</p>
                        <div>
                            <img
                                src={product?.prodImage}
                                alt='사료'
                            />
                            <div
                                className={styles.imageInfo}
                                onClick={() => setModalOpen(true)}
                            >
                                <span>클릭하여</span>
                                <br />
                                <span>이미지 URL을</span>
                                <br />
                                <span>입력하세요</span>
                            </div>
                        </div>
                    </div>
                    <ImageInputModal
                        name='prodImage'
                        item={product}
                        setItem={setProduct}
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                        modalBackground={modalBackground}
                    />
                    <div style={{ width: "510px", float: "left", }}>
                        <div>
                            <div className={styles.detailBoxShort}>
                                <p>사료 No.</p>
                                <input
                                    style={{ backgroundColor: "rgba(212, 212, 212, 1)" }}
                                    disabled
                                />
                            </div>
                            <div className={styles.detailBoxMid}>
                                <p>제품명</p>
                                <input
                                    type="text"
                                    name="prodName"
                                    style={{ width: "290px", }}
                                    onChange={valueChangeHandler}
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
                                />
                            </div>
                            <div className={styles.detailBoxMid}>
                                <p>사이트 주소</p>
                                <input
                                    type="text"
                                    name="prodSite"
                                    style={{ width: "290px", }}
                                    onChange={valueChangeHandler}
                                />
                            </div>
                        </div>
                        <div style={{ clear: "both", }}>
                            <div className={styles.detailBoxShort}>
                                <p>등록일</p>
                                <input
                                    style={{ backgroundColor: "rgba(212, 212, 212, 1)", }}
                                    disabled
                                    value={today}
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
                                <input
                                    style={{ backgroundColor: "rgba(212, 212, 212, 1)" }}
                                    disabled
                                />
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
                            />
                            <span>mm</span>
                        </div>
                        <div className={styles.detailBoxShort}>
                            <p>조리방식</p>
                            <select
                                name="prodCook"
                                onChange={valueChangeHandler}
                            >
                                <option value={'건식'}>건식</option>
                                <option value={'소프트'}>소프트</option>
                                <option value={'습식'}>습식</option>
                                <option value={'화식'}>화식</option>
                            </select>
                        </div>
                        <div className={styles.detailBoxShort}>
                            <p>추천 견종</p>
                            <select
                                name="prodRecom"
                                onChange={valueChangeHandler}
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

export default InsertProduct;