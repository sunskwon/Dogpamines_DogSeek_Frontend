import React from 'react';
import styles from './ErrorContext.module.css';

function ErrorContext() {


  const handleGoBack = () => {
    window.history.back();
    setTimeout(() => {
      window.location.reload();
    }, 10);
  };

  const handleGoMain = () => {
    window.location.href = '/';
  }

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
              <h1>에러가 발생하였습니다.</h1>
              <p>재시도 해보신 후 같은 문제가 반복된다면</p>
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
              <div className={styles.buttonContainer}>
                <button className={styles.backButton} onClick={handleGoBack}>뒤로가기</button>
                <button className={styles.backButton} onClick={handleGoMain}>메인으로 돌아가기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorContext;
