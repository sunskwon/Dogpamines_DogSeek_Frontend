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