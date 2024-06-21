import styles from './Dict.module.css';
import {useState, useEffect} from "react";


function Dict({}){
    
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

    const [dogs, setDogs] = useState([]);
    
    
    useEffect(() => {
        const fetchDogs = async () => {
        try{
            const response = await fetch('http://localhost:8080/dict', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const data = await response.json();
            setDogs(data);
        }catch (error) {
            console.error('데이터를 불러오는데 실패하였습니다.', error);
        }
    };
        
        fetchDogs();

    }, []);

    const filterDogBySize = (size) => {
        return dogs.filter(dog => dogs.dogSize === size);
    }

    return(
        <>
        <div className={styles.container1}>
            <div className={styles.title}>
                <span className={styles.titletext1}> 견종에 대해 찾아보세요.</span>
                <span className={styles.titletext2}>반려견 품종의 특징과 요구사항에 대한 전문적인 정보를 찾아보세요. <br/> 
                스크롤 또는 검색 기능을 사용해 원하는 견종에 대한 정보를 찾을 수 있습니다. </span>
                <img className={styles.img} src='./images/dict/1. 상단_사진.png'/>
        <input className={styles.search} placeholder='search'></input>
            </div>
        </div>
 
        <div className={styles.container2}>
        <hr color="D4D4D4"/>
            <button className={styles.size} onClick={toggleSmallModal}>
                소형
            </button>

                {isSmallModalOpen &&
            <div className={styles.grid}>
                {filterDogBySize('소형견').map((dog, index) => (
                    <div className={styles.modalConainer} key={index}>
                        {dog.dogName}
                    </div>
                ))}
                </div>
                }

        </div>
        <div className={styles.container2}>
        <hr color="D4D4D4"/>
            <button className={styles.size} onClick={toggleMediumModal}>
                중형
            </button>

            {isMediumModalOpen &&
            <div className={styles.grid}>
                {filterDogBySize('중형견').map((dog, index) => (
                    <div className={styles.modalConainer} key={index}>
                        {dog.dogName}
                    </div>
                ))}
                </div>
                }

        </div>
        <div className={styles.container2}>
        <hr color="D4D4D4"/>
            <button className={styles.size} onClick={toggleLargeModal}>
                대형
            </button>

            {isLargeModalOpen &&
            <div className={styles.grid}>
                {filterDogBySize('대형견').map((dog, index) => (
                    <div className={styles.modalConainer} key={index}>
                        {dog.dogName}
                    </div>
                ))}
                </div>
                }

        </div>
    
        </>
    )
}

export default Dict;