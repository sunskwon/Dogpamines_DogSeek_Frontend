import styles from './Mydog.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from "react";
import { GetAPI } from '../../api/RestAPIs';
import { jwtDecode } from 'jwt-decode';

function Mydog() {
    const navigate = useNavigate();

    // 토큰 디코딩
    const decodedToken = jwtDecode(window.localStorage.getItem("accessToken"));

    const userCode = decodedToken.userCode;
    const userNick = decodedToken.userNick;
    const userAuth = decodedToken.userAuth;

    const [modalOpen, setModalOpen] = useState(false);
    const [modalCuration, setModalCuration] = useState(null);
    const [curations, setCurations] = useState([]);
    const [curationsDog, setCurationsDog] = useState([]);
    const [curationCode, setCurationCode] = useState([]);
    const [curationName, setCurationName] = useState([]);
    const [prodCode, setProdCode] = useState([]);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [modalProd, setModalProd] = useState(null);
    const [myCurationResult , setMyCurationResult] = useState([]);
    
    const modalBackground = useRef();

    const openModal = (curationDog,curationCode) => {
        setModalCuration(curationDog);
        setCurationCode(curationCode);
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalCuration(null);
        setModalOpen(false);
    };


    const openModal2 = (curationDog) => {
        setModalProd(curationDog);
        fetchMyCurationResult(curationDog.curationCode);
        setModalOpen2(true);
    }

    const closeModal2 = () => {
        setModalProd(null);
        setModalOpen2(false);
    }

    const fetchCurations = async () => {
        const curationsAddress = `/curations?userCode=${userCode}`;
        const curationsResponse = await GetAPI(curationsAddress);
        const result = await curationsResponse.curations;
        
        return result;
    };

    const fetchCurationsDog = async () => {
        const curationsDogAddress = `/curationsDog?userCode=${userCode}&curationName=${curationName}`;
        const curationsDogResponse = await GetAPI(curationsDogAddress);
        const result = await curationsDogResponse.curationsDog;

        return result;
    };

    const fetchMyCurationResult = async (code) => {
        const myCurationResultAddress = `/mycurationresult?curationCode=${code}`;
        const mycurationresultResponse = await GetAPI(myCurationResultAddress);
        const result = await mycurationresultResponse.mycurationresult;

        if (mycurationresultResponse && mycurationresultResponse.myCurationResult && Array.isArray(mycurationresultResponse.data.myCurationResult)) {
            const prodCodes = mycurationresultResponse.data.myCurationResult.map(myCurationResult => myCurationResult.prodCode);
            setProdCode(prodCodes.join([',']));
        }

        setMyCurationResult(result || []);
    };

    useEffect(() => {
        fetchCurations().then(res => setCurations(res));
    }, [userCode]);

    useEffect(() => {
        if (curationName) {
            fetchCurationsDog().then(res => setCurationsDog(res));
        }
    }, [curationName]);

    useEffect(() => {
        if (modalBackground.state || modalOpen || modalOpen2) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [modalOpen, modalOpen2]);

    const onClick = (name, code) => {
        setCurationName(name);
        setCurationCode(code);
    };

    const handleDetail = (prodCode,  age, size, cook, prodIngra, prodEffi) =>{
        const ingra = prodIngra.split(",")[0];
        const disease = prodEffi.split(",")[0];
        navigate("/productdetail", {
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

    return (
        <>
            <div className={styles.container}>
                <div className={styles.container1}>
                    <div className={styles.title}>
                        <span className={styles.text1}>가입정보</span>
                        <Link to={'/mypage'} className={styles.text2}>My Page</Link>
                        <Link to={'/mydog'} className={styles.text3}>My Dog</Link>
                    </div>
                </div>
                <div className={styles.container2}>
                    <hr className={styles.line1} />
                    <span className={styles.text5}>반려견 정보</span>
                    {curations.filter((arr, index, callback) => index === callback.findIndex((curation) => curation.curationName === arr.curationName )).map(curation => (
                        <div className={styles.linkContainer} key={curation.userCode}>
                            <button className={styles.text4} onClick={() => onClick(curation.curationName, curation.curationCode)}>{curation.curationName}</button>
                        </div>
                    ))}
                    <Link to={'/curation'} className={styles.text4}>+ 반려견 추가 등록</Link>
                    <hr className={styles.line3} />
                </div>
                <div className={styles.container2}>
                    <div className={styles.spanBox}>
                        <span className={styles.span1}>이름</span>
                        <span className={styles.span1}>작성일</span>
                        <span className={styles.span1}>상세보기</span>
                        <span className={styles.span1}>맞춤사료</span>
                    </div>
                    <hr className={styles.line4} />
                    {curationsDog.length === 0 ? (
                        <>
                            <div className={styles.emptyMessage}>
                                <p>현재 등록된 반려견이 없습니다.</p>
                            </div>
                        </>
                    ) : (
                            curationsDog.map(curationDog => (
                            <div className={styles.resultBox} key={curationDog.curationCode}>
                                <span className={styles.span2}>{curationDog.curationName}</span>
                                <span className={styles.span3}>{curationDog.curationDate}</span>
                                <div className={styles.btnWrapper}>
                                    <button type='button' className={styles.btn2} onClick={() => openModal(curationDog, curationDog.curationCode)}>상세보기</button>
                                </div>
                                    <button className={styles.btn1} onClick={() => openModal2(curationDog)}>맞춤사료</button>
                            </div>
                        )) 
                    )}
                </div>
            </div>

            {/* Modal */}
            {modalOpen && modalCuration && (
                <div className={styles.modalContainer} ref={modalBackground}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalTextContainer}>
                            <p className={styles.modalText1}>{`회원님 반려견 ${modalCuration.curationName}의 정보입니다.`}</p>
                            <hr />
                        </div>
                        <div className={styles.modalTextContainer2}>
                            <div className={styles.spanBox1}>
                                <div className={styles.spanBox2}>
                                    <span className={styles.text6}>이름</span>
                                    <span className={styles.text8}>{modalCuration.curationName}</span>
                                </div>
                                <div className={styles.spanBox2}>
                                    <span className={styles.text6}>견종</span>
                                    <span className={styles.text8}>{modalCuration.curationBreed}</span>
                                </div>
                                <div className={styles.spanBox2}>
                                    <span className={styles.text6}>나이</span>
                                    <span className={styles.text8}>{modalCuration.curationAge}</span>
                                </div>
                                <div className={styles.spanBox2}>
                                    <span className={styles.text6}>체형</span>
                                    <span className={styles.text8}>{modalCuration.curationSize}</span>
                                </div>
                                <div className={styles.spanBox2}>
                                    <span className={styles.text6}>중성화 여부</span>
                                    <span className={styles.text8}>{modalCuration.curationNeut}</span>
                                </div>
                            </div>
                            <hr className={styles.modalLine1} />
                            <div className={styles.spanBox1}>
                                <div className={styles.spanBox2}>
                                    <span className={styles.text7}>몸무게</span>
                                    <span className={styles.text9}>{modalCuration.curationWeight}</span>
                                </div>
                                <div className={styles.spanBox2}>
                                    <span className={styles.text7}>질병 여부</span>
                                    <span className={styles.text9}>{modalCuration.curationDisease || '없음'}</span>
                                </div>
                                <div className={styles.spanBox2}>
                                    <span className={styles.text7}>알러지 여부</span>
                                    <span className={styles.text9}>{modalCuration.curationAllergy || '없음'}</span>
                                </div>
                                <div className={styles.spanBox2}>
                                    <span className={styles.text7}>선호 식재료</span>
                                    <span className={styles.text9}>{modalCuration.curationIngra}</span>
                                </div>
                                <div className={styles.spanBox2}>
                                    <span className={styles.text7}>선호 조리방식</span>
                                    <span className={styles.text9}>{modalCuration.curationCook}</span>
                                </div>
                            </div>
                        </div>
                        <button className={styles.modalCloseBtn} onClick={closeModal}>닫기</button>
                    </div>
                </div>
            )}

            {/* Modal2 */}
            {modalOpen2 && modalProd && (
                <div className={styles.modalContainer} ref={modalBackground}>
                    <div className={styles.modalContent2} key={modalProd.prodCode}>
                        <div className={styles.modalTextContainer}>
                            {myCurationResult.length === 0 ? (
                                <>
                                     <p className={styles.modalText1}>{`회원님 반려견 ${modalProd.curationName}의 맞춤사료 정보입니다.`}</p>
                                     <hr/>
                                     <div className={styles.wrapBox1}>
                                        <div>
                                        <img src="/images/curation/cuteDog.png" style={{ width: "200px", margin: "0 auto" }} alt="Empty message" />
                                        <p className={styles.emptyMessage}>
                                            죄송합니다. 현재는 &nbsp;<p style={{ margin: "0px", color: "#63C54A" }}>{modalProd.curationName}</p>의 조건에 맞는 사료가 없습니다.
                                        </p>
                                        <p className={styles.emptyMessage}>더 많은 사료를 준비해 찾아뵙겠습니다!</p>
                                        </div>
                                     </div>
                                    <button className={styles.modalCloseBtn} onClick={closeModal2}>닫기</button>
                                </>
                            ) : (
                                <>
                                    <p className={styles.modalText1}>{`회원님 반려견 ${modalProd.curationName}의 맞춤사료 정보입니다.`}</p>
                                    <hr />
                                    <div className={styles.wrapBox}>
                                        {myCurationResult.map(prod => (
                                            <div className={styles.prodContainer} key={prod.prodCode}>
                                                <img src={prod.prodImage} alt="ProductImage" className={styles.prodImage} />
                                                <div className={styles.prodContent}>
                                                    <p className={styles.prodName}>{prod.prodName}</p>
                                                    <p className={styles.prodName}>{prod.prodManufac}</p>
                                                    <p className={styles.prodName}>{formatPrice(prod.prodPrice)}원</p>
                                                    <button className={styles.prodBtn} onClick={() => handleDetail(prod.prodCode, prod.prodAge, prod.prodRecom, prod.prodCook, prod.prodIngra, prod.prodEffi)}>상세보기</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className={styles.modalCloseBtn} onClick={closeModal2}>닫기</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Mydog;
