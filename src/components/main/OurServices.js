import { useNavigate, NavLink, Link } from 'react-router-dom';

import styles from './OurServices.module.css';

function OurServices({ setModalOpen }) {

    const navigate = useNavigate();

    const token = localStorage.getItem('accessToken');

    return (
        <>
            <div className={styles.container}>
                <div style={{ marginLeft: "80px", marginBottom: "20px", }}>
                    <span>Our</span>
                    <span style={{ color: "#63C54A", }}>Services</span>
                </div>
                <div className={styles.iconContainer}>
                    <div
                        className={styles.icon}
                        onClick={() => navigate('animal-info')}
                    >
                        <img
                            src='/images/common/Search.png'
                            alt='반려견 등록 확인'
                        />
                        <p>
                            반려견 등록 확인
                        </p>
                    </div>
                    <div
                        className={styles.icon}
                        onClick={() => navigate('/dog')}
                    >
                        <img
                            src='/images/common/Dog.png'
                            alt='견종백과'
                        />
                        <p>견종 백과</p>
                    </div>
                    <div
                        className={styles.icon}
                        onClick={token ? () => navigate('/curation') : () => setModalOpen(true)}
                    >
                        <img
                            src='/images/common/DogBowl.png'
                            alt='맞춤 사료 찾기'
                        />
                        <p>맞춤 사료 찾기</p>
                    </div>
                    <div
                        className={styles.icon}
                        onClick={() => navigate('/board')}
                    >
                        <img
                            src='/images/common/Notepad.png'
                            alt='게시판'
                        />
                        <p>게시판</p>
                    </div>

                    <div
                        className={styles.icon}
                        onClick={token ? () => navigate('/public-chat') : () => setModalOpen(true)}
                    >
                        <img
                            src='/images/common/Chat.png'
                            alt='유저 채팅'
                        />
                        <p>유저 채팅</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OurServices;