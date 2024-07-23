import DogGrade from './DogGrade';

import styles from './DogCharacter.module.css';

function DogCharacter({ dog }) {

    return (
        <>
            <div className={styles.container}>
                <p className={styles.title}>특징</p>
                <div className={styles.charactersBox}>
                    <div className={styles.character}>
                        <p>침흘림</p>
                        <DogGrade
                            grade={dog.dogDrool}
                        />
                    </div>
                    <div className={styles.character}>
                        <p>더위 적응</p>
                        <DogGrade
                            grade={dog.dogHot}
                        />
                    </div>
                    <div className={styles.character}>
                        <p>사회성</p>
                        <DogGrade
                            grade={dog.dogSocial}
                        />
                    </div>
                    <div className={styles.character}>
                        <p>추위 적응</p>
                        <DogGrade
                            grade={dog.dogCold}
                        />
                    </div>
                    <div className={styles.character}>
                        <p>털빠짐</p>
                        <DogGrade
                            grade={dog.dogShed}
                        />
                    </div>
                    <div className={styles.character}>
                        <p>실내 적합성</p>
                        <DogGrade
                            grade={dog.dogHouse}
                        />
                    </div>
                    <div className={styles.character}>
                        <p>짖음</p>
                        <DogGrade
                            grade={dog.dogBark}
                        />
                    </div>
                    <div className={styles.character}>
                        <p>그루밍 요구</p>
                        <DogGrade
                            grade={dog.dogGroom}
                        />
                    </div>
                    <div className={styles.character}>
                        <p>가족 반려 동물</p>
                        <DogGrade
                            grade={dog.dogPet}
                        />
                    </div>
                    <div className={styles.character}>
                        <p>활동량</p>
                        <DogGrade
                            grade={dog.dogActi}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default DogCharacter;