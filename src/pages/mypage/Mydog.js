import styles from './Mydog.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from "react";
import { GetAPI } from '../../api/RestAPIs';

function Mydog(){

        const navigate = useNavigate();
        const location = useLocation();

        const userCode = 1;
        
        const [modalOpen, setModalOpen] = useState(false);
        const modalBackground = useRef();

        const [curations, setCurations] = useState([]);
        const [curationsDog, setCurationsDog] = useState([]);
        const [curationCode, setCurationCode] = useState([]);
        const [curationName, setCurationName] = useState('');

        const fetchCurations = async () => {
            const curationsAddress = `/curations?userCode=${userCode}`;
            const curationsResponse = await GetAPI(curationsAddress);
            setCurations(curationsResponse.curations);

            if (curationsResponse.curations.length > 0) {
                setCurationName(curationsResponse.curations[0].curationName);
            }

        };
           
        const fetchCurationsDog = async (name) => {

            const curationsDogAddress = `/curationsDog?userCode=${userCode}&curationCode=${curationCode}&curationName=${name}`;
            const curationsDogResponse = await GetAPI(curationsDogAddress);
            setCurationsDog(curationsDogResponse.curationsDog);
            
        };

        console.log(userCode);
        console.log(curationName);
        console.log(curationCode);
    
        useEffect(() => {
            fetchCurations();
        }, [userCode]);
    
        useEffect(() => {
            if (curationName) {
                fetchCurationsDog(curationName);
            }
        }, [curationName]);
    
        const onClick = (name) => {
            setCurationName(name);
            navigate('/mydog', {
                state: {
                    userCode: userCode,
                    curationCode: curationCode,
                    curationName: name
                }
            });
        };

    return(
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
                    <hr className={styles.line1}/>
                    <span className={styles.text5}>반려견 정보</span>
            {curations.map (curation => (
                    <div className={styles.linkContainer} key={curation.userCode}>
                       <button className={styles.text4} name={curation.curationName} onClick={() => onClick(curation.curationName)}>{curation.curationName}</button>
                    </div>
                ))}
                    <Link to={'/curation'} className={styles.text4}>+ 반려견 추가 등록</Link>
                    <hr className={styles.line3}/>
                </div>
            <div className={styles.container2}>
                <div className={styles.spanBox}>
                    <span className={styles.span1}>이름</span>
                    <span className={styles.span1}>작성일</span>
                    <span className={styles.span1}>상세보기</span>
                    <span className={styles.span1}>맞춤사료</span>
                </div>
                    <hr className={styles.line4}/>
                    {curationsDog.map (curationDog => (
                        <div className={styles.resultBox} key={curationDog.userCode}>
                            <span className={styles.span2}>{curationDog.curationName}</span>
                            <span className={styles.span3}>{curationDog.curationDate}</span>
                            <div className={styles.btnWrapper}>
                                <button className={styles.btn2} onClick={() => setModalOpen(true)}>상세보기</button>
                            </div>
                                {
                                    modalOpen &&
                                        <div className={styles.modalContainer} ref={modalBackground} onClick={e => {
                                            if (e.target === modalBackground.current) {
                                                setModalOpen(false)
                                            }
                                        }}>
                                            <div className={styles.modalContent}>
                                                <div className={styles.modalTextContainer}>
                                                    <p className={styles.modalText1}>{`회원님 반려견 ${curationDog.curationName}의 정보입니다.`}</p>
                                                    <hr/>
                                                </div>
                                                <div className={styles.modalTextContainer2}>
                                                    <div className={styles.spanBox1}>
                                                        <div className={styles.spanBox2}>
                                                            <span className={styles.text6}>이름</span>
                                                            <span className={styles.text8}>{curationDog.curationName}</span>
                                                        </div>
                                                        <div className={styles.spanBox2}>
                                                            <span className={styles.text6}>견종</span>
                                                            <span className={styles.text8}>{curationDog.curationBreed}</span>
                                                        </div>
                                                        <div  className={styles.spanBox2}>
                                                            <span className={styles.text6}>나이</span>
                                                            <span className={styles.text8}>{curationDog.curationAge}</span>
                                                        </div>
                                                        <div className={styles.spanBox2}>
                                                            <span className={styles.text6}>체형</span>
                                                            <span className={styles.text8}>{curationDog.curationSize}</span>
                                                        </div>
                                                        <div  className={styles.spanBox2}>
                                                            <span className={styles.text6}>중성화 여부</span>
                                                            <span className={styles.text8}>{curationDog.curationNeut}</span>
                                                        </div>
                                                    </div>
                                                    <hr className={styles.modalLine1}/>
                                                    <div className={styles.spanBox1}>
                                                        <div className={styles.spanBox2}>
                                                            <span className={styles.text7}>몸무게</span>
                                                            <span className={styles.text9}>{curationDog.curationWeight}</span>
                                                        </div>
                                                        <div className={styles.spanBox2}>
                                                            <span className={styles.text7}>질병 여부</span>
                                                            <span className={styles.text9}>{curationDog.curationDisease}</span>
                                                        </div>
                                                        <div className={styles.spanBox2}>
                                                            <span className={styles.text7}>알러지 여부</span>
                                                            <span className={styles.text9}>{curationDog.curationAllergy}</span>
                                                        </div>
                                                        <div className={styles.spanBox2}>
                                                            <span className={styles.text7}>선호 식재료</span>
                                                            <span className={styles.text9}>{curationDog.curationIngra}</span>
                                                        </div>
                                                        <div className={styles.spanBox2}>
                                                            <span className={styles.text7}>선호 조리방식</span>
                                                            <span className={styles.text9}>{curationDog.curationCook}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className={styles.modalCloseBtn} onClick={() => setModalOpen(false)}>닫기</button>
                                            </div>
                                    </div>}
                                <button className={styles.btn1}>맞춤사료</button>
                            </div>
                        ))}
            </div>
        </div>
        </>
    )
}

export default Mydog;