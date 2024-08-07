import { useState } from 'react';

import CurationSteps from '../components/curation/CurationSteps';
import PetInfo from '../components/curation/PetInfo';

function Curation() {

    const [step, setStep] = useState(1);
    const [curation, setCuration] = useState({
        name: '',
        gender: '',
        breed: '',
        weight: '',
    });

    return (
        <>
            <CurationSteps
                step={step}
            />
            {step === 1 ?
                <PetInfo
                    curation={curation}
                    setCuration={setCuration}
                    setStep={setStep}
                />
                :
                <>
                </>
            }
        </>
    );
}

export default Curation;