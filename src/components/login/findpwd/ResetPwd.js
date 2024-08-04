import styles from './ResetPwd.module.css'

function ResetPwd() {

    return (
        <>
            <form
                className={styles.inputBox}
            >
                <div className={styles.wrapBox}>
                    <label>비밀번호</label>
                    <input
                        type='password'
                        name='userPass'
                        placeholder='변경할 비밀번호를 입력하세요'
                    />
                    <p>영문, 숫자, 특수문자 중 두 종류 이상 8~12자 이내</p>
                </div>

            </form>
        </>
    );
}

export default ResetPwd;