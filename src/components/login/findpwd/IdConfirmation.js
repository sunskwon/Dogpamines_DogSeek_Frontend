import styles from './IdConfirmation.module.css';

function IdConfirmation({ user, setUser }) {

    const onIdChangeHandler = e => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const onIdSubmitHandler = async () => {

    };

    return (
        <>
            <form
                className={styles.inputBox}
                onSubmit={onIdSubmitHandler}
            >
                <div className={styles.wrapBox}>
                    <label>ID(E-MAIL)</label>
                    <div className={styles.checkBox}>
                        <input
                            type='email'
                            name='userId'
                            placeholder='아이디(이메일)를 입력하세요'
                            value={user.userId}
                            onChange={onIdChangeHandler}
                            autoFocus
                        />
                        <button
                            type='submit'
                            onSubmit={onIdSubmitHandler}
                        >
                            전송
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default IdConfirmation;