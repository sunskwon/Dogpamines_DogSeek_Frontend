import { useState, useEffect } from 'react';

import { GetAPIwoToken } from '../../api/RestAPIs';

import DogSearch from './doglist/DogSearch';
import SmallDogList from './doglist/SmallDogList';
import MediumDogList from './doglist/MediumDogList';
import LargeDogList from './doglist/LargeDogList';

import styles from './DogList.module.css';

function DogList({ setDogCode }) {

    const [searchCriteria, setSearchCriteria] = useState({
        type: 'dogName',
        input: ' '
    });
    const [boolSearch, setBoolSearch] = useState(false);
    const [boolRefresh, setBoolRefresh] = useState(false);
    const [smallDogList, setSmallDogList] = useState([]);
    const [mediumDogList, setMediumDogList] = useState([]);
    const [largeDogList, setLargeDogList] = useState([]);
    const [emptyDogList, setEmptyDogList] = useState(false);

    const fetch = async (address) => {

        const response = await GetAPIwoToken(address);

        return response.dict;
    };

    const separate = (dogList) => {

        setEmptyDogList(false);

        if (dogList.length === 0) {

            setEmptyDogList(true);
        } else {

            setSmallDogList(dogList.filter(dog => dog.dogSize === '소형견'))
            setMediumDogList(dogList.filter(dog => dog.dogSize === '중형견'))
            setLargeDogList(dogList.filter(dog => dog.dogSize === '대형견'))
        }
    };

    useEffect(() => {

        window.scrollTo(0, 0);

        fetch('/dict')
            .then(res => separate(res));
    }, []);

    useEffect(() => {

        window.scrollTo(0, 0);

        fetch(`/dict/search?type=${searchCriteria.type}&input=${searchCriteria.input}`)
            .then(res => separate(res));

        setSearchCriteria({ type: 'dogName', input: '' });
    }, [boolSearch]);

    useEffect(() => {

        fetch('/dict')
            .then(res => separate(res));
    }, [boolRefresh]);

    return (
        <>
            <DogSearch
                searchCriteria={searchCriteria}
                setSearchCriteria={setSearchCriteria}
                boolSearch={boolSearch}
                setBoolSearch={setBoolSearch}
                boolRefresh={boolRefresh}
                setBoolRefresh={setBoolRefresh}
            />
            {emptyDogList ? (
                <>
                    <div className={styles.errorContainer} >
                        <img src='/images/animal/cuteDog.png' alt='error' />
                        <p>검색된 견종이 없습니다</p>
                    </div>
                </>
            ) : (
                <>
                    {
                        smallDogList.length > 0 &&
                        <SmallDogList
                            dogList={smallDogList}
                            setDogCode={setDogCode}
                        />
                    }
                    {mediumDogList.length > 0 &&
                        <MediumDogList
                            dogList={mediumDogList}
                            setDogCode={setDogCode}
                        />
                    }
                    {largeDogList.length > 0 &&
                        <LargeDogList
                            dogList={largeDogList}
                            setDogCode={setDogCode}
                        />
                    }
                </>
            )}
        </>
    );
}

export default DogList;