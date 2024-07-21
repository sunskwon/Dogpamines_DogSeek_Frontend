import { useState, useEffect } from 'react';

import { GetAPIwoToken } from '../../api/RestAPIs';

import DogSearch from './DogSearch';

import styles from './DogList.module.css';

function DogList() {

    const [dogList, setDogList] = useState([]);
    const [search, setSearch] = useState();

    useEffect(() => {

        const call = async () => {

            const response = await GetAPIwoToken('/dict');

            return response.dict;
        };

        call().then(res => setDogList(res));
    }, []);

    console.log(dogList);

    return (
        <>
            <DogSearch
                search={search}
                setSearch={setSearch}
            />
            <hr style={{ width: "1180px", backgroundColor: "#D4D4D4", }} />
        </>
    );
}

export default DogList;