import { useState } from 'react';

import SignUpSteps from '../components/signup/SignUpSteps';
import FirstStep from '../components/signup/FirstStep';

function SignUp() {

    const [step, setStep] = useState(1);

    return (
        <>
            <SignUpSteps
                step={step}
            />
            {step === 1 &&
                <FirstStep
                    setStep={setStep}
                />
            }
        </>
    );
}

export default SignUp;