import styles from './dict.module.css';
import {useState} from "react";


function Dict(){
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(prevState => !prevState);
    };


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
            <button className={styles.size} onClick={toggleModal}>
                소형
            </button>
            {isModalOpen &&
                <div className={'modal-container'}  id={styles.modalContainer}>
                   dfsdfsd
                </div>}

        </div>
        <div className={styles.container2}>
        <hr color="D4D4D4"/>
            <button className={styles.size}>
                중형
            </button>
        
        </div>
        <div className={styles.container2}>
        <hr color="D4D4D4"/>
            <button className={styles.size}>
                대형
            </button>
        </div>
    
        </>
    )
}

export default Dict;