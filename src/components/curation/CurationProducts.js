import { useState, useEffect } from "react";
import styles from "./CurationProducts.module.css";

function CurationProducts({age, allergy, disease, ingra, cook, name}) {

    const [products, setProducts] = useState([]);

    const curationProducts = async () => {

        const url = `http://localhost:8080/curation?curationAge=${age}&curationIngra=${ingra}&curationDisease=${disease}&curationAllergy=${allergy}&curationCook=${cook}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Controll-Allow-Origin': '*',
            }
        }).then(res => res.json());
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


    return(
        <div className={styles.mainBox}>
            {products.map (product => (
                <tr key={product.prodCode} className={styles.productBox}>
                    <td style={{overflow:"hidden"}}>{product.prodImage}</td>
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
    );
}

export default CurationProducts;