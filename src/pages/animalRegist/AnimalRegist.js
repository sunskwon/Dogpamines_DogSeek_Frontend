import { useState, useEffect } from "react";
import styles from './AnimalRegist.module.css';
import axios from "axios";

function AnimalRegist() {


    const [numberType, setNumberType] = useState('등록 번호');
    const [ownerType, setOwnerType] = useState('소유주');

    const [formData, setFormData] = useState(
        {
            dog_reg_no: '',
            owner_nm: '',
            owner_birth: ''

        });

    const [animalData, setAnimalData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetchData();
    }

    function fetchData() {
        setLoading(true);
        setError(null);

        const servicekey = process.env.REACT_APP_ANIMAL_API_KEY;
        const _type = 'json';
        const { dog_reg_no, owner_nm, owner_birth } = formData;

        var url = 'http://apis.data.go.kr/1543061/animalInfoSrvc/animalInfo';
        var queryParams = new URLSearchParams({
            servicekey: servicekey,
            _type: _type
        })

        if (numberType === '등록 번호') {
            queryParams.append('dog_reg_no', dog_reg_no);
        }

        if (ownerType === '소유주') {
            queryParams.append('owner_nm', owner_nm);
        } else {
            queryParams.append('owner_birth', owner_birth);
        }

        axios.get(url + '?' + queryParams.toString())
            .then(function (res) {
                const data = res.data.response.body;
                if (data?.item.dogRegNo) {
                    setAnimalData(data.item);
                } else {
                    setError('해당 정보로 등록된 반려동물이 없습니다.')
                    setAnimalData(null);
                }
                setLoading(false);
                console.log('Status: ', res.status)
                console.log('Headers: ', JSON.stringify(res.headers))
                console.log('Body: ', data);
            })
            .catch(function (error) {
                setError('데이터를 가져오는 중 오류가 발생하였습니다.');
                setLoading(false);
                console.error('Error fetxhing data: ', error);
            });

    }

    const handleLink = () => {
        window.open('https://www.animal.go.kr/front/index.do', '_blank');
    }

    return (
        <div className={styles.allContainer}>
            <div className={styles.titleContainer}>
                <span className={styles.title}>반려견 등록 정보 조회</span>
                <span className={styles.titleContext}>반려견 등록 정보 조회의 경우 소유주가<span className={styles.link} onClick={handleLink}>국가동물보호정보시스템</span>에 회원가입이 되어 있고,
                    <br />소유주의 정보가 등록되어 있어야 정상 조회가 가능합니다.</span>
                <span className={styles.ps}>※ 임의로 동물등록 사항을 확인하는 것을 방지하기 위한 등록번호 이외 소유주의 개인정보를 추가 입력이 필요합니다.</span>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={styles.searchContainer1}>
                    <select className={styles.selectBox} value={ownerType} onChange={(e) => setOwnerType(e.target.value)}>
                        <option>소유주</option>
                        <option>생년월일</option>
                    </select>
                    {ownerType === '소유주' ? (
                        <input
                            className={styles.inputBox}
                            type="text"
                            name="owner_nm"
                            value={formData.owner_nm}
                            onChange={handleChange}
                            placeholder="소유주 성명을 입력해주세요."

                        />
                    ) : (
                        <input
                            className={styles.inputBox}
                            type="text"
                            name="owner_birth"
                            value={formData.owner_birth}
                            onChange={handleChange}
                            placeholder="YYMMDD 형식으로 입력해주세요."

                        />
                    )}
                </div>

                <div className={styles.searchContainer2}>
                    <div className={styles.regiBox} value={numberType} onChange={(e) => { setNumberType(e.target.value) }}>
                        등록 번호
                    </div>
                    <input
                        className={styles.inputBox}
                        type="text"
                        name="dog_reg_no"
                        value={formData.dog_reg_no}
                        onChange={handleChange}
                        placeholder="15자리 숫자 형식으로 입력해주세요."

                    />
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.button} >확인</button>
                </div>
            </form>

            {loading && <p>loading...</p>}

            {error ? (
                <>
                    <div className={styles.modalTitle}>
                        <img className={styles.img} src='/images/dict/DogPaw(green).png' alt='greenPaw'></img><span>등록 동물 정보</span>
                    </div>
                    <div className={styles.errorContainer}>
                        <img src='/images/animal/cuteDog.png' alt='error' />
                        <span>{error}</span>
                    </div>
                </>
            ) : (
                animalData && (
                    <>
                        <div className={styles.modalTitle}>
                            <img className={styles.img} src='/images/dict/DogPaw(green).png' alt='greenPaw'></img><span>등록 동물 정보</span>
                        </div>
                        <table className={styles.table}>
                            <tbody>
                                <tr>
                                    <th>등록번호</th> <td>{animalData.dogRegNo}</td> <th>RFID_CD</th> <td>{animalData.rfidCd}</td>
                                </tr>
                                <tr>
                                    <th>개이름</th> <td>{animalData.dogNm}</td> <th>성별</th> <td>{animalData.sexNm}</td>
                                </tr>
                                <tr>
                                    <th>품종</th> <td>{animalData.kindNm}</td> <th>중성화 여부</th> <td>{animalData.neuterYn}</td>
                                </tr>
                                <tr>
                                    <th>관할기관</th> <td>{animalData.orgNm}</td> <th>관할기관연락처</th> <td>{animalData.officeTel}</td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                )
            )}
        </div>
    )
}


export default AnimalRegist;