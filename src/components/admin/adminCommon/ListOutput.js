function ListOutput({ list }) {

    return (
        <div>
            {list.map((item, index) => (
                <div
                    key={index}
                    style={{ display: "flex", float: "left", }}
                >
                    <span>{item}</span>
                </div>
            ))}
        </div>
    );
}

export default ListOutput;