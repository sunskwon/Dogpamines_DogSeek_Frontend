import { useState, useEffect } from "react";

import { GetAPI } from "../../../api/RestAPIs";

import styles from "./AdminProducts.module.css"
import GradeOutput from "../adminCommon/GradeOutput";
import ListOutput from "../adminCommon/ListOutput";

function SelectProductByCode({ Location }) {

    const [product, setProduct] = useState();
    const [effiList, setEffiList] = useState([]);
    const [ingraList, setIngraList] = useState([]);

    const call = async () => {

        const response = await GetAPI(Location);

        const result = await response.product;

        return result;
    };

    useEffect(() => {
        call().then((res) => {

            const effi = res.prodEffi.split(',');
            const ingra = res.prodIngra.split(',');

            setProduct(res);
            setEffiList(effi);
            setIngraList(ingra);
        });
    }, []);

    return (
        <div className={styles.detailBox}>
            <div style={{ width: "680px", }}>
                <div style={{ width: "680px", }}>
                    <div>
                        <div className={styles.detailBoxImage}>
                            <p>이미지</p>
                            <img
                                src={product?.prodImage}
                                alt='front view of product'
                            />
                        </div>
                        <div style={{ width: "510px", float: "left", }}>
                            <div>
                                <div className={styles.detailBoxShort}>
                                    <p>사료코드</p>
                                    <div className={styles.spanBox}>
                                        <span>{product?.prodCode}</span>
                                    </div>
                                </div>
                                <div className={styles.detailBoxMid}>
                                    <p>제품명</p>
                                    <div
                                        className={styles.spanBox}
                                        style={{ width: "290px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", }}
                                    >
                                        <span>{product?.prodName}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ clear: "both", }}>
                                <div className={styles.detailBoxShort}>
                                    <p>제조사</p>
                                    <div className={styles.spanBox}>
                                        <span>{product?.prodManufac}</span>
                                    </div>
                                </div>
                                <div className={styles.detailBoxMid}>
                                    <p>사이트 주소</p>
                                    <div
                                        className={styles.spanBox}
                                        style={{ width: "290px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", }}>
                                        <a href={product?.prodSite}>
                                            {product?.prodSite}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div style={{ clear: "both", }}>
                                <div className={styles.detailBoxShort}>
                                    <p>등록일</p>
                                    <div className={styles.spanBox}>
                                        <span>{product?.prodDate}</span>
                                    </div>
                                </div>
                                <div className={styles.detailBoxShort}>
                                    <p>조회수</p>
                                    <div className={styles.spanBox}>
                                        <span>0회</span>
                                    </div>
                                </div>
                                <div className={styles.detailBoxShort}>
                                    <p>게시여부</p>
                                    <div className={styles.spanBox}>
                                        <span>{product?.prodStatus === 'Y' ? '게시중' : '게시중단'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ clear: "both", }}>
                        <div>
                            <div className={styles.detailBoxShort}></div>
                            <div className={styles.detailBoxShort}>
                                <p>가격(출고가)</p>
                                <div className={styles.spanBox}>
                                    <span>{`${product?.prodPrice}원`}</span>
                                </div>
                            </div>
                            <div className={styles.detailBoxShort}>
                                <p>용량</p>
                                <div className={styles.spanBox}>
                                    <span>{`${product?.prodVolume}kg`}</span>
                                </div>
                            </div>
                            <div className={styles.detailBoxShort}>
                                <p>평점</p>
                                <div className={styles.gradeBox}>
                                    <GradeOutput
                                        grade={product?.prodGrade}
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{ clear: "both", }}>
                            <div>
                                <div className={styles.detailBoxShort}>
                                    <p>입자크기</p>
                                    <div className={styles.spanBox}>
                                        <span>{`${product?.prodSize}mm`}</span>
                                    </div>
                                </div>
                                <div className={styles.detailBoxShort}>
                                    <p>조리방식</p>
                                    <div className={styles.spanBox}>
                                        <span>{product?.prodCook}</span>
                                    </div>
                                </div>
                                <div className={styles.detailBoxShort}>
                                    <p>추천 견종</p>
                                    <div className={styles.spanBox}>
                                        <span>{product?.prodRecom}</span>
                                    </div>
                                </div>
                                <div className={styles.detailBoxShort}>
                                    <p>추천 연령</p>
                                    <div className={styles.spanBox}>
                                        <span>{product?.prodAge}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.detailBoxFull}>
                                <p>제품기능</p>
                                <div className={styles.listBox}>
                                    <div className={styles.scrollBox}>
                                        <ListOutput
                                            list={effiList}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.detailBoxFull}>
                                <p>재료</p>
                                <div className={styles.listBox}>
                                    <div className={styles.scrollBox} style={{ height: "70px", }}>
                                        <ListOutput
                                            list={ingraList}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default SelectProductByCode;