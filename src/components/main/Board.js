import { useNavigate } from 'react-router-dom';

import styles from './Board.module.css';

function Board() {

    const navigate = useNavigate();

    return (
        <>
            <div className={styles.container}>
                <img 
                src='/images/main/boards1.png'
                alt='댕댕이들이 사는 이야기'
                onClick={() => navigate('/board')} />
            </div>
        </>
    );
}

export default Board;