import { Link, useLocation } from "react-router-dom";
import { GetAPI } from "../../api/RestAPIs";
import React, {useState, useEffect} from 'react';
import styles from './ProductDetail.module.css';

function ProductDetail () {

    const location = useLocation();

    const { prodCode, age, ingra, disease, allergy, cook, size } = location.state
    const [product, setProduct] = useState([]);
    const [similarProduct, setSimilarProduct] = useState([]);
    const [toggleState, setToggleState] = useState(false);

    const detailProduct = async () => {

        const detailProductAddress = `/products/${prodCode}`;
        const detailProductResponse = await GetAPI(detailProductAddress);
        setProduct(detailProductResponse.product);
    };

    useEffect(() => {
        detailProduct();
    }, []);

    const similarProducts = async () => {

        const curationProductsAddress = `/curation?curationAge=${age}&curationIngra=${ingra}&curationDisease=${disease}&curationAllergy=${allergy}&curationCook=${cook}&curationSize=${size}`;
        const curationProductsResponse = await GetAPI(curationProductsAddress);
        setSimilarProduct(curationProductsResponse.curationProducts);

    };

    useEffect(() => {
        similarProducts();
    }, [age, ingra, disease, allergy, cook, size])

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
            default:
                return "/images/curation/default-star.png";
        }
    };

    const toggle = () => {
        setToggleState(!toggleState);
    };

    return (
        <div className={styles.allBox}>
            <div className={styles.prodBox}>
                <img className={styles.imgBox} src={product.prodImage} alt={product.prodName}/>
                <div className={styles.textBox}>
                    <p className={styles.nameText}>{product.prodName}</p>
                    <p className={styles.manufacText}>{product.prodManufac}</p>
                    <p className={styles.priceText}>￦{product.prodPrice}</p>
                    <div className={styles.prodTextBox}>
                        <p style={{fontWeight:"bold", fontSize:"20px", margin:"0"}}>평점</p>
                        <img style={{width:"79px", height:"15px", marginTop:"8px", marginLeft:"5px"}} src={getStarImage(product.prodGrade)} alt={`${product.prodGrade} stars`}/>
                    </div>
                    <div className={styles.prodTextBox}>
                        <p style={{fontWeight:"bold", fontSize:"20px", margin:"0"}}>제품기능 - </p>
                        <p className={styles.prodText}>{product.prodEffi}</p>
                    </div>
                    <div className={styles.prodTextBox}>
                        <p style={{fontWeight:"bold", fontSize:"20px", margin:"0"}}>추천견종 - </p>
                        <p className={styles.prodText}>{product.prodRecom}</p>
                    </div>
                    <div className={styles.prodTextBox}>
                        <p style={{fontWeight:"bold", fontSize:"20px", margin:"0"}}>조리방식 - </p>
                        <p className={styles.prodText}>{product.prodCook}</p>
                    </div>
                    <div className={styles.prodTextBox}>
                        <p style={{fontWeight:"bold", fontSize:"20px", margin:"0"}}>입자크기 - </p>
                        <p className={styles.prodText}>{product.prodSize}</p>
                    </div>
                    <div className={styles.prodTextBox}>
                        <p style={{fontWeight:"bold", fontSize:"20px", margin:"0"}}>재료 - </p>
                        <p className={styles.prodText}>{product.prodIngra}</p>
                    </div>
                    <hr className={styles.hr}/>
                    <div className={styles.addressBox}>
                    <p style={{ fontWeight: "bold", fontSize: "20px", margin: "0", color: "#999999" }}>사이트 주소</p>
                    <div onClick={toggle} style={{ width: "12px", height: "20px" }}>
                        {toggleState ? 
                            <img src="/images/product/vector.png" style={{ width: "12px", height: "20px", transform: "rotate(180deg)" }} alt="toggle arrow" /> 
                            : 
                            <img src="/images/product/vector.png" style={{ width: "12px", height: "20px" }} alt="toggle arrow" />}
                        </div>
                    </div>
                    {toggleState && (
                        <Link to={product.prodSite} className={styles.prodText} style={{ fontSize: "12px" }}>{product.prodSite}</Link>
                    )}
                    <hr className={styles.hr} />
                </div>
            </div>
            <div style={{width:"500px", height:"500px", margin:"0 auto"}}>
                <p style={{textAlign:"center", paddingTop:"250px"}}>최저가 들어갈곳</p>
            </div>
            <p style={{color:"#005600", fontSize:"24px", fontWeight:"bold", margin:"0"}}>비슷한 제품</p>
            <div className={styles.allSimilarBox}>
                {similarProduct
                    .filter(similarProd => similarProd.prodCode !== product.prodCode)
                    .map(similarProd => (
                        <div key={similarProd.prodCode} className={styles.similarProductBox}>
                            <img src={similarProd.prodImage} style={{width:"90%"}} alt={similarProd.prodName} />
                            <div className={styles.prodTextBox}>
                                <p style={{fontWeight:"bold", fontSize:"16px", margin:"0"}}>제품명 - </p>
                                <p style={{fontWeight:"bold", fontSize:"16px", color:"#999999", width:"234px", margin:"0", marginLeft:"5px", height:"50px"}}>{similarProd.prodName}</p>
                            </div>
                            <div className={styles.prodTextBox}>
                                <p style={{fontWeight:"bold", fontSize:"16px", margin:"0"}}>평점</p>
                                <img style={{width:"79px", height:"15px", marginTop:"5px", marginLeft:"5px"}} src={getStarImage(similarProd.prodGrade)} alt={`${similarProd.prodGrade} stars`}/>
                            </div>
                            <button className={styles.button}>비교하기</button>
                        </div>
                ))}
            </div>
        </div>
    )
}

export default ProductDetail;