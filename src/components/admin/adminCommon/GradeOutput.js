function GradeOutput({ grade }) {

    return (
        <div>
            <img
                src={grade > 0 ? "/images/admin/StarOn.png" : "/images/admin/starOff.png"}
                alt={grade > 0 ? "•" : " "}
            />
            <img
                src={grade > 1 ? "/images/admin/StarOn.png" : "/images/admin/starOff.png"}
                alt={grade > 1 ? "•" : " "}
            />
            <img
                src={grade > 2 ? "/images/admin/StarOn.png" : "/images/admin/starOff.png"}
                alt={grade > 2 ? "•" : " "}
            />
            <img
                src={grade > 3 ? "/images/admin/StarOn.png" : "/images/admin/starOff.png"}
                alt={grade > 3 ? "•" : " "}
            />
            <img
                src={grade > 4 ? "/images/admin/StarOn.png" : "/images/admin/starOff.png"}
                alt={grade > 4 ? "•" : " "}
            />
        </div>
    );
}

export default GradeOutput;