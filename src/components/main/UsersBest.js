import { useNavigate } from 'react-router-dom';

import MostProducts from '../products/MostProducts';

import styles from './UsersBest.module.css';

function UsersBest() {

    const navigate = useNavigate();

    return (
        <>
            <div className={styles.container}>
                <div style={{ marginLeft: "80px", }}>
                    <span>User's</span>
                    <span style={{ color: "#63C54A", }}>Best</span>
                </div>
                <MostProducts />
                <div className={styles.innerContainer}>
                    <div className={styles.button}>
                        사료 검색하기
                    </div>
                </div>
            </div>
        </>
    );
}

export default UsersBest;