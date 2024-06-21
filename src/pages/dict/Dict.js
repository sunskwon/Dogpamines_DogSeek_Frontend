import styles from './dict.module.css';
import {useState, useEffect} from "react";


function Dict(){
    
    const [isSmallModalOpen, setIsSmallModalOpen] = useState(false);
    const [isMediumModalOpen, setIsMediumModalOpen] = useState(false);
    const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);

    const toggleSmallModal = () => {
        setIsSmallModalOpen(prevState => !prevState);
    };
    const toggleMediumModal = () => {
        setIsMediumModalOpen(prevState => !prevState);
    };
    const toggleLargeModal = () => {
        setIsLargeModalOpen(prevState => !prevState);
    };


    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/dict'); // 실제 백엔드 API 엔드포인트로 교체
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
      }, []);

    return(
        <>
        <div className={styles.container1}>
            <div className={styles.title}>
                <span className={styles.titletext1}> 견종에 대해 찾아보세요.</span>
                <span className={styles.titletext2}>반려견 품종의 특징과 요구사항에 대한 전문적인 정보를 찾아보세요. <br/> 
                스크롤 또는 검색 기능을 사용해 원하는 견종에 대한 정보를 찾을 수 있습니다. </span>
                <img className={styles.img} src='./images/dict/1. 상단_사진.png'/>
        <input className={styles.search} placeholder='   search'></input>
            </div>
        </div>
 
        <div className={styles.container2}>
        <hr color="D4D4D4"/>
            <button className={styles.size} onClick={toggleSmallModal}>
                소형
            </button>

                {isSmallModalOpen &&
            <div className={styles.grid}>
                <div className={styles.modalContainer} >
                    소형견
                </div>
                <div className={styles.modalContainer} >
                    소형견
                </div>
                <div className={styles.modalContainer} >
                    소형견
                </div>
                <div className={styles.modalContainer} >
                    소형견
                </div>
                <div className={styles.modalContainer} >
                    소형견
                </div>
            </div>}

        </div>
        <div className={styles.container2}>
        <hr color="D4D4D4"/>
            <button className={styles.size} onClick={toggleMediumModal}>
                중형
            </button>

            {isMediumModalOpen &&
            <div className={styles.grid}>
                <div className={styles.modalContainer} >
                   중형견 종류
                </div>
                <div className={styles.modalContainer} >
                   중형견 종류
                </div>
                <div className={styles.modalContainer} >
                   중형견 종류
                </div>
                <div className={styles.modalContainer} >
                   중형견 종류
                </div>
                <div className={styles.modalContainer} >
                   중형견 종류
                </div>
            </div>}

        </div>
        <div className={styles.container2}>
        <hr color="D4D4D4"/>
            <button className={styles.size} onClick={toggleLargeModal}>
                대형
            </button>

            {isLargeModalOpen &&
            <div className={styles.grid}>
                <div className={styles.modalContainer} >
                   대형견 종류
                </div>
            </div>}

        </div>
    
        </>
    )
}

export default Dict;