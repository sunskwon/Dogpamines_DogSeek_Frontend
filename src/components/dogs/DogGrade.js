import styles from './DogGrade.module.css';

function DogGrade({ grade }) {

    return (
        <>
            <div className={styles.container}>
                <img
                    src={grade > 0 ? '/images/dict/DogPaw(green).png' : '/images/dict/DogPaw(gray).png'}
                    alt={grade > 0 ? 'green paw' : 'gray paw'}
                />
                <img
                    src={grade > 1 ? '/images/dict/DogPaw(green).png' : '/images/dict/DogPaw(gray).png'}
                    alt={grade > 1 ? 'green paw' : 'gray paw'}
                />
                <img
                    src={grade > 2 ? '/images/dict/DogPaw(green).png' : '/images/dict/DogPaw(gray).png'}
                    alt={grade > 2 ? 'green paw' : 'gray paw'}
                />
                <img
                    src={grade > 3 ? '/images/dict/DogPaw(green).png' : '/images/dict/DogPaw(gray).png'}
                    alt={grade > 3 ? 'green paw' : 'gray paw'}
                />
                <img
                    src={grade > 4 ? '/images/dict/DogPaw(green).png' : '/images/dict/DogPaw(gray).png'}
                    alt={grade > 4 ? 'green paw' : 'gray paw'}
                />
            </div>
        </>
    );
}

export default DogGrade;