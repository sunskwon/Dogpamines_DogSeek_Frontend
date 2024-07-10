import React from 'react';
import styles from './ErrorContext.module.css';

function ErrorContext ({ resetErrorBoundary }){

  const handleGoBack = () => {
    window.history.back();
    setTimeout(() => {
      window.location.reload();
    }, 10);
  };

  return (
    <div className={styles.Container}>
      <p className={styles.errorTitle}>에러 발생!</p>
      <img src="/images/common/RunningDog.png"/>
      <div className={styles.buttonContainer}>
      <button className={styles.button} onClick={handleGoBack}>뒤로가기</button>
      {resetErrorBoundary && <button className={styles.button} onClick={resetErrorBoundary}>새로고침</button>}
      </div>
    </div>
  );
};

export default ErrorContext;
