import React, {useState, useEffect} from "react";
import { GetAPI } from '../../api/RestAPIs';
import styles from'./AnimalRegist.module.css';

function AnimalRegist() {


    const [numberType, setNumberType] = useState('등록 번호');
    const [ownerType, setOwnerType] = useState('소유주');
    const [dogRegNo, setDogRegNo] = useState('');
    const [rfidCd, setRfidCd] = useState('');
    const [ownerNm, setOwnerNm] = useState('');
    const [ownerBirth, setOwnerBirth] = useState('');
    const [animalData, setAnimalData] = useState(null);
    const [error, setError] = useState('');


    const handleNumberTypeChange = (e) => {
        setNumberType(e.target.value);
        setDogRegNo('');
        setRfidCd('');
    };

    const handleOwnerTypeChange = (e) => {
        setOwnerType(e.target.value);
        setOwnerNm(''); 
        setOwnerBirth('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let address = '/animalRegist'; 

        if (numberType === '등록 번호' && dogRegNo) {
            address += `?dogRegNo=${encodeURIComponent(dogRegNo)}`;
        } else if (numberType === 'RFID' && rfidCd) {
            address += `?rfidCd=${encodeURIComponent(rfidCd)}`;
        }

        if (ownerType === '소유주' && ownerNm) {
            address += `&ownerNm=${encodeURIComponent(ownerNm)}`;
        } else if (ownerType === '생년월일' && ownerBirth) {
            address += `&ownerBirth=${encodeURIComponent(ownerBirth)}`;
        }

        try {
            const data = await GetAPI(address);
            if (data) {
                setAnimalData(data); 
                setError('');
            } else {
                setAnimalData(null); 
                setError('해당번호로 등록된 반려동물이 없습니다.'); 
            }
        } catch (error) {
            setAnimalData(null);
            setError(`Error: ${error.message}`); 
    };
}

    // const [isModalOpen, setIsModalOpen] = useState(false);

   /* const searchAnimal = () => {

        const address = "/animalRegist"
        const response = GetAPI(address);
        const result = response.



    }*/

    /*const toggleModal = () => {
        setIsModalOpen(true);
    };*/

    /*const valueChangeHandler = e => {
        const { }
    }*/

    return(
        <div className={styles.allContainer}>
         <div className={styles.titleContainer}>
            <span className={styles.title}>동물 등록 번호 검색</span>
            <span className={styles.titleContext}>동물등록 번호 검색의 경우 소유주가<span className={styles.link}>국가동물보호정보시스템</span>에 회원가입이 되어 있고,
            <br/>소유주의 정보가 등록되어 있어야 정상 조회가 가능합니다.</span>
            <span className={styles.ps}>※ 임의로 동물등록 사항을 확인하는 것을 방지하기 위한 등록번호 이외 소유주의 개인정보를 추가 입력이 필요합니다.</span>
         </div>
         <form className={styles.searchContainer1} onSubmit={handleSubmit}>
            <select className={styles.selectBox} value={ownerType}
                    onChange={handleOwnerTypeChange}>
                <option>소유주</option>
                <option>생년월일</option>
            </select>
            {ownerType === '소유주' ? (
                    <input
                        className={styles.inputBox}
                        type="text"
                        value={ownerNm}
                        onChange={(e) => setOwnerNm(e.target.value)}
                    
                    />
                ) : (
                    <input
                        className={styles.inputBox}
                        type="text"
                        value={ownerBirth}
                        onChange={(e) => setOwnerBirth(e.target.value)}
                        
                    />
                )}
                
            <select className={styles.selectBox} value={numberType}
                    onChange={handleNumberTypeChange}>
                <option>등록 번호</option>
                <option>RFID</option>
            </select>
                {numberType === '등록 번호' ? (
                    <input
                        className={styles.inputBox}
                        type="text"
                        value={dogRegNo}
                        onChange={(e) => setDogRegNo(e.target.value)}
                       
                    />
                ) : (
                    <input
                        className={styles.inputBox}
                        type="text"
                        value={rfidCd}
                        onChange={(e) => setRfidCd(e.target.value)}
                       
                    />
                )}
            </form>
            <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button} >확인</button>
            </div>



         <div className={styles.modalTitle}>
            <img className={styles.img} src='/images/dict/DogPaw(green).png' alt='greenPaw'></img><span>등록 동물 정보</span>
         </div>
         {error && (
                <div className={styles.errorContainer}>
                    <img src='/images/animal/cuteDog.png' alt='error' />
                    <span>{error}</span>
                </div>
            )}

            {animalData && (
                <table className={styles.table}>
                    <tbody>
                        <tr>
                            <th>등록번호</th> <td>{animalData.dogRegNo}</td> <th>RFID_CD</th> <td>{animalData.rfidCd}</td>
                        </tr>
                        <tr>
                            <th>개이름</th> <td>{animalData.dogName}</td> <th>성별</th> <td>{animalData.gender}</td>
                        </tr>
                        <tr>
                            <th>품종</th> <td>{animalData.breed}</td> <th>중성화 여부</th> <td>{animalData.neuterStatus}</td>
                        </tr>
                        <tr>
                            <th>관할기관</th> <td>{animalData.authority}</td> <th>관할기관연락처</th> <td>{animalData.authorityContact}</td>
                        </tr>
                    </tbody>
                </table>
            )}
         
        </div>
    )  
}


export default AnimalRegist;