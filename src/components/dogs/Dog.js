import { useState, useEffect } from 'react';

import { GetAPIwoToken } from '../../api/RestAPIs';

import DogSummary from './DogSummary';
import DogDetail from './DogDetail';
import DogCharacter from './DogCharacter';

import styles from './Dog.module.css';

function Dog({ dogCode, setDogCode }) {

    const [dog, setDog] = useState({});

    useEffect(() => {

        const fetch = async (dogCode) => {

            const response = await GetAPIwoToken(`/dict/${dogCode}`);

            return response.dict
        }

        window.scrollTo(0, 0);

        if (dogCode !== 0) {
            fetch(dogCode)
                .then(res => setDog(res));
        }

    }, [dogCode]);

    const onClickHandler = () => {

        setDogCode(0);
    };

    return (
        <>
            <div className={styles.container}>
                <DogSummary
                    dog={dog}
                    setDogCode={setDogCode}
                />
                <DogDetail
                    dog={dog}
                />
                <DogCharacter
                    dog={dog}
                />
                <button
                    className={styles.returnButton}
                    onClick={onClickHandler}
                >
                    돌아가기
                </button>
            </div>
        </>
    );
}

export default Dog;