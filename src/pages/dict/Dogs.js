import { useState } from 'react';

import DogList from "../../components/dogs/DogList";
import Dog from '../../components/dogs/Dog';

function Dogs() {

    const [dogCode, setDogCode] = useState(0);

    return dogCode === 0 ? (
        <>
            <DogList
                setDogCode={setDogCode}
            />
        </>
    ) : (
        <>
            <Dog
                dogCode={dogCode}
                setDogCode={setDogCode}
            />
        </>
    )
}

export default Dogs;