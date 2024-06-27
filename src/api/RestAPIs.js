export function GetAPI(address) {

    const baseUrl = 'http://localhost:8080';
    const url = `${baseUrl}${address}`;

    return (
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Cross-Allow-Origin': '*',
                "Authorization": window.localStorage.getItem("accessToken")
            },
        }).then(res => res.json())
    );
};

export function PostAPI(address, Object) {

    const baseUrl = 'http://localhost:8080';
    const url = `${baseUrl}${address}`;

    return (
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Cross-Allow-Origin': '*',
                "Authorization": window.localStorage.getItem("accessToken")
            },
            body: JSON.stringify(Object),
        })
    );
};

export function PutAPI(address, Object) {

    const baseUrl = 'http://localhost:8080';
    const url = `${baseUrl}${address}`;

    return (
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Cross-Allow-Origin': '*',
                "Authorization": window.localStorage.getItem("accessToken")
            },
            body: JSON.stringify(Object),
        })
    );
};

export function DeleteAPI(address) {

    const baseUrl = 'http://localhost:8080';
    const url = `${baseUrl}${address}`;

    return (
        fetch(url, {
            method: 'Delete',
            headers: {
                'Access-Cross-Allow-Origin': '*',
                "Authorization": window.localStorage.getItem("accessToken")
            },
        })
    );
};

// Login
export const callLoginAPI = async({ user }) => {

    const requestURL = 'http://localhost:8080/login';

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
        const result = await response.json();
        const userCode = result.userInfo.userCode;
        const userNick = result.userInfo.userNick;
        const userAuth = result.userInfo.userAuth;
        console.log(`userCode : ${userCode}`)
        // console.log('[callLoginAPI] 로그인 API : ', result);

        if (response.status === 200) {
            // 토큰과 사용자 정보 localStorage에 저장
            window.localStorage.setItem('userCode',userCode);
            window.localStorage.setItem('userNick', userNick);
            window.localStorage.setItem('userAuth', userAuth);
            window.localStorage.setItem('accessToken', jwtToken);
        };

        return result;

    } catch (error) {
        console.error('에러 발생', error);
        return { status: 'error', message: error.message };
    }
};