import { GetAPI } from '../../api/RestAPIs';
import styles from './DictDetail.module.css';
import { useState, useEffect} from "react";
import { useParams } from 'react-router-dom';


function DictDetail() {

    const { dogCode } = useParams();

    const [dog, setDog] = useState();

    const [loading, setLoading] = useState(true);

    const selectOneDict = async (code) => {
        try {
            const address = `/dict/${code}`;
            const response = await GetAPI(address);
            const result = response.dict;
            return result;
        } catch (error) {
            console.error('Error fetching dog details:', error);
            return null;
        }
    };

    useEffect(() => {
        if (dogCode) {
            selectOneDict(dogCode).then(res => {
                setDog(res);
                setLoading(false); 
            });
        }
    }, [dogCode]);
    
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!dog) {
        return <div>Error: Dog not found</div>;
    }

    const renderPaw = (count) => {
        const paws = [];
        for(let i = 0; i < 5; i++) {
            if(i < count) {
                paws.push(<img key={i} src='/images/dict/DogPaw(green).png'/> );
            } else {
                paws.push(<img key={i} src='/images/dict/DogPaw(gray).png'/>);
            }
        }
        return paws;
    }

    return (
        <>
            <div className={styles.container1} key={dog.dogCode}>
                <div className={styles.title}>
                    <span className={styles.titletext1}>{dog.dogName}</span>
                    <span className={styles.titletext2}>
                       {dog.dogSummary}
                    </span>
                    <img className={styles.img} src={dog.dogDetail} />
                </div>
            </div>

            <div className={styles.container2}>
                <div className={styles.detailtitle}>
                    세부사항
                </div>
                <div className={styles.grid1}>
                    <div className={styles.detailcontext1}>
                        <div className={styles.grid2}>
                            <div>수컷</div>
                            <div>암컷</div>
                        </div>
                        <hr />
                        <div className={styles.grid3}>
                            <div>체고</div> <div>체고</div>
                            <div>{dog.dogHeightM}cm</div> <div>{dog.dogHeightF}cm</div>
                            <div>체중</div> <div>체중</div>
                            <div>{dog.dogWeightM}kg</div> <div>{dog.dogWeightM}kg</div>
                        </div>
                    </div>
                    <div className={styles.detailcontext1}>
                        취약질병
                        <hr/>
                        <div>{dog.dogDisease}</div>
                    </div>
                </div>

                <div className={styles.detailcontext1}>
                    생애주기
                    <hr />
                    <div className={styles.grid4}>
                        <div>유아기</div> <div>청년기</div> <div>노년기</div>
                        <div>{dog.dogChild}</div> <div>{dog.dogYouth}</div> <div>{dog.dogEld}</div>
                </div>
                    </div>

                <div className={styles.detailtitle}>
                    특징
                </div>
                    <div className={styles.detailcontext2}>
                    <div className={styles.grid5}>
                        <div> 침흘림</div> <div className={styles.paw}>{renderPaw(dog.dogDrool)}</div> <div> 더위 적응</div> <div className={styles.paw}>{renderPaw(dog.dogHot)}</div>
                        <div> 다른동물과의 공동생활</div> <div className={styles.paw}>{renderPaw(dog.dogSocial)}</div> <div> 추위 적응</div> <div className={styles.paw}>{renderPaw(dog.dogCold)}</div>
                        <div> 털빠짐</div> <div className={styles.paw}>{renderPaw(dog.dogShed)}</div> <div> 실내 적합성</div> <div className={styles.paw}>{renderPaw(dog.dogHouse)}</div>
                        <div> 짖음</div> <div className={styles.paw}>{renderPaw(dog.dogBark)}</div> <div> 그루밍 요구</div> <div className={styles.paw}>{renderPaw(dog.dogGroom)}</div>
                        <div> 가족반려동물</div> <div className={styles.paw}>{renderPaw(dog.dogPet)}</div> <div> 활동량</div> <div className={styles.paw}>{renderPaw(dog.dogActi)}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DictDetail;