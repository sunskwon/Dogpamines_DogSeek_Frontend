import { useState, useEffect } from 'react';

import SignUpSteps from '../components/signup/SignUpSteps';
import FirstStep from '../components/signup/FirstStep';
import SecondStep from '../components/signup/SecondStep';
import ThirdStep from '../components/signup/ThirdStep';
import FourthStep from '../components/signup/FourthStep';

function SignUp() {

    const [step, setStep] = useState(1);
    const [signup, setSignup] = useState({
        email: '',
        nick: '',
        pwd: '',
        pwdConfirmation: '',
        phone: '',
    });

    useEffect(() => {
        
        window.scrollTo(0, 0);
    }, [step]);

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
            {step === 4 &&
                <FourthStep />
            }
        </>
    );
}

export default SignUp;