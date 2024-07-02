import styles from './CurationResult.module.css';
import Loding from '../../components/common/Loding';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GetAPI, PostAPI } from '../../api/RestAPIs';
import { useNavigate } from 'react-router-dom';

function CurationResult() {

    const navigate = useNavigate();
    const location = useLocation();

    const { name, gender, breed, weight, size, age, neut, allergy, disease, ingra, cook } = location.state;
    const userCode = 1;
    
    const today = new Date();
    const toDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    const [loding, setLoding] = useState(true); // Loading 상태 추가
    
    const [curation] = useState({
        curationAge: age,
        curationIngra: ingra,
        curationDisease: disease,
        curationAllergy: allergy,
        curationBreed: breed,
        curationGender: gender,
        curationNeut: neut,
        curationWeight: weight,
        curationName: name,
        curationDate: toDate,
        curationSize: size,
        curationCook: cook,
        userCode: userCode,
    });
    
    const [products, setProducts] = useState([]);
    const [selectCuration, setSelectCuration] = useState([]);
    
    const fetchData = async () => {

            
            const insertCurationAddress = '/curation';
            await PostAPI(insertCurationAddress, curation);

            
            const curationProductsAddress = `/curation?curationAge=${age}&curationIngra=${ingra}&curationDisease=${disease}&curationAllergy=${allergy}&curationCook=${cook}&curationSize=${size}`;
            const curationProductsResponse = await GetAPI(curationProductsAddress);
            setProducts(curationProductsResponse.curationProducts);
            

            const selectCuraionAddress = `/curationSelect?curationAge=${age}&curationIngra=${ingra}&curationDisease=${disease}&curationAllergy=${allergy}&curationBreed=${breed}&curationGender=${gender}&curationNeut=${neut}&curationWeight=${weight}&curationName=${name}&curationDate=${toDate}&curationSize=${size}&curationCook=${cook}&userCode=${userCode}`;
            const selectCurationResponse = await GetAPI(selectCuraionAddress);
            setSelectCuration(selectCurationResponse.curationSelect);
            
            setTimeout(() => {
                setLoding(false); 
            }, 3000)
    };

    useEffect(() => {
        fetchData();
    }, [age, allergy, breed, cook, disease, gender, ingra, name, neut, size, toDate, userCode, weight]);

    const insertHistory = async () => {
        
            const curationCode = selectCuration[0]?.curationCode;
            const prodCode = products.map(product => product.prodCode);

            const data = {
                curationCode: curationCode,
                prodCode: prodCode
            };

            const address = `/curationProducts`;
            await PostAPI(address, data);
    };

    useEffect(() => {
        insertHistory();
    }, [selectCuration, products]);

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

    if (loding) {
        return <Loding />; // 로딩 중일 때 로딩 컴포넌트 보여주기
    }

    if (products.length === 0) {
        return (
            <div className={styles.emptyMessageBox}>
                <img src="/images/curation/3716655.jpg" style={{ width: "500px", margin: "0 auto" }} alt="Empty message" />
                <a style={{ fontSize: '5px', color: 'black' }}>출처 freepik</a>
                <p className={styles.emptyMessage}>
                    죄송합니다... 현재는 <span style={{ margin: "0px", color: "#63C54A" }}>{name}</span>의 조건에 맞는 사료가 없습니다...
                </p>
                <p className={styles.emptyMessage}>더 많은 사료를 준비해 찾아뵙겠습니다!</p>
            </div>
        );
    }

    const onClick = (prodCode) => {
        navigate ("/productdetail", {
                state: {
                    prodCode: prodCode,
                    age: age,
                    disease: disease,
                    ingra: ingra,
                    allergy: allergy,
                    cook: cook,
                    size: size
                } 
            });
        };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ko-KR').format(price);
    };


    return (
        <div className={styles.mainBox}>
            <div className={styles.titleBox}>
                <p style={{ fontSize: '36px', fontWeight: 'bold' }}>DogSeek</p>
                <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#63C54A', paddingLeft: '10px' }}>Recommend</p>
            </div>
            <div className={styles.nameBox}>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#63C54A', margin: '0' }}>{name}</p>
                <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '0' }}>에게 어울리는 사료는?</p>
            </div>
            <p style={{color:"red", fontSize:"10px", margin: "0", fontWeight:"bold", marginLeft:"114px"}}>*해당 결과는 My Page에 있는 My Dog을 통해 재확인 가능합니다*</p>
            <div className={styles.productsBox}>
                {products.map(product => (
                    <div key={product.prodCode} className={styles.productBox}>
                        <div style={{width:"100%", marginLeft:"10%"}}>
                            <img className={styles.imgBox} src={product.prodImage} alt={product.prodName} />
                            <div className={styles.textBox}>
                                <p className={styles.text}>평점</p>
                                <div style={{ marginLeft: '10px' }}>
                                    <img
                                        src={getStarImage(product.prodGrade)}
                                        alt={`${product.prodGrade} stars`}
                                    />
                                </div>
                            </div>
                            <div className={styles.textBox1}>
                                <p className={styles.text}>제조사</p>
                                <div className={styles.productText}>{product.prodManufac}</div>
                            </div>
                            <div className={styles.textBox1}>
                                <p className={styles.text}>제품명</p>
                                <div className={styles.productText}>{product.prodName}</div>
                            </div>
                            <div className={styles.textBox1}>
                                <p className={styles.text}>가격</p>
                                <div className={styles.productText}>￦{formatPrice(product.prodPrice)}</div>
                            </div>
                            <div className={styles.textBox1}>
                                <p className={styles.text}>제품기능</p>
                                <div className={styles.productText}>{product.prodEffi}</div>
                            </div>
                            <button className={styles.detailButton} onClick={() => onClick(product.prodCode)}>상세보기</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CurationResult;
