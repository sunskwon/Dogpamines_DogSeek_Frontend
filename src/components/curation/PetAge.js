import styles from './PetAge.module.css'

function PetAge({ curation, setCuration, setStep }) {

    const onChangeHandler = e => {

        e.preventDefault();

        setCuration({
            ...curation,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitHandler = () => {

        setStep(4);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.contentBox}>
                    <label
                        htmlFor='child'
                        className={curation.age === '유아기' ? styles.selected : styles.selectable}
                    >
                        <img
                            src='./images/curation/womanAndDog.png'
                            alt=''
                            className={styles.image}
                        />
                        <p className={styles.text}>유아기</p>
                    </label>
                    <input
                        type='radio'
                        name='age'
                        id='child'
                        value='유아기'
                        onChange={onChangeHandler}
                    />
                    <label
                        htmlFor='youth'
                        className={curation.age === '청년기' ? styles.selected : styles.selectable}
                    >
                        <img
                            src='./images/curation/girlAndDog.png'
                            alt=''
                            className={styles.image}
                        />
                        <p className={styles.text}>청년기</p>
                    </label>
                    <input
                        type='radio'
                        name='age'
                        id='youth'
                        value='청년기'
                        onChange={onChangeHandler}
                    />
                    <label
                        htmlFor='eld'
                        className={curation.age === '노년기' ? styles.selected : styles.selectable}
                    >
                        <img
                            src='./images/curation/dog.png'
                            alt=''
                            className={styles.image}
                        />
                        <p className={styles.text}>노년기</p>
                    </label>
                    <input
                        type='radio'
                        name='age'
                        id='eld'
                        value='노년기'
                        onChange={onChangeHandler}
                    />
                </div>
                <div className={styles.buttonBox}>
                    <button
                        type="submit"
                        className={styles.button}
                        disabled={!curation.age}
                        onClick={onSubmitHandler}
                    >
                        다음
                    </button>
                </div>
            </div>
        </>
    )
}

export default PetAge