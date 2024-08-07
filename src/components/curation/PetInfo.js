import { useState, useEffect } from 'react';

import { GetAPIwoToken } from "../../api/RestAPIs"

import CommonModal from '../../components/common/CommonModal';

import styles from './PetInfo.module.css'

function PetInfo({ curation, setCuration, setStep }) {

    const [dogList, setDogList] = useState([]);
    const [modal, setModal] = useState({
        open: false,
        type: '',
        text: '',
    });

    const onChangeHandler = e => {

        setCuration({
            ...curation,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {

        const fetch = async () => {

            return await GetAPIwoToken('/dict');
        };

        fetch()
            .then(res => setDogList(res.dict));
    }, []);

    const onSubmitHandler = e => {

        e.preventDefault();

        if (isNaN(Number(curation.weight))) {

            setModal({ open: true, type: 'warning', text: '몸무게는 숫자만 입력하세요' });
        } else {

            setStep(2);
        }
    };

    return (
        <>
            <form
                className={styles.container}
                onSubmit={onSubmitHandler}
            >
                <div className={styles.contentBox}>
                    <div className={styles.labelBox}>
                        <label>이름</label>
                        <label>성별</label>
                        <label>견종</label>
                        <label>몸무게</label>
                    </div>
                    <div className={styles.lineBox}>
                        <hr className={styles.verticalLine}></hr>
                    </div>
                    <div className={styles.inputBox}>
                        <input
                            type='text'
                            name='name'
                            placeholder='강아지 이름을 입력하세요'
                            onChange={onChangeHandler}
                            maxLength={32}
                        />
                        <select
                            name='gender'
                            onChange={onChangeHandler}
                            defaultValue=''
                        >
                            <option
                                value=''
                                disabled
                            >
                                선택
                            </option>
                            <option value='남'>남</option>
                            <option value='여'>여</option>
                        </select>
                        <select
                            name='breed'
                            onChange={onChangeHandler}
                            defaultValue=''
                        >
                            <option
                                value=''
                                disabled
                            >
                                선택
                            </option>
                            {dogList.map(dog => (
                                <option
                                    key={dog.dogCode}
                                    value={dog.dogName}
                                >
                                    {dog.dogName}
                                </option>
                            ))}
                        </select>
                        <div className={styles.wrapBox}>
                            <input
                                type='text'
                                name='weight'
                                placeholder='강아지 몸무게를 입력하세요'
                                onChange={onChangeHandler}
                                maxLength={32}
                                style={{ width: "350px", }}
                            />
                            <span>kg</span>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className={styles.button}
                    disabled={!(curation.name && curation.gender && curation.breed && curation.weight)}
                    onClick={onSubmitHandler}
                >
                    다음
                </button>
            </form>
            <CommonModal
                modal={modal}
                setModal={setModal}
            />
        </>
    );
}

export default PetInfo;