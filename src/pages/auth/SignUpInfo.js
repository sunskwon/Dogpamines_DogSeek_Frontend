import styles from './SignUpInfo.module.css';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SignUpInfo() {


    const [user, setUser] = useState({
        nick: '',
        password: '',
        rePassword: '',
        phone: ''
    });

    const [nick, setNick] = useState("");

    const [showConfirmed, setShowConfirmed] = useState(true);
    const [showCheck, setShowCheck] = useState(false);

    const location = useLocation();

    const { email } = location.state;

    const onNickChange = (e) => setNick(e.target.value);

    const onClickConfirm = () => {
        // 닉네임 유효성 검사
        if (nick.length !== 0) {  // 빈 문자열이 아니고 정규식에 맞을때
            // 닉네임 중복 여부 확인 로직 (백에서 처리)
            console.log(`nick : ${nick}`);
            setShowCheck(true);
            setShowConfirmed(false);
        } else if (nick.length === 0) {   // 정규식에 맞지 않을 때
        } else {
        }
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
                <div className={styles.subTitleBox}>
                    <p>정보입력</p>
                </div>
                <div className={styles.lTxtBox}>
                    <span className={styles.star}>*</span>
                    <span className={styles.infoTxt}>회원정보</span>
                    <span className={styles.lTxt}>필수입력 항목입니다. 모든 항목의 회원 정보를 빈 칸 없이 입력해주세요.</span>
                </div>
                <div className={styles.inputBoxes}>
                    <div className={styles.emailBox}>
                        <label>아이디(이메일)</label>
                        <span>{email}</span>
                    </div>
                    <div className={styles.nickBox}>
                        <label>닉네임</label>
                        <div className={styles.nickInputTxtBox}>
                            <input name='nick' onChange={onNickChange}></input>
                            <p>한글, 영문, 숫자 사용 가능 2~7자 이내</p>
                        </div>
                        {showConfirmed && (
                            <button type='submit' onClick={onClickConfirm}>중복 확인</button>    
                        )}
                        {showCheck && (
                            <img src='./images/auth/check_icon.png'></img>
                        )}
                    </div>
                    <div className={styles.pwdBox}>
                        <label>비밀번호</label>
                        <div className={styles.pwdInputBox}>
                            <input></input>
                            <p>영문, 숫자, 특수문자 중 두 종류 이상 8~12자 이내</p>
                        </div>
                    </div>
                    <div className={styles.pwdReBox}>
                        <label>비밀번호 확인</label>
                        <div className={styles.pwdReInputBox}>
                            <input></input>
                            <p>확인을 위해 다시 입력하시기 바랍니다.</p>
                        </div>
                    </div>
                    <div className={styles.phoneReBox}>
                        <label>연락처</label>
                        <div className={styles.phoneInputBox}>
                            <input></input>
                            <p>이메일 찾기 시 사용되는 정보 입니다. ex) 010-0000-0000</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUpInfo;