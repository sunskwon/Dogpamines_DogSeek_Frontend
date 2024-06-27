import styles from './Mydog.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from "react";
import { GetAPI } from '../../api/RestAPIs';

function Mydog() {
    const navigate = useNavigate();
    const userCode = 1;

    const [modalOpen, setModalOpen] = useState(false);
    const [modalCuration, setModalCuration] = useState(null);
    const modalBackground = useRef();

    const openModal = (curationDog) => {
        setModalCuration(curationDog);
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalCuration(null);
        setModalOpen(false);
    };

    const [curations, setCurations] = useState([]);
    const [curationsDog, setCurationsDog] = useState([]);
    const [curationCode, setCurationCode] = useState([]);
    const [curationName, setCurationName] = useState([]);

    const fetchCurations = async () => {
        const curationsAddress = `/curations?userCode=${userCode}`;
        const curationsResponse = await GetAPI(curationsAddress);
        const result = await curationsResponse.curations;

        // if (curationsResponse.curations.length > 0) {
        //     const curationNames = curationsResponse.curations.map(curation => curation.curationName);
        //     setCurationName(curationNames.join(',')); 
        // }

        return result;
    };

    const fetchCurationsDog = async () => {
        const curationsDogAddress = `/curationsDog?userCode=${userCode}&curationName=${curationName}`;
        const curationsDogResponse = await GetAPI(curationsDogAddress);
        const result = await curationsDogResponse.curationsDog;

        if (curationsDogResponse.curationsDog.length > 0) {
            const curationCodes = curationsDogResponse.curationsDog.map(curationDog => curationDog.curationCode);
            setCurationCode(curationCodes.join([','])); 
        }

        return result;
    };

    useEffect(() => {
        fetchCurations().then(res => setCurations(res));
    }, [userCode]);

    useEffect(() => {
        if (curationName) {
            fetchCurationsDog().then(res => setCurationsDog(res));
        }
    }, [curationName]);

    const onClick = (name, code) => {
        setCurationName(name);
        setCurationCode(code);
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
                    {curationsDog.map(curationDog => (
                        <div className={styles.resultBox} key={curationDog.curationCode}>
                            <span className={styles.span2}>{curationDog.curationName}</span>
                            <span className={styles.span3}>{curationDog.curationDate}</span>
                            <div className={styles.btnWrapper}>
                                <button type='button' className={styles.btn2} onClick={() => openModal(curationDog)}>상세보기</button>
                            </div>
                            <button className={styles.btn1}>맞춤사료</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {modalOpen && modalCuration && (
                <div className={styles.modalContainer} ref={modalBackground} onClick={e => {
                    if (e.target === modalBackground.current) {
                        closeModal();
                    }
                }}>
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
                                    <span className={styles.text9}>{modalCuration.curationDisease}</span>
                                </div>
                                <div className={styles.spanBox2}>
                                    <span className={styles.text7}>알러지 여부</span>
                                    <span className={styles.text9}>{modalCuration.curationAllergy}</span>
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
        </>
    )
}

export default Mydog;
