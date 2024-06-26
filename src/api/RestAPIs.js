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

        const result = await response.json();
        // console.log('[callLoginAPI] 로그인 API : ', result);

        if (response.status === 200) {
            window.localStorage.setItem('accessToken', result);
        };

        return result;

    } catch (error) {
        console.error('에러 발생', error);
        return { status: 'error', message: error.message };
    }
};