import styles from './DogSummary.module.css';

function DogSummary({ dog, setDogCode }) {

    const onClickHandler = () => {

        setDogCode(0);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.titleBox}>
                        <img
                            src='/images/common/Back.png'
                            alt='back'
                            onClick={onClickHandler}
                        />
                        <p className={styles.title}>{dog.dogName}</p>
                    </div>
                    <p className={styles.text}>{dog.dogSummary}</p>
                </div>
                <img
                    src={dog.dogImage}
                    alt={dog.dogName}
                />
            </div>
        </>
    );
}

export default DogSummary;