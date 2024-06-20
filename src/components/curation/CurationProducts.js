import { useState, useEffect } from "react";

function CurationProducts({age, allergy, disease, ingra, cook}) {

    const [products, setProducts] = useState([]);

    const curationProducts = async () => {

        const url = `http://localhost:8080/curation?curationAge=${age}&curationIngra=${ingra}&curationDisease=${disease}&curationAllergy=${allergy}&curationCook=${cook}`;
        console.log("url:", url)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Controll-Allow-Origin': '*',
            }
        }).then(res => res.json());
        console.log(response.headers);
        const result = await response.products;
        console.log("result:", result);

        return result;
    };

    useEffect(() => {
        curationProducts().then(res => setProducts(res));
    }, [age, allergy, disease, ingra, cook]);

    return(
        <>
            {products.map (product => (
                <tr
                    key={product.prodCode}
                >
                    <td>{product.prodName}</td>
                    <td>{product.prodManuFac}</td>
                </tr>
            ))}
        </>
    );
}

export default CurationProducts;