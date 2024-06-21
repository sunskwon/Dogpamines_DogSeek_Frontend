import { useState } from "react";

import styles from "./AdminProducts.module.css";

function InsertProduct({ product, setProduct }) {

    const date = new Date;
    const today = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate()}`;

    const [effiInput, setEffiInput] = useState('');
    const [ingraInput, setIngraInput] = useState('');
    const [effi, setEffi] = useState([]);
    const [ingra, setIngra] = useState([]);

    const valueChangeHandler = e => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className={styles.detailProductBox}>
            <div style={{ width: "680px", }}>
                <div>
                    <div className={styles.detailProductBoxPart}>
                        <p>이미지</p>
                    </div>
                    <div className={styles.detailProductBoxPart}>
                        <p>사료코드</p>
                        <input
                            style={{ backgroundColor: "rgba(212, 212, 212, 1)" }}
                            disabled
                        />
                        <p>등록일</p>
                        <input
                            style={{ backgroundColor: "rgba(212, 212, 212, 1)" }}
                            disabled
                            value={today}
                        />
                        <p>가격(출고가)</p>
                        <input
                            type="number"
                            name="prodPrice"
                            onChange={valueChangeHandler}
                            style={{ width: "100px", }}
                        />
                        <span>원</span>
                    </div>
                    <div className={styles.detailProductBoxPart}>
                        <p>제품명</p>
                        <input
                            type="text"
                            name="prodName"
                            onChange={valueChangeHandler}
                        />
                        <p>조회수</p>
                        <input
                            style={{ backgroundColor: "rgba(212, 212, 212, 1)" }}
                            disabled
                        />
                        <p>용량</p>
                        <input
                            type="text"
                            name="prodVolume"
                            onChange={valueChangeHandler}
                            style={{ width: "100px" }}
                        />
                        <span>kg</span>
                    </div>
                    <div className={styles.detailProductBoxPart}>
                        <p>제조사</p>
                        <input
                            type="text"
                            name="prodManufac"
                            onChange={valueChangeHandler}
                        />
                        <p>게시여부</p>
                        <input
                            style={{ backgroundColor: "rgba(212, 212, 212, 1)" }}
                            disabled
                        />
                        <p>평점</p>
                        <div className={styles.detailProductBoxPartGrade}>
                            <img
                                src={product.prodGrade > 0 ? "/images/admin/star On.png" : "/images/admin/star Off.png"}
                                onClick={() => {
                                    setProduct({
                                        ...product,
                                        prodGrade: 1
                                    })
                                }}
                            />
                            <img
                                src={product.prodGrade > 1 ? "/images/admin/star On.png" : "/images/admin/star Off.png"}
                                onClick={() => {
                                    setProduct({
                                        ...product,
                                        prodGrade: 2
                                    })
                                }}
                            />
                            <img
                                src={product.prodGrade > 2 ? "/images/admin/star On.png" : "/images/admin/star Off.png"}
                                onClick={() => {
                                    setProduct({
                                        ...product,
                                        prodGrade: 3
                                    })
                                }}
                            />
                            <img
                                src={product.prodGrade > 3 ? "/images/admin/star On.png" : "/images/admin/star Off.png"}
                                onClick={() => {
                                    setProduct({
                                        ...product,
                                        prodGrade: 4
                                    })
                                }}
                            />
                            <img
                                src={product.prodGrade > 4 ? "/images/admin/star On.png" : "/images/admin/star Off.png"}
                                onClick={() => {
                                    setProduct({
                                        ...product,
                                        prodGrade: 5
                                    })
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div style={{ clear: "both", }}>
                    <div className={styles.detailProductBoxShort}>
                        <p>조리방식</p>
                        <select
                            name="prodCook"
                            onChange={valueChangeHandler}
                        >
                            <option value={'건식'}>건식</option>
                            <option value={'습식'}>습식</option>
                            <option value={'화식'}>화식</option>
                        </select>
                    </div>
                    <div className={styles.detailProductBoxShort}>
                        <p>입자크기</p>
                        <input
                            type="number"
                            name="prodSize"
                            onChange={valueChangeHandler}
                            style={{ width: "100px", }}
                        />
                        <span>mm</span>
                    </div>
                    <div className={styles.detailProductBoxLong}>
                        <p>사이트 주소</p>
                        <input
                            type="text"
                            name="prodSite"
                            onChange={valueChangeHandler}
                            style={{ width: "290px", }}
                        />
                    </div>
                </div>
                <div style={{ clear: "both", }}>
                    <div className={styles.detailProductBoxShort}>
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
                    <div className={styles.detailProductBoxLonger}>
                        <p>제품기능</p>
                        <div style={{ marginRight: "10px", float: "left", }}>
                            {effi.map((item, index) => (
                                <div key={index} style={{ display: "flex", float: "left", }}>
                                    <span>
                                        {item} &nbsp;
                                        <img
                                            src="/images/admin/Delete.png"
                                            style={{ width: "15px", height: "15px", cursor: "pointer", }}
                                            onClick={() => {
                                                const removeIndex = index
                                                const originEffi = effi;
                                                const removeEffi = originEffi.filter(function (_, index) {
                                                    return index !== removeIndex;
                                                });
                                                setEffi(removeEffi);
                                                setProduct({
                                                    ...product,
                                                    prodEffi: removeEffi.toString()
                                                });
                                            }}
                                        />
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                id="effiInput"
                                onChange={(e) => {
                                    setEffiInput(e.target.value);
                                }}
                            />
                            <img
                                src="/images/admin/Add.png"
                                style={{ cursor: "pointer", }}
                                onClick={() => {
                                    const originEffi = effi;
                                    const updateEffi = [...originEffi, effiInput];
                                    setEffi(updateEffi);
                                    setProduct({
                                        ...product,
                                        prodEffi: updateEffi.toString()
                                    });
                                    document.getElementById('effiInput').value = '';
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div style={{ clear: "both", }}></div>
                <div className={styles.detailProductBoxFull}>
                    <p>재료</p>
                    <div style={{ marginRight: "10px", float: "left", }}>
                        {ingra.map((item, index) => (
                            <div key={index} style={{ display: "flex", float: "left", }}>
                                <span>
                                    {item} &nbsp;
                                    <img
                                        src="/images/admin/Delete.png"
                                        style={{ width: "15px", height: "15px", cursor: "pointer", }}
                                        onClick={() => {
                                            const removeIndex = index
                                            const originIngra = ingra;
                                            const removeIngra = originIngra.filter(function (_, index) {
                                                return index !== removeIndex;
                                            });
                                            setIngra(removeIngra);
                                            setProduct({
                                                ...product,
                                                prodIngra: removeIngra.toString()
                                            });
                                        }}
                                    />
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            id="ingraInput"
                            onChange={(e) => {
                                setIngraInput(e.target.value);
                            }}
                        />
                        <img
                            src="/images/admin/Add.png"
                            style={{ cursor: "pointer", }}
                            onClick={() => {
                                const originIngra = ingra;
                                const updateIngra = [...originIngra, ingraInput];
                                setIngra(updateIngra);
                                setProduct({
                                    ...product,
                                    prodIngra: updateIngra.toString()
                                });
                                document.getElementById('ingraInput').value = '';
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InsertProduct;