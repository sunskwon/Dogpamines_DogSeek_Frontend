import styles from './PetSize.module.css'

function CurationSizeSelect({ curation, setCuration, setStep }) {

    const onChangeHandler = e => {

        e.preventDefault();

        setCuration({
            ...curation,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitHandler = () => {

        setStep(3);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.contentBox}>
                    <label
                        htmlFor='small'
                        className={curation.size === '소형' ? styles.selected : styles.selectable}
                    >
                        <div className={styles.circle}>
                            <img
                                src='./images/curation/smallDog.png'
                                alt=''
                            />
                        </div>
                        <p>소형견</p>
                    </label>
                    <input
                        type='radio'
                        name='size'
                        id='small'
                        value='소형'
                        onChange={onChangeHandler}
                    />
                    <label
                        htmlFor='medium'
                        className={curation.size === '중형' ? styles.selected : styles.selectable}
                    >
                        <div className={styles.circle}>
                            <img
                                src='./images/curation/middleDog.png'
                                alt=''
                            />
                        </div>
                        <p>중형견</p>
                    </label>
                    <input
                        type='radio'
                        name='size'
                        id='medium'
                        value='중형'
                        onChange={onChangeHandler}
                    />
                    <label
                        htmlFor='large'
                        className={curation.size === '대형' ? styles.selected : styles.selectable}
                    >
                        <div className={styles.circle}>
                            <img
                                src='./images/curation/bigDog.png'
                                alt=''
                            />
                        </div>
                        <p>대형견</p>
                    </label>
                    <input
                        type='radio'
                        name='size'
                        id='large'
                        value='대형'
                        onChange={onChangeHandler}
                    />
                </div>
                <div className={styles.buttonBox}>
                    <button
                        type="submit"
                        className={styles.button}
                        disabled={!curation.size}
                        onClick={onSubmitHandler}
                    >
                        다음
                    </button>
                </div>
            </div>
        </>
    )
}

export default CurationSizeSelect;