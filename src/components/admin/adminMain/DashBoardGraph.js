import DiscreteGraph from "./DiscreteGraph";
import AccumulateGraph from "./AccumulateGraph";

function DashBoardGraph({ counts, date }) {

    return (
        <div>
            <div style={{ display: "flex", }}>
                <div style={{ width: "480px", }}>
                    <DiscreteGraph
                        counts={counts}
                        date={date}
                    />
                </div>
                <div style={{ width: "480px", }}>
                    <AccumulateGraph
                        counts={counts}
                        date={date}
                    />
                </div>
            </div>
        </div>
    );
}

export default DashBoardGraph;