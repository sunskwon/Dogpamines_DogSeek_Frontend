import styles from './SignUpComplete.module.css';
import { useNavigate} from 'react-router-dom';

function SignUpComplete(){
    
    const navigate = useNavigate();

    const onClickLogin = () => {

        navigate('/login');
    }

    const onClickMain = () => {

        navigate('/');
    }

    return (

        <>
            <div className={styles.container}>
            <div className={styles.titleBox}>
                    <p>회원가입</p>
                </div>
                <div className={styles.seqBox}>
                    <hr />
                    <div className={styles.wrapper}>
                        <div className={styles.circle1}>1</div>
                        <div className={styles.circle2}>2</div>
                        <div className={styles.circle3}>3</div>
                        <div className={styles.circle4}>4</div>
                    </div>
                </div>
                <div className={styles.txtBox}>
                    <p>약관동의</p>
                    <p>본인인증</p>
                    <p>정보입력</p>
                    <p>가입완료</p>
                </div>
                <div className={styles.boxes}>
                    <div className={styles.imgBox}>
                        <img src='./images/auth/logo_circle.png' alt='logo_circle'></img>
                    </div>
                    <div className={styles.lTxtBox}>
                        <p style={{fontWeight: '500', fontSize: '20px'}}>회원가입이 완료 되었습니다.</p>
                        <p style={{fontWeight: '500', fontSize: '14px', color: '#999999'}}>로그인 후 My page에서 개인 정보 수정 가능합니다.</p>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.cancelBtn} onClick={onClickLogin}>로그인</button>
                        <button className={styles.nextBtn} onClick={onClickMain}>메인으로 이동</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUpComplete;