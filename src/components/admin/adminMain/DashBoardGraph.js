import { useState, useEffect } from "react";

import { GetAPI } from "../../../api/RestAPIs";

import UserGraph from "./UserGraph";

function DashBoardGraph() {

    const [counts, setCounts] = useState([]);

    const call = async () => {

        const address = '/dashboard';

        const response = await GetAPI(address);

        const result = await response.Counts;

        return result;
    }

    useEffect(() => {
        call().then(res => setCounts(res));
    }, []);

    return (
        <div style={{ display: "flex", }}>
            <UserGraph
                counts={counts}
            />
            <UserGraph
                counts={counts}
            />
        </div>
    );
}

export default DashBoardGraph;