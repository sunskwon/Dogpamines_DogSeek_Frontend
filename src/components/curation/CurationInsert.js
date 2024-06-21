import { useState, useEffect } from "react";

function CurationInsert({name, gender, breed, weight, size, age, neut, allergy, disease, ingra, cook}) {

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    
    const toDate = `${year}-${month}-${day}`;

    const [curation, setCuration] = useState({
        curationAge: age,
        curationIngra: ingra,
        curationDisease: disease,
        curationAllergy: allergy,
        curationBreed: breed,
        curationGender: gender,
        curationNeut: neut,
        curaitonWeight: weight,
        curationName: name,
        curationDate: toDate,
        curationSize: size,
        curationCook: cook,
        userCode: 1,
    });

    const curationInsert = async () => {

        const url = 'http://localhost:8080/curation';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Controll-Allow-Origin': '*',
            },
            body: JSON.stringify(curation),
        });
        console.log(JSON.stringify(curation))
    };

    useEffect (() => {
        curationInsert();
    }, []);

    return null;
}

export default CurationInsert;