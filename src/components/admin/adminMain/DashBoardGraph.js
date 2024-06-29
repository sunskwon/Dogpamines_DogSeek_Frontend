import UserGraph from "./UserGraph";
import ActGraph from "./ActGraph";

function DashBoardGraph({ counts }) {

    return (
        <div style={{ display: "flex", }}>
            <div style={{ width: "480px", }}>
                <UserGraph
                    counts={counts}
                />
            </div>
            <div style={{ width: "480px", }}>
                <ActGraph
                    counts={counts}
                />
            </div>
        </div>
    );
}

export default DashBoardGraph;