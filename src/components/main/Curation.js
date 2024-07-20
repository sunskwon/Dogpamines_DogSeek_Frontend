import { useNavigate } from 'react-router-dom';

import styles from './Curation.module.css';

function Curation({ setModalOpen }) {

    const navigate = useNavigate();
    
    const token = localStorage.getItem('accessToken');

    const onClickHandler = () => {

        if (token) {
            navigate('/curation');
        } else {
            setModalOpen(true);
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.box}>
                    <p className={styles.text}>
                        Help your dog
                        <br />
                        stay Healthy
                    </p>
                    <div
                        className={styles.button}
                        onClick={onClickHandler}>
                        맞춤 사료 찾기
                    </div>
                </div>
                <img
                    src='/images/main/maindog1.png'
                    alt='maindog1'
                />
            </div>
        </>
    );
};

export default Curation;