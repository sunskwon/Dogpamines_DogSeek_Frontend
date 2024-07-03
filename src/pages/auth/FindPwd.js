import { callChangePwd, callEmailVerification, callEmailVerify, checkAPI } from '../../api/RestAPIs';
import style from './FindPwd.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function FindPwd() {

    const [checkId, setCheckId] = useState({
        type: '',
        info: ''
    });

    const [userPwd, setUserPwd] = useState({
        password: '',
        rePassword: ''
    });

    const [authNum, setAuthNum] = useState("");
    const [showIdVerify, setShowIdVerify] = useState(true);
    const [showUpdatePwd, setShowUpdatePwd] = useState(false);

    const [pwdHide, setPwdHide] = useState(true);
    const [pwdType, setPwdType] = useState('password');

    const [rePwdHide, setRePwdHide] = useState(true);
    const [rePwdType, setRePwdType] = useState('password');

    const [showPwdDefault, setShowPwdDefault] = useState(true);
    const [showPwdTxt, setShowPwdTxt] = useState(false);

    const [showRePwdDefault, setShowRePwdDefault] = useState(true);
    const [showRePwdTxt, setShowRePwdTxt] = useState(false);
    const [showRePwdError, setShowRePwdError] = useState(false);

    const onIdChange = (e) => setCheckId({...checkId, type: 'email', info: e.target.value});
    const onNumChange = (e) => setAuthNum(e.target.value);

    const navigate = useNavigate();

    // email 정규식
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    // 비밀번호 정규식(최소 8자 및 최대 12자, 영문자 or 숫자 or 특수문자 2가지 이상 조합)
    const pwdRegEx = /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,12}$/;

    const onClickSend = async() => {
        if (checkId.info.length !== 0) {
            const emailCheck = emailRegEx.test(checkId.info);
            if (emailCheck) {
                const result = await checkAPI(checkId);
                console.log(`id check result : ${result}`);

                if (result === 'false') {
                    const type = 'findPw';
                    const sendResult = await callEmailVerification(checkId.info, type);
                    if (sendResult === 'true') {
                        alert('인증번호가 발송되었습니다.');
                    } else {
                        alert('인증번호 발송 실패.');
                    }
                } else {
                    alert('존재하지 않는 아이디 입니다.');
                }

            } else {
                alert('이메일 형식 올바르지 않습니다.')
            }
        } else {
            alert('아이디를 입력해주세요.');
        }
    }

    const onClickNumCheck = async() => {

        if (authNum.length !== 0) {
            console.log(`authNum.length : ${authNum.length}`)
            if (authNum.length === 6) {
                const result = await callEmailVerify(checkId.info, authNum);

                if (result === 'true') {

                    alert('인증되었습니다.');

                    setShowIdVerify(false);
                    setShowUpdatePwd(true);
                    
                } else {
                    alert('인증번호를 확인해주세요.');  // 인증 실패
                }
            } else {
                alert('인증번호는 6자리 입니다.');
            }
        } else {
            alert('인증번호를 입력해주세요.');
        }
    }

    const onPwdChange = (e) => {
        const temp = e.target.value;

        if (pwdRegEx.test(temp)) {
            setShowPwdDefault(false);
            setShowPwdTxt(true);
        } else {
            setShowPwdTxt(false);
            setShowPwdDefault(true);
        }

        setUserPwd({...userPwd, password: temp});
    }
    const onPwdReChange = (e) => {
        const temp = e.target.value;
        setUserPwd({...userPwd, rePassword: temp});
        if (userPwd.password === temp) {
            setShowRePwdDefault(false);
            setShowRePwdError(false);
            setShowRePwdTxt(true);
        } else {
            setShowRePwdDefault(false);
            setShowRePwdTxt(false);
            setShowRePwdError(true);
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

    const onClickChange = async() => {
        if (userPwd.password.length !== 0) {
            if (userPwd.rePassword.length !== 0) {
                if (showRePwdTxt) {
                    const result = await callChangePwd(checkId.info, userPwd.password);

                    if (result === 'true') {
                        alert('비밀번호 변경 완료!');
                        navigate("/login");
                    } else {
                        alert('비밀번호 변경 실패!');
                    }
                } else {
                    alert('비밀번호가 일치하지 않습니다.');
                }
            } else {
                alert('비밀번호 확인을 위해 한 번 더 입력해주시기 바랍니다.')
            }
        } else {
            alert('변경할 비밀번호를 입력해주세요.');
        }
    }

    const onClickCancel = () => {
        navigate('/');
    }

    return(

        <>
            <div className={style.container}>
                <div className={style.box}>
                    <div className={style.titleBox}>
                        <p className={style.title}>비밀번호 찾기</p>
                    </div>
                    {showIdVerify && (
                    <div className={style.infoBox}>
                        <div className={style.idBox}>
                            <label>아이디</label>
                            <input type='email' value={checkId.info} placeholder='아이디(이메일)를 입력해주세요.' onChange={onIdChange}></input>
                            <button onClick={onClickSend}>전송</button>
                        </div>
                        <div className={style.numBox}>
                            <label>인증번호</label>
                            <input value={authNum} placeholder='6자리 인증번호를 입력해주세요.' onChange={onNumChange}></input>
                            <button onClick={onClickNumCheck}>확인</button>
                        </div>
                    </div>
                    )}
                    {showUpdatePwd && (
                    <div className={style.infoBox}>
                        <div className={style.pwdBox}>
                            <label>비밀번호</label>
                            <div className={style.pwdInputBox}>
                                <input type={pwdType} value={userPwd.password} placeholder='비밀번호를 입력해주세요.' onChange={onPwdChange}></input>
                                <div className={style.pwdHideBox} onClick={onClickHide}>
                                    {pwdHide ? 
                                    (<img src='./images/auth/pwd_hide.png' alt='pwd_hide'></img>) 
                                    : (<img src='./images/auth/pwd_eye.png' alt='pwd_eye'></img>)
                                    }
                                </div>
                                { showPwdDefault && (<p>영문, 숫자, 특수문자 중 두 종류 이상 8~12자 이내</p>)}
                                { showPwdTxt && (<p style={{color: "#63C54A", fontWeight: "500"}}>사용가능한 비밀번호입니다.</p>)}
                            </div>
                        </div>
                        <div className={style.pwdReBox}>
                            <label>비밀번호 확인</label>
                            <div className={style.pwdReInputBox}>
                                <input type={rePwdType} value={userPwd.rePassword} placeholder='확인을 위해 다시 입력하시기 바랍니다.' onChange={onPwdReChange}></input>
                                <div className={style.rePwdHideBox} onClick={onClickReHide}>
                                    {rePwdHide ? 
                                    (<img src='./images/auth/pwd_hide.png' alt='pwd_hide'></img>) 
                                    : (<img src='./images/auth/pwd_eye.png' alt='pwd_eye'></img>)
                                    }
                                </div>
                                { showRePwdDefault && (<p></p>)}
                                { showRePwdTxt && (<p style={{color: "#63C54A", fontWeight: "500"}}>비밀번호와 일치합니다.</p>)}
                                { showRePwdError &&  (<p style={{color: "#FF0000", fontWeight: "500"}}>비밀번호와 일치하지 않습니다.</p>)}
                            </div>
                            
                        </div>
                        <div className={style.buttonContainer}>
                            <button className={style.cancelBtn} onClick={onClickCancel}>취소</button>
                            <button className={style.updateBtn} onClick={onClickChange}>변경하기</button>
                        </div>
                
                    </div>
                    )}
                </div>
            </div>
        </>

    );
}

export default FindPwd;