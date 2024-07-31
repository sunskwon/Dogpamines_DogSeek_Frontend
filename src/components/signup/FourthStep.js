import { useNavigate } from 'react-router-dom';

import styles from './FourthStep.module.css';

function SignUpComplete() {

    const navigate = useNavigate();

    return (
        <>
            <div className={styles.container}>
                <div className={styles.boxes}>
                    <div className={styles.imgBox}>
                        <img src='./images/auth/logo_circle.png' alt='logo_circle'></img>
                    </div>
                    <div className={styles.lTxtBox}>
                        <p style={{ fontWeight: '500', fontSize: '20px' }}>회원가입이 완료 되었습니다</p>
                        <p style={{ fontWeight: '500', fontSize: '14px', color: '#999999' }}>로그인 후 My page에서 개인 정보 수정 가능합니다</p>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button
                            className={styles.cancelBtn}
                            onClick={() => navigate('/')}
                        >
                            메인으로 이동
                        </button>
                        <button
                            className={styles.nextBtn}
                            onClick={() => navigate('/login')}
                        >
                            로그인
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUpComplete;