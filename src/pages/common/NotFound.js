import { useNavigate, redirect } from "react-router-dom";

import styles from "./Common.module.css";

function NotFound() {

    const navigate = useNavigate();

    const copyClipBoardHandler = () => {

        try {
            navigator.clipboard.writeText('dogseek2024@gmail.com');
            alert('클립보드에 복사되었습니다');
        } catch (error) {
            alert('클립보드 복사에 실패했습니다');
        }
    }

    return (
        <>
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                    <div>
                        <img
                            src="/images/common/RunningDog.png"
                            alt="달리는 강아지"
                            className={styles.runningDog}
                        />
                        <div>
                            <h1>존재하지 않는 페이지입니다</h1>
                            <h3>404 : Page Not Found</h3>
                            <p>정상적인 접근이었거나 같은 문제가 반복된다면</p>
                            <div className={styles.wrapBox}>
                                <p
                                    className={styles.emailAddress}
                                >
                                    dogseek2024@gmail.com
                                </p>
                                <div
                                    className={styles.hintText}
                                    onClick={copyClipBoardHandler}
                                >
                                    <p>클릭하면 메일 주소가 복사됩니다</p>
                                </div>
                            </div>
                            <p>으로 연락 부탁드립니다.</p>
                            <button
                                className={styles.backButton}
                                onClick={() => {
                                    navigate('/');
                                }}
                            >메인으로 돌아가기</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotFound;