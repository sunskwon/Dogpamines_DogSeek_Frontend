import { useState } from 'react';

import DogCard from './DogCard';

import styles from '../DogList.module.css';

function LargeDogList({ dogList, setDogCode }) {

    const [boxOpen, setBoxOpen] = useState(true);

    return (
        <>
            <hr style={{ width: "1000px", backgroundColor: "#D4D4D4", }} />
            <div className={styles.container}>
                <div className={styles.box}>
                    <div
                        className={styles.textBox}
                        onClick={() => setBoxOpen(!boxOpen)}
                    >
                        <img
                            src={boxOpen ? '/images/dict/Minus.png' : '/images/dict/Plus.png'}
                            alt={boxOpen ? 'minus' : 'plus'}
                        />
                        <p className={styles.text}>대형</p>
                    </div>
                    {boxOpen &&
                        <div className={styles.cardList}>
                            {dogList.map(
                                dog => (
                                    <DogCard
                                        key={dog.dogCode}
                                        dog={dog}
                                        setDogCode={setDogCode}
                                    />
                                )
                            )}
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default LargeDogList;