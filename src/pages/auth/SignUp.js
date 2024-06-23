import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';

function SignUp() {
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [isTerm1Checked, setIsTerm1Checked] = useState(false);
    const [isTerm2Checked, setIsTerm2Checked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleAllCheck = (e) => {
        const checked = e.target.checked;
        setIsAllChecked(checked);
        setIsTerm1Checked(checked);
        setIsTerm2Checked(checked);
    };

    const handleTerm1Check = (e) => {
        setIsTerm1Checked(e.target.checked);
        if (!e.target.checked) {
            setIsAllChecked(false);
        } else if (e.target.checked && isTerm2Checked) {
            setIsAllChecked(true);
        }
    };

    const handleTerm2Check = (e) => {
        setIsTerm2Checked(e.target.checked);
        if (!e.target.checked) {
            setIsAllChecked(false);
        } else if (e.target.checked && isTerm1Checked) {
            setIsAllChecked(true);
        }
    };

    const handleNextPage = () => {
        if (isTerm1Checked && isTerm2Checked) {
            navigate('/signup2'); // 다음 페이지 경로로 이동
        } else {
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

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
                <div className={styles.subTitleBox}>
                    <p>약관동의</p>
                </div>
                <div className={styles.lTxtBox}>
                    <p className={styles.text1}>필수 약관을 동의하셔야 회원가입이 가능합니다.</p>
                    <p className={styles.text2}>회원가입을 위해서 아래 DogSeek 이용약관 및 개인정보 수집 및 이용안내를 확인 후 동의해 주세요.</p>
                    <div>
                        <input type="checkbox" checked={isAllChecked} onChange={handleAllCheck} />
                        <label>전체 약관 동의</label>
                        <div>
                            <input type="checkbox" checked={isTerm1Checked} onChange={handleTerm1Check} />
                            <label>회원 서비스 이용 약관 (필수)</label>
                        </div>
                        <div>
                            <input type="checkbox" checked={isTerm2Checked} onChange={handleTerm2Check} />
                            <label>개인정보 수집 및 이용 동의 (필수)</label>
                        </div>
                    </div>
                </div>
                <button onClick={handleNextPage}>다음</button>
                {showModal && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <p>필수 약관에 모두 동의해 주세요.</p>
                            <button onClick={closeModal}>닫기</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default SignUp;
