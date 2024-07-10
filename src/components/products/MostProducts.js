import styles from './MostProducts.module.css'
import { GetAPINotToken } from "../../api/RestAPIs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from 'swiper/modules';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const MostProducts = () => {

    const navigate = useNavigate();
    const [most, setMost] = useState([]);
    
    const mostProducts = async () => {

        const mostProductsAddress = "/products/mostProducts"
        const mostProductsResponse = await GetAPINotToken(mostProductsAddress);
        setMost(mostProductsResponse.products.Popular)
    };

    useEffect(() => {
        mostProducts();
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ko-KR').format(price);
    };

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

    const onClick = (prodCode, age, size, cook, prodIngra, prodEffi) => {
        const ingra = prodIngra.split(",")[0];
        const disease = prodEffi.split(",")[0];
        navigate ("/productdetail", {
            state: {
                prodCode: prodCode,
                age: age,
                size: size,
                cook: cook,
                ingra: ingra,
                disease: disease,
                allergy: ""
            } 
        });
    };


    return(
        <div style={{width:"940px", margin:"0 auto"}}>
            <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={30}
                slidesPerView={3}
                autoplay={true}
                navigation={{ clickable: true }}
                className="mySwiper"
                style={{"--swiper-theme-color":"#63C54A"}}
            >
            {most
            .slice(0, 10)
            .map(most => (
                <SwiperSlide  key={most.prodCode}>
                    <div className={styles.productsBox2} onClick={() => onClick(most.prodCode, most.prodAge, most.prodRecom, most.prodCook, most.prodIngra, most.prodEffi)}>
                        <img src={most.prodImage} style={{width:"282px"}}/>
                        <div className={styles.productHover}>
                            <div style={{display:"flex", justifyContent:"center", marginTop:"70px"}}>
                                <p style={{color:"white", fontWeight:"bold"}}>가격</p>
                                <p style={{color:"white", marginLeft:"10px", fontWeight:"bold"}}>￦{formatPrice(most.prodPrice)}</p>
                            </div>
                            <div style={{display:"flex", justifyContent:"center"}}>
                                <p style={{color:"white", fontWeight:"bold"}}>제조사</p>
                                <p style={{color:"white", marginLeft:"10px", fontWeight:"bold"}}>{most.prodManufac}</p>
                            </div>
                        </div>
                        <div style={{display:"flex"}}>
                            <p style={{margin:"0", fontSize:"16px", fontWeight:"bold"}}>평점</p>
                            <img style={{width:"79px", height:"15px", marginTop:"5px", marginLeft:"10px"}} src={getStarImage(most.prodGrade)} alt={`${most.prodGrade} stars`}/>
                        </div>
                        <div style={{display:"flex"}}>
                            <p style={{margin:"0", fontSize:"16px", fontWeight:"bold", width:"55px"}}>제품명</p>
                            <p className={styles.prodText}>{most.prodName}</p>
                        </div>
                        <div style={{display:"flex"}}>
                            <p style={{margin:"0", fontSize:"16px", fontWeight:"bold", width:"78px"}}>제품기능</p>
                            <p className={styles.prodText}>{most.prodEffi}</p>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
            </Swiper>
            </div>
    );
}

export default MostProducts;