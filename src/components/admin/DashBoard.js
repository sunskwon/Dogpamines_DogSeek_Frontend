import { useState, useEffect } from "react";

import { GetAPI } from "../../api/RestAPIs";

function DashBoard() {

    const [data, setData] = useState([]);

    const call = async () => {

        const address = '/boards';

        const response = await GetAPI(address);

        const result = await response.Post;

        return result;
    }

    useEffect(() => {
        call().then(res => setData(res));
    }, []);

    return (
        <div>
            {/* {data.map(item => (
                <div>
                    <p>{`postCode: ${item.postCode}`}</p>
                    <p>{`postDate: ${item.postDate}`}</p>
                    <hr />
                </div>
            ))} */}
        </div>
    );
}

export default DashBoard;