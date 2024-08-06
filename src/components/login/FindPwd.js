import { useState } from 'react';

import IdConfirmation from './findpwd/IdConfirmation';
import ResetPwd from './findpwd/ResetPwd';

import style from './FindPwd.module.css';

function FindPwd({ user, setUser, setIsFindPwd }) {

    const [isIdConfirmed, setIsIdConfirmed] = useState(false);

    return (
        <>
            <div className={style.findPwdBox}>
                {isIdConfirmed ?
                    <ResetPwd
                        user={user}
                        setUser={setUser}
                        setIsIdConfirmed={setIsIdConfirmed}
                        setIsFindPwd={setIsFindPwd}
                    />
                    :
                    <IdConfirmation
                        user={user}
                        setUser={setUser}
                        setIsIdConfirmed={setIsIdConfirmed}
                    />
                }
            </div>
        </>
    );
}

export default FindPwd;