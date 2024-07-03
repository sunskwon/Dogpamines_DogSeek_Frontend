import style from './FindEmail.module.css';
import React, {useState} from 'react';
import { checkAPI, callEmailVerification, callEmailVerify, callFindUserId } from '../../api/RestAPIs';

function FindEmail(){

    const [checkPhone, setCheckPhone] = useState({
        type: '',
        info: ''
    });
    const [email, setEmail] = useState("");
    const [authNum, setAuthNum] = useState("");
    const [showCheck, setShowCheck] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [showConfirmed, setShowConfirmed] = useState(true);
    const [userId, setUserId] = useState('');
    const [showUserId, setShowUserId ] = useState(false);

    const onPhoneChange = (e) => {
        setCheckPhone({...checkPhone, type: 'phone', info: e.target.value});
    }

    const onEmailChange = (e) => setEmail(e.target.value);
    const onNumChange = (e) => setAuthNum(e.target.value);


    // 연락처('-' 사용)
    const phoneRegEx = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/;


    const onClickPhoneMatch = async() => {
        const phoneCheck = phoneRegEx.test(checkPhone.info);
        console.log(`phoneCheck : ${phoneCheck}`);
        if (checkPhone.info.length !== 0) {
            if (phoneCheck) {
                const result = await checkAPI(checkPhone);

                if (result === 'false') {
                    setIsConfirmed(true);
                    setShowConfirmed(false);
                    setShowCheck(true);
                } else {
                    alert('일치하는 정보가 없습니다.');
                }
            } else {
                alert('연락처가 올바르지 않은 형식입니다.');
            }
        } else {
            alert('연락처를 입력해주세요.');
        }
    }

    const onClickEmail = async() => {
        if (showCheck === true) {
            const type = 'findId';
            const result = await callEmailVerification(email, type);

            if (result === 'true') {
                alert('인증번호가 발송되었습니다.');
            } else {
                alert('인증번호 발송 실패.');
            }
        } else {
            alert('연락처 일치 여부 확인이 필요합니다.');
        }
    }
    
    const onClickNumCheck = async() => {

        if (showCheck === true) {

            if (authNum.length !== 0) {
                if (authNum.length === 6) {
                    const result = await callEmailVerify(email, authNum);

                    if (result === 'true') {
                        // 사용자 ID 조회
                        const result = await callFindUserId(checkPhone.info);
                        setShowUserId(true);
                        if (result !== 'false') {
                            setUserId(result);
                        } else {
                            alert('일치하는 회원정보가 없습니다.');
                        }
                    }
                } else {
                    alert('인증번호는 6자리 입니다');
                }
    
            } else {
                alert('인증번호를 입력해주세요.')
            }
        } else {
            alert('연락처 일치 여부 확인이 필요합니다.');
        }
    }

    return(

        <>
            <div className={style.container}>
                <div className={style.box}>
                    <div className={style.titleBox}>
                        <p className={style.title}>아이디 찾기</p>
                    </div>
                    <div className={style.infoBox}>
                        <div className={style.phoneBox}>
                            <label>연락처</label>
                            <div className={style.phoneInputBox}>
                                <input type='tel' placeholder='회원가입시 입력한 연락처를 입력해주세요.' value={checkPhone.info}
                                        pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}" required onChange={onPhoneChange}></input>
                                <p>ex) 010-0000-0000</p>
                            </div>
                            {showConfirmed && (
                                <button type='submit' onClick={onClickPhoneMatch}>일치확인</button>    
                            )}
                            {showCheck && (
                                <img src='./images/auth/check_icon.png'></img>
                            )}
                        </div>
                        <div className={style.emailBox}>
                            <label>이메일</label>
                            <div className={style.emailInputBox}>
                                <input type='email' value={email} placeholder='인증번호를 받을 이메일을 입력해주세요.' onChange={onEmailChange}></input>
                            </div>
                            <button onClick={onClickEmail}>전송</button>
                        </div>
                        <div className={style.numBox}>
                            <label>인증번호</label>
                            <div className={style.numInputBox}>
                                <input value={authNum} placeholder='6자리 인증번호를 입력해주세요.' onChange={onNumChange}></input>
                            </div>
                            <button onClick={onClickNumCheck}>확인</button>
                        </div>
                        {showUserId && (
                            <div>
                                <p>{userId}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>

    );
}

export default FindEmail;