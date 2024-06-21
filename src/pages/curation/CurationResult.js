import styles from './CurationResult.module.css'
import Loding from '../../components/common/Loding';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GetAPI, PostAPI } from '../../api/RestAPIs';

function CurationResult() {

    const location = useLocation();

    const { name } = location.state;
    const { gender } = location.state;
    const { breed } = location.state;
    const { weight } = location.state;
    const { size }  = location.state;
    const { age } = location.state;
    const { neut } = location.state;
    const { allergy } = location.state;
    const { disease } = location.state;
    const { ingra } = location.state;
    const { cook } = location.state;

    // const [loding, setLoding] = useState(true);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //     setLoding(false);
    //     }, 5000); 
        
    //     return () => clearTimeout(timer); 
    // }, []);
    
    // if (loding) {
    //     return <Loding />;
    // }

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const toDate = `${year}-${month}-${day}`;

    const [curation, setCuration] = useState({
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
        userCode: 1,
    });

    const [products, setProducts] = useState([]);
    const curtaionInsert = async () => {

        const address = '/curation';

        const response = await PostAPI(address, curation)
    };

    useEffect (() => {
        curtaionInsert();
    }, []);

    const curationProducts = async () => {

        const address = `/curation?curationAge=${age}&curationIngra=${ingra}&curationDisease=${disease}&curationAllergy=${allergy}&curationCook=${cook}`;

        const response = await GetAPI(address, age, disease, ingra, cook, name)

        const result = await response.curationProducts;
        
        return result;
    };

    useEffect(() => {
        curationProducts().then(res => setProducts(res));
    }, [age, allergy, disease, ingra, cook]);

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
                return 0;
        }
    };

    if (products.length === 0 ) {
        return <div className={styles.emptyMessageBox}>
            <img src="/images/curation/3716655.jpg" style={{width: "500px", margin: "0 auto"}}></img>
            <a style={{fontSize:'5px', color:'black'}}>출처 freepik</a>
            <p className={styles.emptyMessage}>죄송합니다... 현재는 <p style={{margin:"0px", color:"#63C54A"}}>{name}</p>의 조건에 맞는 사료가 없습니다...</p>
            <p className={styles.emptyMessage}>더 많은 사료를 준비해 찾아뵙겠습니다!</p>
        </div>
    }

    return (
        <div className={styles.mainBox}>
            <div className={styles.titleBox}>
                <p style={{fontSize:'36px', fontWeight:'bold'}}>DogSeek</p>
                <p style={{fontSize:'36px', fontWeight:'bold', color:'#63C54A', paddingLeft:'10px'}}>Recommend</p>
            </div>
            <div className={styles.nameBox}>
                <p style={{fontSize:'32px', fontWeight:'bold', color:'#63C54A', margin:'0'}}>{name}</p>
                <p style={{fontSize:'32px', fontWeight:'bold', margin:'0'}}>에게 어울리는 사료는?</p>
            </div>
            <div className={styles.productsBox}>
                <div className={styles.mainBox1}>
                {products.map (product => (
                    <tr key={product.prodCode} className={styles.productBox}>
                        <td style={{overflow:"hidden"}}>
                            <img src={product.prodImage}></img>
                            </td>
                        <div className={styles.textBox}>
                            <p className={styles.text}>평점</p>
                            <td style={{marginLeft:'10px'}}> {product.prodGrade && (
                                <img
                                    src={getStarImage(product.prodGrade)}
                                    alt={`${product.prodGrade} stars`}
                                    />
                            )}
                            </td>
                        </div>
                        <div className={styles.textBox1}>
                            <p className={styles.text}>제조사 - </p>
                            <td className={styles.productText}>{product.prodManufac}</td>
                        </div>
                        <div className={styles.textBox1}>
                            <p className={styles.text}>제품명 - </p>
                            <td className={styles.productText}>{product.prodName}</td>
                        </div>
                        <div className={styles.textBox1}>
                            <p className={styles.text}>가격 - </p>
                            <td className={styles.productText}>{product.prodPrice}</td>
                        </div>
                        <div className={styles.textBox1}>
                            <p className={styles.text}>제품기능 - </p>
                            <td className={styles.productText}>{product.prodEffi}</td>
                        </div>
                        <button className={styles.detailButton}>상세보기</button>
                    </tr>
                ))}
                </div>
            </div>
        </div>        
    )
}

export default CurationResult;