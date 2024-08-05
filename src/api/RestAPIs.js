import cookie from "react-cookies";
import axios from 'axios';

export function GetAPIwoToken(address) {

    const baseUrl = process.env.REACT_APP_SPRING_SERVER;
    const url = `${baseUrl}${address}`

    return (
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Cross-Allow-Origin': '*',
            },
        }).then(res => res.json())
    );
}

export function GetAPINotToken(address) {

    const baseUrl = process.env.REACT_APP_SPRING_SERVER;
    const url = `${baseUrl}${address}`;

    return (
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Cross-Allow-Origin': '*',
            },
        }).then(res => res.json())
    );
};

export async function GetAPI(address) {

    const baseUrl = process.env.REACT_APP_SPRING_SERVER;
    const url = `${baseUrl}${address}`;
    const accessToken = await GetValidAccessToken();

    return (
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Cross-Allow-Origin': '*',
                "Authorization": accessToken
            },
        }).then(res => res.json())
    );
};

export async function GetAPIWCookie(address) {

    const baseUrl = process.env.REACT_APP_SPRING_SERVER;
    const url = baseUrl + address;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Access-Cross-Allow-Origin': '*',
            'Identifier': cookie.load('Identifier') ? cookie.load('Identifier') : '',
        },
    });

    if (!cookie.load('Identifier')) {

        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 60);

        cookie.save('Identifier', response.headers.get('Identifier', {
            path: '/',
            expires,
        }));
    };

    const result = await response.json();

    return result;
}

export async function PostAPI(address, Object) {

    const baseUrl = process.env.REACT_APP_SPRING_SERVER;
    const url = `${baseUrl}${address}`;
    const accessToken = await GetValidAccessToken();

    return (
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Cross-Allow-Origin': '*',
                "Authorization": accessToken
            },
            body: JSON.stringify(Object),
        })
    );
};

export async function PostAPIwoToken(address, Object) {

    const baseUrl = process.env.REACT_APP_SPRING_SERVER;
    const url = `${baseUrl}${address}`;

    return (
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Cross-Allow-Origin': '*',
            },
            body: JSON.stringify(Object),
        })
    );
};

export async function PutAPI(address, Object) {

    const baseUrl = process.env.REACT_APP_SPRING_SERVER;
    const url = `${baseUrl}${address}`;
    const accessToken = await GetValidAccessToken();

    return (
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Cross-Allow-Origin': '*',
                "Authorization": accessToken
            },
            body: JSON.stringify(Object),
        })
    );
};

export async function PutAPIwoToken(address, Object) {

    const baseUrl = process.env.REACT_APP_SPRING_SERVER;
    const url = `${baseUrl}${address}`;
    const accessToken = await GetValidAccessToken();

    return (
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Cross-Allow-Origin': '*',
            },
            body: JSON.stringify(Object),
        })
    );
};

export async function DeleteAPI(address) {

    const baseUrl = process.env.REACT_APP_SPRING_SERVER;
    const url = `${baseUrl}${address}`;
    const accessToken = await GetValidAccessToken();

    return (
        fetch(url, {
            method: 'Delete',
            headers: {
                'Access-Cross-Allow-Origin': '*',
                "Authorization": accessToken
            },
        })
    );
};

// Login
export const callLoginAPI = async ({ user }) => {

    const baseUrl = process.env.REACT_APP_SPRING_SERVER;
    const requestURL = `${baseUrl}/login`;

    try {
        const response = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                userId: user.userId,
                userPass: user.userPass
            })
        });

        const jwtToken = response.headers.get("Authorization");
        const refreshToken = response.headers.get("Refresh-Token");
        // console.log(`JWT Token: ${jwtToken}`);
        // console.log(`refreshToken : ${refreshToken}`);

        if (response.status === 200 && jwtToken) {

            // 토큰 localStorage에 저장
            window.localStorage.setItem('accessToken', jwtToken);
            window.localStorage.setItem('refreshToken', refreshToken);

            const result = 'true';
            return result;
        } else if (response.status === 204) {
            const result = 'SLEEP'
            return result;
        } else {
            const result = 'false';
            return result;
        }

    } catch (error) {
        console.error('에러 발생', error);
        return { status: 'error', message: error.message };
    }
};

export const checkAPI = async (check) => {
    const baseUrl = process.env.REACT_APP_SPRING_SERVER;
    const requestURL = `${baseUrl}/user/check`;

    try {
        const response = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Control-Allow-Origin': '*', // CORS 설정
            },
            body: JSON.stringify(check),
        });

        // console.log(`response : ${response}`);
        // console.log(`headers : ${response.headers}`);

        if (response.status === 200) {
            const result = response.headers.get("Result");
            // console.log(`q result : ${result}`);
            return result;
        } else {
            console.error(`HTTP 상태 코드: ${response.status}`);
            return null;
        }
    } catch (error) {
        console.error('에러 발생', error);
        return { status: 'error', message: error.message };
    }
};

// 회원가입
export const callRegisterAPI = async ({ user }) => {

    const baseUrl = process.env.REACT_APP_SPRING_SERVER;
    const requestURL = `${baseUrl}/signup`;

    const requestBody = JSON.stringify({
        userId: user.userId,
        userPass: user.password,
        userNick: user.nick,
        userPhone: user.phone
    });

    const response = await fetch(requestURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: requestBody
    });

    if (response.status === 200) {
        const result = response.headers.get("Result");
        // console.log(`q result : ${result}`);
        return result;
    } else {
        throw new Error("Failed to register");
    }

}

// 이메일 인증 코드 발송
export const callEmailVerification = async (email, type) => {

    const baseUrl = process.env.REACT_APP_SPRING_SERVER;
    const requestURL = `${baseUrl}/api/auth/send-verification-email`;
    const requestBody = JSON.stringify({
        email: email,
        type: type
    });

    const response = await fetch(requestURL, {

        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            'Access-Control-Allow-Origin': '*',
        },
        body: requestBody
    });

    if (response.status === 200) {
        const result = 'true';
        return result;
    } else {
        const result = 'false';
        return result;
    }
}

// 이메일 인증 확인
export const callEmailVerify = async (email, authNum) => {

    const baseUrl = process.env.REACT_APP_SPRING_SERVER;
    const requestURL = `${baseUrl}/api/auth/verify-email`;
    const requestBody = JSON.stringify({
        email: email,
        token: authNum
    });

    const response = await fetch(requestURL, {

        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            'Access-Control-Allow-Origin': '*',
        },
        body: requestBody
    });

    if (response.status === 200) {
        const result = response.headers.get("Result");
        return result;
    } else {
        const result = 'false';
        return result;
    }
}

// 사용자 ID 조회
export const callFindUserId = async (phone) => {

    const baseUrl = process.env.REACT_APP_SPRING_SERVER;
    const requestURL = `${baseUrl}/user/find/email`;
    const requestBody = JSON.stringify({
        phoneNumber: phone
    });

    const response = await fetch(requestURL, {

        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            'Access-Control-Allow-Origin': '*',
        },
        body: requestBody
    });

    if (response.status === 200) {
        const result = response.headers.get("Result");
        console.log(`q result : ${result}`);    // userId
        return result;
    } else {
        const result = 'false';
        return result;
    }
}

// 사용자 비밀번호 변경
export const callChangePwd = async (userId, userPass) => {

    const baseUrl = process.env.REACT_APP_SPRING_SERVER;
    const requestURL = `${baseUrl}/user/change/pwd`;
    const requestBody = JSON.stringify({
        id: userId,
        pwd: userPass
    });

    const response = await fetch(requestURL, {

        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Access-Control-Allow-Origin": "*",
        },
        body: requestBody
    });

    if (response.status === 201) {
        const result = 'true';
        return result;
    } else {
        const result = 'false';
        return result;
    }

}

// 로그아웃
export const callLogoutAPI = async () => {

    const baseUrl = process.env.REACT_APP_SPRING_SERVER;
    const requestURL = `${baseUrl}/auth/logout`;
    const accessToken = await GetValidAccessToken();

    const response = await fetch(requestURL, {

        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            'Access-Control-Allow-Origin': '*',
            "Authorization": accessToken,
            "Refresh-Token": window.localStorage.getItem("refreshToken"),
        }
    });

    if (response.status === 200) {
        const result = 'true';
        return result;
    } else {
        const result = 'false';
        return result;
    }

}

// 토큰 만료 여부 확인하는 함수
export function CheckTokenExpiration() {
    const accessToken = window.localStorage.getItem("accessToken");
    try {
        const decodedToken = parseJwt(accessToken); // jwt-decode를 이용해 토큰을 디코딩
        const exp = decodedToken.exp * 1000; // JWT의 exp는 초 단위이므로 밀리초로 변환

        const currentTime = new Date().getTime();

        return currentTime > exp; // 현재 시간이 만료 시간을 지났으면 true를 반환
    } catch (error) {
        return true; // JWT 디코딩 중 오류가 발생하면 만료된 것으로 간주
    }
}

// Refresh Token을 사용하여 새로운 Access Token을 발급받는 함수
export async function RefreshAccessToken() {

    const baseUrl = process.env.REACT_APP_SPRING_SERVER;
    const requestURL = `${baseUrl}/auth/refresh`;

    const refreshToken = window.localStorage.getItem('refreshToken');
    const accessToken = window.localStorage.getItem('accessToken');

    try {
        const response = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Cross-Allow-Origin': '*',
                "Authorization": accessToken,
                'Refresh-Token': refreshToken
            }
        });
        if (!response.ok) {
            throw new Error('Failed to refresh access token');
        }
        const jwtToken = response.headers.get("Authorization");

        if (response.status === 200 && jwtToken) {
            // 새로 발급된 Access Token을 localStorage에 저장
            window.localStorage.setItem('accessToken', jwtToken);
            return jwtToken;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

// JWT를 디코딩하여 페이로드를 반환하는 함수
export function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// 유효한 Access Token을 반환하는 함수
export async function GetValidAccessToken() {

    if (CheckTokenExpiration()) {
        const newAccessToken = await RefreshAccessToken();
        return newAccessToken;
    } else {
        const accessToken = window.localStorage.getItem('accessToken');
        return accessToken;
    }

}

// 휴면해제
export const callUpdateSleep = async (userId) => {

    const baseUrl = process.env.REACT_APP_SPRING_SERVER;
    const requestURL = `${baseUrl}/user/release/sleep`;
    const requestBody = JSON.stringify({
        id: userId
    });

    const response = await fetch(requestURL, {

        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Access-Control-Allow-Origin": "*",
        },
        body: requestBody
    });

    if (response.status === 201) {
        const result = 'true';
        return result;
    } else {
        const result = 'false';
        return result;
    }
}

export const CallShopAPI = async (name) => {

    return await axios
        .get(`/v1/search/shop.json?query=${name}&display=10&start=1&sort=sim`,
            {
                headers: {
                    "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
                    "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
                    'Accept': '*/*',
                    'Access-Cross-Allow-Origin': '*',
                },
            })
        .then(res => (res.data.items).sort((a, b) => a.lprice - b.lprice))
        .catch(e => {
            console.log('Api Not Found', e)
        });
};