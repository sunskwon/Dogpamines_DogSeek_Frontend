import { useState, useEffect } from 'react';

import { GetAPIwoToken } from '../../api/RestAPIs';

import DogSearch from './DogSearch';
import SmallDogList from './SmallDogList';
import MediumDogList from './MediumDogList';
import LargeDogList from './LargeDogList';

function DogList() {

    const [searchCriteria, setSearchCriteria] = useState({
        type: 'dogName',
        input: ' '
    });
    const [boolSearch, setBoolSearch] = useState(false);
    const [smallDogList, setSmallDogList] = useState([]);
    const [mediumDogList, setMediumDogList] = useState([]);
    const [largeDogList, setLargeDogList] = useState([]);
    const [emptyDogList, setEmptyDogList] = useState(false);

    const fetch = async (address) => {

        const response = await GetAPIwoToken(address);

        return response.dict;
    };

    const separate = (dogList) => {

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

    return (
        <>
            <DogSearch
                searchCriteria={searchCriteria}
                setSearchCriteria={setSearchCriteria}
                boolSearch={boolSearch}
                setBoolSearch={setBoolSearch}
            />
            {emptyDogList ? (
                <>
                    <p>empty</p>
                </>
            ) : (
                <>
                    {
                        smallDogList.length > 0 &&
                        <SmallDogList
                            dogList={smallDogList}
                        />
                    }
                    {mediumDogList.length > 0 &&
                        <MediumDogList
                            dogList={mediumDogList}
                        />
                    }
                    {largeDogList.length > 0 &&
                        <LargeDogList
                            dogList={largeDogList}
                        />
                    }
                </>
            )}
        </>
    );
}

export default DogList;