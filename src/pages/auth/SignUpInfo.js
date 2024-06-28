import styles from './SignUpInfo.module.css';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkAPI } from '../../api/RestAPIs';

function SignUpInfo() {

    const [user, setUser] = useState({
        userId: '',
        nick: '',
        password: '',
        rePassword: '',
        phone: ''
    });

    const [checkNick, setCheckNick] = useState({
        type: '',
        info: ''
    });

    const [checkPhone, setCheckPhone] = useState({
        type: '',
        info: ''
    });

    const [pwdHide, setPwdHide] = useState(true);
    const [pwdType, setPwdType] = useState('password');

    const [rePwdHide, setRePwdHide] = useState(true);
    const [rePwdType, setRePwdType] = useState('password');

    const [showPwdDefault, setShowPwdDefault] = useState(true);
    const [showPwdTxt, setShowPwdTxt] = useState(false);

    const [showRePwdDefault, setShowRePwdDefault] = useState(true);
    const [showRePwdTxt, setShowRePwdTxt] = useState(false);
    const [showRePwdError, setShowRePwdError] = useState(false);

    const [showConfirmed, setShowConfirmed] = useState(true);
    const [showCheck, setShowCheck] = useState(false);
    const [showNickModal, setShowNickModal] = useState(false);

    const [showNickCheckModal, setShowNickCheckModal] = useState(false);
    const [showPwdCheckModal, setShowPwdCheckModal] = useState(false);
    const [showRePwdCheckModal, setShowRePwdCheckModal] = useState(false);
    const [showPhoneCheckModal, setShowPhoneCheckModal] = useState(false);

    const location = useLocation();

    const { email } = location.state;

    const navigate = useNavigate();
    
    // 닉네임 정규식(2자 이상 7자 이하/ 한글, 영어, 숫자 사용 가능/ 한글 초성 및 모음은 허가하지 않음)
    const nickRegEx = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,7}$/;
    // 비밀번호 정규식(최소 8자 및 최대 12자, 영문자 or 숫자 or 특수문자 2가지 이상 조합)
    const pwdRegEx = /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,12}$/;
    // 연락처('-' 사용)
    const phoneRegEx = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    const onNickChange = (e) => {
        setUser({...user, nick: e.target.value});
        setCheckNick({...checkNick, type: 'nick', info: e.target.value});
    };
    const onPwdChange = (e) => {
        const temp = e.target.value;

        if (pwdRegEx.test(temp)) {
            setShowPwdDefault(false);
            setShowPwdTxt(true);
        } else {
            setShowPwdTxt(false);
            setShowPwdDefault(true);
        }

        setUser({...user, password: temp});
        console.log(`pwd : ${temp}`)
        console.log(`length : ${temp.length}`);
    }
    const onPwdReChange = (e) => {
        const temp = e.target.value;
        setUser({...user, rePassword: temp});
        if (user.password === temp) {
            setShowRePwdDefault(false);
            setShowRePwdError(false);
            setShowRePwdTxt(true);
        } else {
            setShowRePwdDefault(false);
            setShowRePwdTxt(false);
            setShowRePwdError(true);
        }
    }
    const onPhoneChange = (e) => {
        setUser({...user, phone: e.target.value});
        setCheckPhone({...checkPhone, type: 'phone', info: e.target.value});
    }

    const onClickConfirm = async () => {
        // 닉네임 유효성 검사
        if (nickRegEx.test(user.nick)) {
            // 닉네임 중복 여부 확인 로직 (백에서 처리)
            console.log(`nick : ${user.nick}`);
            const result = await checkAPI(checkNick);
            console.log(`result : ${result}`);

            if(result === 'true') {
                setShowCheck(true);
                setShowConfirmed(false);
            } else {
                alert('중복된 닉네임 입니다.');
            }
        } else if (!nickRegEx.test(user.nick)) { 
            setShowNickModal(true);
        } else {
            setShowNickModal(true);
        }
    }

    const onClickHide = () => {
        setPwdHide(!pwdHide);
        console.log(`pwdHide : ${pwdHide}`);
        console.log(`pwdType : ${pwdType}`);
        if (pwdType === 'password') {
            setPwdType('text');
        } else {
            setPwdType('password');
        }
    }

    const onClickReHide = () => {
        setRePwdHide(!rePwdHide);
        console.log(`re pwdHide : ${rePwdHide}`);
        console.log(`re pwdType : ${rePwdType}`);
        if (rePwdType === 'password') {
            setRePwdType('text');
        } else {
            setRePwdType('password');
        }
    }

    const onClickComplete = async () => {
        const phoneCheck = phoneRegEx.test(user.phone);
        if (showCheck && showPwdTxt && showRePwdTxt && phoneCheck) {    // 모든 항목 true 일때
            const result =  await checkAPI(checkPhone);
            console.log(`result : ${result}`);

            if(result === 'true') {
                navigate('/signupcomplete');
            } else {
                alert('중복된 연락처 입니다.');
            }
            
        } else if (!showCheck) {
            setShowNickCheckModal(true);
        } else if (showCheck && !showPwdTxt) {
            setShowPwdCheckModal(true);
        } else if (showCheck && showPwdTxt && !showRePwdTxt) {
            setShowRePwdCheckModal(true);
        } else if (!phoneCheck) {
            setShowPhoneCheckModal(true);
        }
    }

    const closeModal = () => {
        setShowNickModal(false);
        setShowNickCheckModal(false);
        setShowPwdCheckModal(false);
        setShowRePwdCheckModal(false);
        setShowPhoneCheckModal(false);
    }

    useEffect(() => {
        setUser({...user, userId: email});
    }, [user.userId]);

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
                    <div className={styles.starBox}>
                        <span className={styles.star}>*</span>
                    </div>
                    <div className={styles.infoTxtBox}>
                        <span className={styles.infoTxt}>회원정보</span>
                        <span className={styles.lTxt}>필수입력 항목입니다. 모든 항목의 회원 정보를 빈 칸 없이 입력해주세요.</span>
                    </div>
                </div>
                <div className={styles.inputBoxes}>
                    <div className={styles.emailBox}>
                        <label>아이디(이메일)</label>
                        <span>{email}</span>
                    </div>
                    <div className={styles.nickBox}>
                        <label>닉네임</label>
                        <div className={styles.nickInputTxtBox}>
                            <input value={user.nick} onChange={onNickChange}></input>
                            <p>한글, 영문, 숫자 사용 가능 2~7자 이내</p>
                        </div>
                        {showConfirmed && (
                            <button type='submit' onClick={onClickConfirm}>중복 확인</button>    
                        )}
                        {showCheck && (
                            <img src='./images/auth/check_icon.png' alt='check_icon'></img>
                        )}
                    </div>
                    <div className={styles.pwdBox}>
                        <label>비밀번호</label>
                        <div className={styles.pwdInputBox}>
                            <input type={pwdType} value={user.password} onChange={onPwdChange}></input>
                            <div className={styles.pwdHideBox} onClick={onClickHide}>
                            {pwdHide ? 
                            (<img src='./images/auth/pwd_hide.png' alt='pwd_hide'></img>) 
                            : (<img src='./images/auth/pwd_eye.png' alt='pwd_eye'></img>)
                            }
                            </div>
                            { showPwdDefault && (<p>영문, 숫자, 특수문자 중 두 종류 이상 8~12자 이내</p>)}
                            { showPwdTxt && (<p style={{color: "#63C54A", fontWeight: "500"}}>사용가능한 비밀번호입니다.</p>)}
                        </div>
                    </div>
                    <div className={styles.pwdReBox}>
                        <label>비밀번호 확인</label>
                        <div className={styles.pwdReInputBox}>
                            <input type={rePwdType} name={user.rePassword} onChange={onPwdReChange}></input>
                            <div className={styles.rePwdHideBox} onClick={onClickReHide}>
                            {rePwdHide ? 
                            (<img src='./images/auth/pwd_hide.png' alt='pwd_hide'></img>) 
                            : (<img src='./images/auth/pwd_eye.png' alt='pwd_eye'></img>)
                            }
                            </div>
                            { showRePwdDefault && (<p>확인을 위해 다시 입력하시기 바랍니다.</p>)}
                            { showRePwdTxt && (<p style={{color: "#63C54A", fontWeight: "500"}}>비밀번호와 일치합니다.</p>)}
                            { showRePwdError &&  (<p style={{color: "#FF0000", fontWeight: "500"}}>비밀번호와 일치하지 않습니다.</p>)}
                        </div>
                    </div>
                    <div className={styles.phoneBox}>
                        <label>연락처</label>
                        <div className={styles.phoneInputBox}>
                            <input value={user.phone} onChange={onPhoneChange}></input>
                            <p>이메일 찾기 시 사용되는 정보 입니다. ex) 010-0000-0000</p>
                        </div>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.cancelBtn}>취소</button>
                    <button className={styles.nextBtn} onClick={onClickComplete}>완료</button>
                </div>
                {showNickModal && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <p>닉네임 형식이 올바르지 않습니다.</p>
                            <button onClick={closeModal}>닫기</button>
                        </div>
                    </div>
                )}
                {showNickCheckModal && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <p>닉네임 중복확인이 완료 되지 않았습니다.</p>
                            <button onClick={closeModal}>닫기</button>
                        </div>
                    </div>
                )}
                {showPwdCheckModal && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <p>비밀번호 형식이 올바르지 않습니다.</p>
                            <button onClick={closeModal}>닫기</button>
                        </div>
                    </div>
                )}
                {showRePwdCheckModal && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <p>비밀번호가 일치하지 않습니다.</p>
                            <button onClick={closeModal}>닫기</button>
                        </div>
                    </div>
                )}
                {showPhoneCheckModal && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <p>연락처 형식이 올바르지 않습니다.</p>
                            <button onClick={closeModal}>닫기</button>
                        </div>
                    </div>
                )}     
            </div>
        </>
    );
}

export default SignUpInfo;