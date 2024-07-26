import { useNavigate } from 'react-router-dom';

import ProductPopular from '../products/ProductPopular';

import styles from './UsersBest.module.css';

function UsersBest() {

    const navigate = useNavigate();

    const onClickHandler = () => {

        navigate('/products');
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.titleBox}>
                    <span>User's</span>
                    <span style={{ color: "#63C54A", }}>Best</span>
                </div>
                <ProductPopular />
                <div className={styles.innerContainer}>
                    <div
                        className={styles.button}
                        onClick={onClickHandler}
                    >
                        사료 검색하기
                    </div>
                </div>
            </div>
        </>
    );
}

export default UsersBest;