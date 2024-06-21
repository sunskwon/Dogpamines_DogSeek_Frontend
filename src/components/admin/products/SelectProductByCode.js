import { useState, useEffect } from "react";

import { GetAPI } from "../../../api/RestAPIs";

import styles from "./AdminProducts.module.css"

function SelectProductByCode({ Location }) {

    const [product, setProduct] = useState();
    const [effi, setEffi] = useState([]);
    const [ingra, setIngra] = useState([]);

    const call = async () => {

        const response = await GetAPI(Location);

        const result = await response.product;

        return result;
    };

    useEffect(() => {
        call().then((res) => {

            const tempEffi = res.prodEffi.split(',');
            const tempIngra = res.prodIngra.split(',');

            setProduct(res);
            setEffi(tempEffi);
            setIngra(tempIngra);
        });
    }, []);

    return (
        <div className={styles.detailProductBox}>
            <div style={{ width: "680px", }}>
                <div>
                    <div className={styles.detailProductBoxPart}>
                        <p>이미지</p>
                        <img
                            src={product?.prodImage}
                            style={{ width: "120px", height: "120px", paddingTop: "30px", }}
                        />
                    </div>
                    <div className={styles.detailProductBoxPart}>
                        <p>사료코드</p>
                        <div style={{ height: "30px", paddingTop: "5px", paddingLeft: "10px", marginBottom: "15px", }}>
                            <span>{product?.prodCode}</span>
                        </div>
                        <p>등록일</p>
                        <div style={{ height: "30px", paddingTop: "5px", paddingLeft: "10px", marginBottom: "15px", }}>
                            <span>{product?.prodDate}</span>
                        </div>
                        <p>가격(출고가)</p>
                        <div style={{ height: "30px", paddingTop: "5px", paddingLeft: "10px", marginBottom: "15px", }}>
                            <span>{`${product?.prodPrice}원`}</span>
                        </div>
                    </div>
                    <div className={styles.detailProductBoxPart}>
                        <p>제품명</p>
                        <div
                            id="prodName"
                            style={{ width: "120px", height: "30px", paddingTop: "5px", paddingLeft: "10px", marginBottom: "15px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", }}
                        >
                            <span>{product?.prodName}</span>
                        </div>
                        <p>조회수</p>
                        <div style={{ height: "30px", paddingTop: "5px", paddingLeft: "10px", marginBottom: "15px", }}>

                        </div>
                        <p>용량</p>
                        <div style={{ height: "30px", paddingTop: "5px", paddingLeft: "10px", marginBottom: "15px", }}>
                            <span>{`${product?.prodVolume}kg`}</span>
                        </div>
                    </div>
                    <div className={styles.detailProductBoxPart}>
                        <p>제조사</p>
                        <div style={{ height: "30px", paddingTop: "5px", paddingLeft: "10px", marginBottom: "15px", }}>
                            <span>{product?.prodManufac}</span>
                        </div>
                        <p>게시여부</p>
                        <div style={{ height: "30px", paddingTop: "5px", paddingLeft: "10px", marginBottom: "15px", }}>
                            <span>{product?.prodStatus === 'Y' ? '게시중' : '게시중단'}</span>
                        </div>
                        <p>평점</p>
                        <div className={styles.detailProductBoxPartGrade}>
                            <img
                                src={product?.prodGrade > 0 ? "/images/admin/star On.png" : "/images/admin/star Off.png"}
                            />
                            <img
                                src={product?.prodGrade > 1 ? "/images/admin/star On.png" : "/images/admin/star Off.png"}
                            />
                            <img
                                src={product?.prodGrade > 2 ? "/images/admin/star On.png" : "/images/admin/star Off.png"}
                            />
                            <img
                                src={product?.prodGrade > 3 ? "/images/admin/star On.png" : "/images/admin/star Off.png"}
                            />
                            <img
                                src={product?.prodGrade > 4 ? "/images/admin/star On.png" : "/images/admin/star Off.png"}
                            />
                        </div>
                    </div>
                </div>
                <div style={{ clear: "both", }}>
                    <div className={styles.detailProductBoxShort}>
                        <p>조리방식</p>
                        <div style={{ height: "30px", paddingTop: "5px", paddingLeft: "10px", marginBottom: "15px", }}>
                            <span>{product?.prodCook}</span>
                        </div>
                    </div>
                    <div className={styles.detailProductBoxShort}>
                        <p>입자크기</p>
                        <div style={{ height: "30px", paddingTop: "5px", paddingLeft: "10px", marginBottom: "15px", }}>
                            <span>{`${product?.prodSize}mm`}</span>
                        </div>
                    </div>
                    <div className={styles.detailProductBoxLong}>
                        <p>사이트 주소</p>
                        <div style={{ width: "290px", height: "30px", paddingTop: "5px", paddingLeft: "10px", marginBottom: "15px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", }}>
                            <a
                                href={product?.prodSite}
                                style={{ fontSize: "14px", color: "rgba(112, 178, 222, 1)", }}
                            >
                                {product?.prodSite}
                            </a>
                        </div>
                    </div>
                </div>
                <div style={{ clear: "both", }}>
                    <div className={styles.detailProductBoxShort}>
                        <p>추천 견종</p>
                        <div style={{ height: "30px", paddingTop: "5px", paddingLeft: "10px", marginBottom: "15px", }}>
                            <span>{product?.prodRecom}</span>
                        </div>
                    </div>
                    <div className={styles.detailProductBoxLonger}>
                        <p>제품기능</p>
                        <div style={{ marginRight: "10px", float: "left", }}>
                            {effi.map((item, index) => (
                                <div key={index} style={{ display: "flex", float: "left", }}>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={{ clear: "both", }}></div>
                <div className={styles.detailProductBoxFull}>
                    <p>재료</p>
                    <div style={{ marginRight: "10px", float: "left", }}>
                        {ingra.map((item, index) => (
                            <div key={index} style={{ display: "flex", float: "left", }}>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectProductByCode;