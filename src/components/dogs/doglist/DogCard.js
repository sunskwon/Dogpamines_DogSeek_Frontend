import styles from './DogCard.module.css';

function DogCard({ dog, setDogCode }) {

    const onClickHandler = () => {
        
        setDogCode(dog.dogCode);
    };

    return (
        <>
            <div
                className={styles.cardBox}
                onClick={onClickHandler}
            >
                <img
                    src={dog.dogImage}
                    alt={dog.dogName}
                />
                <p className={styles.text}>{dog.dogName}</p>
            </div>
        </>
    );
}

export default DogCard;