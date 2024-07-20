import { useNavigate } from 'react-router-dom';

import styles from './AboutDogSeek.module.css';

function AboutDogSeek() {

    const navigate = useNavigate();

    return (
        <>
            <div className={styles.container}>
                <img
                    style={{ width: "300px", }}
                    src='./images/etc/logo1.png'
                    alt='DogSeek logo'
                />
                <div>
                    <div>
                        <span>About</span>
                        <span style={{ color: "#63C54A", }}> DogSeek</span>

                    </div>
                    <p>
                        반려견의 취향 혹은 필요한 요소 등을 통해
                        <br />
                        적합한 사료를 추천해주는 큐레이션 서비스를 제공하는 사이트 입니다.
                    </p>
                    <div
                        className={styles.button}
                        onClick={() => navigate('/company')}
                    >
                        회사 소개
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutDogSeek;