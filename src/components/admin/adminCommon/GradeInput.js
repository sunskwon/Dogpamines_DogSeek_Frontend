function GradeInput({ target, form, setForm }) {

    return (
        <div>
            <img
                src={form[target] > 0 ? "/images/admin/StarOn.png" : "/images/admin/starOff.png"}
                alt={form[target] > 0 ? "•" : " "}
                onClick={() => {
                    setForm({
                        ...form,
                        [target]: 1
                    });
                }}
            />
            <img
                src={form[target] > 1 ? "/images/admin/StarOn.png" : "/images/admin/starOff.png"}
                alt={form[target] > 1 ? "•" : " "}
                onClick={() => {
                    setForm({
                        ...form,
                        [target]: 2
                    });
                }}
            />
            <img
                src={form[target] > 2 ? "/images/admin/StarOn.png" : "/images/admin/starOff.png"}
                alt={form[target] > 2 ? "•" : " "}
                onClick={() => {
                    setForm({
                        ...form,
                        [target]: 3
                    });
                }}
            />
            <img
                src={form[target] > 3 ? "/images/admin/StarOn.png" : "/images/admin/starOff.png"}
                alt={form[target] > 3 ? "•" : " "}
                onClick={() => {
                    setForm({
                        ...form,
                        [target]: 4
                    });
                }}
            />
            <img
                src={form[target] > 4 ? "/images/admin/StarOn.png" : "/images/admin/starOff.png"}
                alt={form[target] > 4 ? "•" : " "}
                onClick={() => {
                    setForm({
                        ...form,
                        [target]: 5
                    });
                }}
            />
        </div>
    );
}

export default GradeInput;