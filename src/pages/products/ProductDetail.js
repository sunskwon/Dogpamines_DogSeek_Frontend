import { useLocation } from "react-router-dom";
import { GetAPINotToken, GetAPIWCookie } from "../../api/RestAPIs";
import React, { useState, useEffect, useRef } from 'react';
import styles from './ProductDetail.module.css';
import axios from "axios";

function ProductDetail() {

    const location = useLocation();

    const { prodCode, age, ingra, disease, allergy, cook, size } = location.state
    const [product, setProduct] = useState([]);
    const [similarProduct, setSimilarProduct] = useState([]);
    const [toggleState, setToggleState] = useState(false);
    const [comparison, setComparison] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [nDate, setNDate] = useState([]);
    const [volume, setVolume] = useState([]);

    const detailProduct = async () => {

        const detailProductAddress = `/products/${prodCode}`;
        const detailProductResponse = await GetAPIWCookie(detailProductAddress);
        setProduct(detailProductResponse.product);
    };

    useEffect(() => {
        window.scrollTo(0,0);
        detailProduct();
    }, []);

    const similarProducts = async () => {

        const curationProductsAddress = `/curation?curationAge=${age}&curationIngra=${ingra}&curationDisease=${disease}&curationAllergy=${allergy}&curationCook=${cook}&curationSize=${size}`;
        const curationProductsResponse = await GetAPINotToken(curationProductsAddress);
        setSimilarProduct(curationProductsResponse.curationProducts);

    };

    useEffect(() => {
        similarProducts();
    }, [age, ingra, disease, allergy, cook, size])

    const volumeProducts = async () => {

        const volumeAddress = `/products/volume?prodName=${product.prodName}`
        const volumeResponse = await GetAPINotToken(volumeAddress);
        setVolume(volumeResponse.product);
    }

    useEffect(() => {
        volumeProducts();
    }, [product.prodName])

    console.log(volume)

    const getStarImage = (grade) => {
        switch (grade) {
            case 5:
                return "/images/curation/5star.png";
            case 4:
                return "/images/curation/4star.png";
            case 3:
                return "/images/curation/3star.png";
            case 2:
                return "/images/curation/2star.png";
            case 1:
                return "/images/curation/1star.png";
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ko-KR').format(price);
    };

    const toggle = () => {
        setToggleState(!toggleState);
    };

    const onClick = (prodCode2) => {
        const comparsion = async () => {
            const comparisonProductsAddress = `/products/comparison?prodCode1=${product.prodCode}&prodCode2=${prodCode2}`;
            const comparisonProductsResponse = await GetAPINotToken(comparisonProductsAddress);
            setComparison(comparisonProductsResponse.products);
        };
        comparsion();
        setModalOpen(true);
    };

    const getSearchDate = async () => {
        const URL = "/v1/search/shop.json";
        await axios
            .get(URL, {
                params: {
                    query: `${product.prodName}`,
                    display: 10,
                    start: 1,
                    sort: "sim",
                },
                headers: {
                    "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
                    "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
                },
            })
            .then((res) => setNDate(res.data.items))
            .catch((e) => {
                console.log('응 안돼', e)
            });
    };

    useEffect(() => {
        getSearchDate();
    }, [`${product.prodName}`]);

    nDate.sort((a, b) => a.lprice - b.lprice);

    if (modalOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }

    return (
        <div className={styles.allBox}>
            <div className={styles.prodBox}>
                <img className={styles.imgBox} src={product.prodImage} alt={product.prodName} />
                <div className={styles.textBox}>
                    <p className={styles.nameText}>{product.prodName}</p>
                    <p className={styles.manufacText}>{product.prodManufac}</p>
                    <p className={styles.priceText}>￦{formatPrice(product.prodPrice)}</p>
                    <div className={styles.prodTextBox}>
                        <p style={{ fontWeight: "bold", fontSize: "20px", margin: "0" }}>평점</p>
                        <img style={{ width: "79px", height: "15px", marginTop: "8px", marginLeft: "10px" }} src={getStarImage(product.prodGrade)} alt={`${product.prodGrade} stars`} />
                    </div>
                    <div className={styles.prodTextBox}>
                        <p style={{ fontWeight: "bold", fontSize: "20px", margin: "0" }}>용량</p>
                        {volume.map((volume) => (
                            <div key={volume.prodCode} className={styles.volumeBox}>
                                <div className={`${styles.volumeButton} ${volume.prodName === product.prodName ? styles.volumeButtonActive : ''}`} onClick={() => setProduct(volume)}>{volume.prodVolume}kg</div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.prodTextBox}>
                        <p style={{ fontWeight: "bold", fontSize: "20px", margin: "0", width: "90px" }}>제품기능</p>
                        <p className={styles.prodText}>{product.prodEffi}</p>
                    </div>
                    <div className={styles.prodTextBox}>
                        <p style={{ fontWeight: "bold", fontSize: "20px", margin: "0", width: "90px" }}>추천견종</p>
                        <p className={styles.prodText}>{product.prodRecom}</p>
                    </div>
                    <div className={styles.prodTextBox}>
                        <p style={{ fontWeight: "bold", fontSize: "20px", margin: "0", width: "90px" }}>조리방식</p>
                        <p className={styles.prodText}>{product.prodCook}</p>
                    </div>
                    <div className={styles.prodTextBox}>
                        <p style={{ fontWeight: "bold", fontSize: "20px", margin: "0", width: "90px" }}>입자크기</p>
                        <p className={styles.prodText}>{product.prodSize}mm</p>
                    </div>
                    <div className={styles.prodTextBox}>
                        <p style={{ fontWeight: "bold", fontSize: "20px", margin: "0" }}>재료</p>
                        <p className={styles.prodText}>{product.prodIngra}</p>
                    </div>
                    <hr className={styles.hr} />
                    <div className={styles.addressBox} onClick={toggle} >
                        <p style={{ fontWeight: "bold", fontSize: "20px", margin: "0", color: "#999999" }}>사이트 주소</p>
                        <div style={{ width: "12px", height: "20px" }}>
                            {toggleState ?
                                <img src="/images/product/vector.png" style={{ width: "25px", height: "15px", transform: "rotate(180deg)", marginLeft: "275px" }} alt="toggle arrow" />
                                :
                                <img src="/images/product/vector.png" style={{ width: "25px", height: "15px", marginLeft: "275px" }} alt="toggle arrow" />}
                        </div>
                    </div>
                    {toggleState && (
                        <div onClick={() => { window.open(product.prodSite) }} className={styles.prodTextSite}>{product.prodSite}</div>
                    )}
                    <hr className={styles.hr} />
                </div>
            </div>
            <div style={{ width: "959px", margin: "0 auto", marginTop: "100px" }}>
                <p style={{ textAlign: "center" }}>(DogSeek은 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있습니다.)</p>
                <hr className={styles.hr2} />
                <div style={{ display: "flex" }}>
                    <p className={styles.hrText} style={{ marginLeft: "40px", width: "100px" }}>판매처</p>
                    <p className={styles.hrText} style={{ marginLeft: "150px", width: "400px" }}>상품명</p>
                    <p className={styles.hrText} style={{ marginLeft: "100px" }}>판매가</p>
                </div>
                <hr className={styles.hr2} />
                {nDate.map((product) => (
                    <div key={product.link} onClick={() => { window.open(product.link) }} style={{ cursor: "pointer" }}>
                        <div style={{ display: "flex" }}>
                            <p className={styles.naverText} style={{ marginLeft: "40px", width: "100px" }}>{product.mallName}</p>
                            <p className={styles.naverText} style={{ marginLeft: "150px", width: "400px" }}>{product.title.replace(/(<([^>]+)>)/ig, "")}</p>
                            <p className={styles.naverText} style={{ marginLeft: "100px" }}>￦{formatPrice(product.lprice)}</p>
                        </div>
                        <hr className={styles.hr2} />
                    </div>
                ))}
            </div>
            <p style={{ color: "#005600", fontSize: "24px", fontWeight: "bold", margin: "0", marginTop: "100px" }}>비슷한 제품</p>
            <div className={styles.allSimilarBox}>
                {similarProduct.length === 1 ? (
                    <div style={{ width: "967px", textAlign: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "20px", margin: "0 auto", marginTop: "150px", marginBottom: "50px" }}>
                            <img src="/images/product/EmptyDogBowl.png" style={{ width: "100px", margin: "0 auto" }} />
                            <p style={{ margin: "0", textAlign: "center", fontWeight: "bold" }}>비슷한 사료가 존재하지 않습니다!</p>
                            <p style={{ margin: "0", textAlign: "center", fontWeight: "bold" }}>더 많은 사료로 찾아 뵙겠습니다!</p>
                        </div>
                    </div>
                ) : (
                    similarProduct
                        .filter(similarProd => similarProd.prodCode !== product.prodCode)
                        .map(similarProd => (
                            <div key={similarProd.prodCode} className={styles.similarProductBox}>
                                <img src={similarProd.prodImage} style={{ width: "100%" }} alt={similarProd.prodName} />
                                <div className={styles.prodTextBox}>
                                    <p style={{ fontWeight: "bold", fontSize: "16px", margin: "0" }}>제품명</p>
                                    <p style={{ fontWeight: "bold", fontSize: "16px", color: "#999999", width: "234px", margin: "0", marginLeft: "10px", height: "50px" }}>{similarProd.prodName}</p>
                                </div>
                                <div className={styles.prodTextBox}>
                                    <p style={{ fontWeight: "bold", fontSize: "16px", margin: "0" }}>평점</p>
                                    <img style={{ width: "79px", height: "15px", marginTop: "5px", marginLeft: "10px" }}
                                        src={getStarImage(similarProd.prodGrade)} alt={`${similarProd.prodGrade} stars`} />
                                </div>
                                <button className={styles.button} onClick={() => onClick(similarProd.prodCode)}>비교하기</button>
                                {modalOpen && (
                                    <div className={styles.modalContainer}>
                                        <div className={styles.modalContent}>
                                            <div style={{ display: "flex", marginTop: "30px", marginLeft: "50px" }}>
                                                <p style={{ fontSize: "20px", fontWeight: "bold", margin: "0" }}>DogSeek</p>
                                                <p style={{ fontSize: "20px", fontWeight: "bold", color: "#63C54A", margin: "0", marginLeft: "5px" }}>Compare</p>
                                            </div>
                                            <div style={{ display: "flex", width: "700px" }}>
                                                {comparison
                                                    .map(comparison => (
                                                        <div key={comparison.prodCode} className={styles.comparisonBox}>
                                                            <img src={comparison.prodImage} style={{ width: "100%" }} />
                                                            <div className={styles.prodTextBox}>
                                                                <p style={{ fontWeight: "bold", fontSize: "12px", margin: "0" }}>평점</p>
                                                                <img src={getStarImage(comparison.prodGrade)}
                                                                    style={{ width: "79px", height: "15px", marginTop: "2px", marginLeft: "10px" }} />
                                                            </div>
                                                            <div className={styles.comparisonTextBox}>
                                                                <p style={{ fontWeight: "bold", fontSize: "12px", margin: "0" }}>사이트주소</p>
                                                                <div onClick={() => { window.open(comparison.prodSite) }} className={styles.comparisonTextSite}>{comparison.prodSite}</div>
                                                            </div>
                                                            <div className={styles.comparisonTextBox}>
                                                                <p style={{ fontWeight: "bold", fontSize: "12px", margin: "0" }}>제조사</p>
                                                                <p className={styles.comparisonText}>{comparison.prodManufac}</p>
                                                            </div>
                                                            <div className={styles.comparisonTextBox}>
                                                                <p style={{ fontWeight: "bold", fontSize: "12px", margin: "0" }}>제품명</p>
                                                                <p className={styles.comparisonText} style={{ height: "35px" }}>{comparison.prodName}</p>
                                                            </div>
                                                            <div className={styles.comparisonTextBox}>
                                                                <p style={{ fontWeight: "bold", fontSize: "12px", margin: "0" }}>가격</p>
                                                                <p className={styles.comparisonText}>￦{formatPrice(comparison.prodPrice)}</p>
                                                            </div>
                                                            <div className={styles.comparisonTextBox}>
                                                                <p style={{ fontWeight: "bold", fontSize: "12px", margin: "0" }}>제품기능</p>
                                                                <p className={styles.comparisonText}>{comparison.prodEffi}</p>
                                                            </div>
                                                            <div className={styles.comparisonTextBox}>
                                                                <p style={{ fontWeight: "bold", fontSize: "12px", margin: "0" }}>추천견종</p>
                                                                <p className={styles.comparisonText}>{comparison.prodRecom}</p>
                                                            </div>
                                                            <div className={styles.comparisonTextBox}>
                                                                <p style={{ fontWeight: "bold", fontSize: "12px", margin: "0" }}>조리방식</p>
                                                                <p className={styles.comparisonText}>{comparison.prodCook}</p>
                                                            </div>
                                                            <div className={styles.comparisonTextBox}>
                                                                <p style={{ fontWeight: "bold", fontSize: "12px", margin: "0" }}>입자크기</p>
                                                                <p className={styles.comparisonText}>{comparison.prodSize}mm</p>
                                                            </div>
                                                            <div className={styles.comparisonTextBox}>
                                                                <p style={{ fontWeight: "bold", fontSize: "12px", margin: "0" }}>재료</p>
                                                                <p className={styles.comparisonText}>{comparison.prodIngra}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <button className={styles.cancelButton} onClick={() => setModalOpen(false)}>닫기</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )))}
            </div>
        </div>
    )
}

export default ProductDetail;