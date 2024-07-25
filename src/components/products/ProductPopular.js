import React, { useState, useEffect } from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation'

import { GetAPIwoToken } from "../../api/RestAPIs";

import ProductCard from './ProductCard';

import styles from './ProductPopular.module.css'

const MostProducts = () => {

    const [mostList, setMostList] = useState([]);

    useEffect(() => {

        const fetch = async () => {

            const response = await GetAPIwoToken('/products/most');

            return response.products.slice(0, 10);
        };

        fetch().then(res => setMostList(res));
    }, []);

    return (
        <div className={styles.container}>
            <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={0}
                slidesPerView={4}
                autoplay={true}
                navigation={{ clickable: true }}
                className="mySwiper"
                style={{ "--swiper-theme-color": "#63C54A" }}
            >
                {mostList.map(most => (
                    <SwiperSlide key={most.prodCode}>
                        <ProductCard
                            product={most}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default MostProducts;