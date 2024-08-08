import { useState } from 'react';

import CurationSteps from '../components/curation/CurationSteps';
import PetInfo from '../components/curation/PetInfo';
import PetSize from '../components/curation/PetSize';

function Curation() {

    const [step, setStep] = useState(1);
    const [curation, setCuration] = useState({
        name: '',
        gender: '',
        breed: '',
        weight: '',
        size: '',
    });

    return (
        <>
            <CurationSteps
                step={step}
                curation={curation}
            />
            {step === 1 ?
                <PetInfo
                    curation={curation}
                    setCuration={setCuration}
                    setStep={setStep}
                />
                :
                (step === 2 ?
                    <PetSize
                        curation={curation}
                        setCuration={setCuration}
                        setStep={setStep}
                    />
                    :
                    <>
                    </>
                )
            }
        </>
    );
}

export default Curation;