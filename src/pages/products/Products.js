import { GetAPI } from "../../api/RestAPIs";
import React, {useState, useEffect} from 'react';
import styles from "./Products.module.css"

function Products () {

    const [product, setProduct] = useState([]);

    const productsList = async () => {

        const productsListAddress = "/products"
        const productsListResponse = await GetAPI(productsListAddress);
        setProduct(productsListResponse.products);
    };

    useEffect(() => {
        productsList();
    }, []);
    

    return(
        <div style={{width:"1180px", margin:"0 auto"}}>
            <div className={styles.box}>
                <input type="text" className={styles.searchBox} placeholder="키워드를 입력해주세요"/>
                <select className={styles.selectBox}>
                    <option>정렬</option>
                    <option>이름</option>
                    <option>평점</option>
                </select>
            </div>
            <hr style={{width:"1180px", marginTop:"45px", border:"1px solid #D4D4D4"}}/>
            <div style={{display:"flex", marginTop:"50px", marginLeft:"100px"}}>
                <p style={{fontSize:"36px", fontWeight:"bold"}}>DogSeek</p>
                <p style={{fontSize:"36px", fontWeight:"bold", color:"#63C54A", marginLeft:"10px"}}>Most Recommend</p>
            </div>
            {product
                .map(product => (
                    <div key={product.prodCode}>
                        <img src={product.prodImage}/>
                    </div>
                ))
            }
        </div>
    )
}

export default Products;