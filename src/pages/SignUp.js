import { useState } from 'react';

import SignUpSteps from '../components/signup/SignUpSteps';
import FirstStep from '../components/signup/FirstStep';
import SecondStep from '../components/signup/SecondStep';
import ThirdStep from '../components/signup/ThirdStep';

function SignUp() {

    const [step, setStep] = useState(3);
    const [signup, setSignup] = useState({
        email: '',
        nick: '',
        pwd: '',
        phone: '',
    });

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
            {step === 2 &&
                <SecondStep
                    setStep={setStep}
                    signup={signup}
                    setSignup={setSignup}
                />
            }
            {step === 3 &&
                <ThirdStep
                    setStep={setStep}
                    signup={signup}
                    setSignup={setSignup}
                />
            }
        </>
    );
}

export default SignUp;