import styles from './PwdConfirmation.module.css';

function PwdConfirmation() {

    return (
        <>
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
                    {showPwdDefault && (<p>영문, 숫자, 특수문자 중 두 종류 이상 8~12자 이내</p>)}
                    {showPwdTxt && (<p style={{ color: "#63C54A", fontWeight: "500" }}>사용가능한 비밀번호입니다.</p>)}
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
                    {showRePwdDefault && (<p>확인을 위해 다시 입력하시기 바랍니다.</p>)}
                    {showRePwdTxt && (<p style={{ color: "#63C54A", fontWeight: "500" }}>비밀번호와 일치합니다.</p>)}
                    {showRePwdError && (<p style={{ color: "#FF0000", fontWeight: "500" }}>비밀번호와 일치하지 않습니다.</p>)}
                </div>
            </div>
        </>
    );
}

export default PwdConfirmation;