import styles from './DogCard.module.css';

function DogCard({ dog }) {

    return (
        <>
            <div className={styles.cardBox}>
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