import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from './Main.module.css'
import { useState, useEffect } from "react";
import { GetAPINotToken } from '../api/RestAPIs';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'
import 'swiper/css/autoplay';
import { Autoplay, Navigation } from 'swiper/modules';

function Main(){

    const navigate = useNavigate();

    const [most, setMost] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const mostProducts = async () => {

        const mostProductsAddress = "/products/mostProducts"
        const mostProductsResponse = await GetAPINotToken(mostProductsAddress);
        setMost(mostProductsResponse.products.Popular)
    };

    useEffect(() => {
        mostProducts();
    }, []);

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

    const curation = () => {
        const token = window.localStorage.getItem("accessToken")
        if(token != null) {
            navigate("/curation")
        } else {
            setModalOpen(true);
        }
    }

    if (modalOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }


    return(
        <>
            {
            modalOpen &&
                <div className={styles.modalContainer}>
                    <div className={styles.modalContent}>
                        <div className={styles.allBox}>
                            <div style={{marginTop:"80px"}}>
                                <p style={{margin:"0", color:"#005600", fontSize:"16px", fontWeight:"600"}}>로그인이 필요한 서비스입니다</p>
                                <p style={{margin:"0", color:"#005600", fontSize:"16px", fontWeight:"600"}}>로그인 페이지로 이동하시겠습니까?</p>
                            </div>
                            <div style={{display:"flex", width:"270px", gap:"30px", margin:"0 auto", marginTop:"60px"}}>
                                <button className={styles.modalCancelButton} onClick={() => setModalOpen(false)}>취소</button>
                                <button className={styles.modalCheckButton} onClick={() => navigate("login")}>이동</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className={styles.container}>
                <div className={styles.title}>
                    <p className={styles.title1}>Help your dogs<br/>
                    Health</p>
                    <div className={styles.button1} onClick={curation}>맞춤 사료 찾기</div>
                    <img className={styles.img1} src='./images/main/maindog1.png'/>
                </div>
            </div>
            <div className={styles.container1}>
                <hr className={styles.line1}/>
                <p className={styles.title2}>Our Services</p>
                <div className={styles.iconContainer}>
                    <div style={{display:"flex", flexDirection:"column", textAlign:"center"}}>
                        <NavLink to={'/dict'}>
                            <img className={styles.icon1} src='./images/main/Icon1.png' alt='견종백과'/>
                        </NavLink>
                        <Link to={'/dict'} className={styles.text1}>견종백과</Link>
                    </div>
                    <div style={{display:"flex", flexDirection:"column", textAlign:"center"}}>
                        <div onClick={curation}>
                            <img className={styles.icon1} src='./images/main/Icon2.png' alt='맞춤 사료 찾기'/>
                        </div>
                        <div onClick={curation} className={styles.text5}>맞춤사료찾기</div>
                    </div>
                    <div style={{display:"flex", flexDirection:"column", textAlign:"center"}}>
                        <NavLink to={'/board'}>
                            <img className={styles.icon1} src='./images/main/Icon3.png' alt='게시판'/>
                        </NavLink>
                        <Link to={'/board'} className={styles.text6}>게시판</Link>
                    </div>
                    <div style={{display:"flex", flexDirection:"column", textAlign:"center"}}>
                        <NavLink to={'/animalinfo'}>
                            <img className={styles.icon1} src='./images/main/vector.png' alt='반려견 등록 확인'/>
                        </NavLink>
                        <Link to={'/animalinfo'} className={styles.text6}>반려견 등록 확인</Link>
                    </div>
                </div>
            </div>
            <div className={styles.container2}>
                <hr className={styles.line2}/>
                <span className={styles.title3}>User's</span>
                <span className={styles.title4}> Best</span>
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
            </div>
            <Link to={'/products'} className={styles.button2}>사료 검색하기</Link>
            <div className={styles.container2}>
                <hr className={styles.line3}></hr>
                <div className={styles.dogsContainer}>
                    <p className={styles.title5}>About Dogs</p>
                    <img className={styles.img2} src='./images/main/maindog2.png'/>
                    <div className={styles.dogsdoc}>
                        <p className={styles.text3}>
                        강아지마다 특징과 필요로 하는 것이 다릅니다.<br/>
                        동일한 품종이라고 해도 반려동물마다 다르기 때문에 여기에서<br/>
                        소개하는 품종 세부 사항은 하나의 지표로 받아들여야 합니다. <br/>
                        행복하고 건강하며 행동이 올바른 반려동물을 기르고 싶다면 훈련과 <br/>
                        사회화는 물론이고 기본적인 행복과 관련된 요구를 비롯해 <br/>
                        사회적, 행동적 요구까지 해결해주는 것이 좋습니다.<br/>
                        </p>
                    <Link to={'/dict'} className={styles.button3}>더 알아가기</Link>
                    </div>
                </div>
            </div>
            <div className={styles.container2}>
                <hr className={styles.line4}></hr>
                <NavLink to={'/board'}>
                    <img className={styles.img3} src='./images/main/boards1.png' />
                </NavLink>
            </div>
            <div className={styles.container2}>
                <hr className={styles.line5}></hr>
                <div className={styles.companyinfo}>
                    <img className={styles.logo1} src='./images/etc/logo1.png'/>
                    <div className={styles.companyinfodoc}>
                        <p className={styles.title6}>About DogSeek</p>
                        <p className={styles.text4}>반려견의 취향 혹은 필요한 요소 등을 통해 <br/>
                        적합한 사료를 추천해주는 큐레이션 서비스를 제공하는 사이트 입니다.</p>
                        <Link to={'/company'} className={styles.button4}>회사 소개</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main;