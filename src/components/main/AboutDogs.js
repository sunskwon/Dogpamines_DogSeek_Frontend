import { useNavigate } from 'react-router-dom';

import styles from './AboutDogs.module.css';

function AboutDogs() {

    const navigate = useNavigate();

    return (
        <>
            <div className={styles.container}>
                <div style={{ marginLeft: "80px", }}>
                    <span>About</span>
                    <span style={{ color: "#63C54A", }}>Dogs</span>
                </div>
                <div className={styles.innerContainer}>
                    <div className={styles.box}>
                        <p className={styles.text}>
                            강아지마다 특징과 필요로 하는 것이 다릅니다.<br />
                            동일한 품종이라고 해도 반려동물마다 다르기 때문에 여기에서<br />
                            소개하는 품종 세부 사항은 하나의 지표로 받아들여야 합니다. <br />
                            행복하고 건강하며 행동이 올바른 반려동물을 기르고 싶다면 훈련과 <br />
                            사회화는 물론이고 기본적인 행복과 관련된 요구를 비롯해 <br />
                            사회적, 행동적 요구까지 해결해주는 것이 좋습니다.<br />
                        </p>
                        <div
                            className={styles.button}
                            onClick={() => navigate('/dog')}
                        >
                            더 알아가기
                        </div>
                    </div>
                    <img
                        src='/images/main/maindog2.png'
                        alt='maindog2' />
                </div>
            </div>
        </>
    );
}

export default AboutDogs;