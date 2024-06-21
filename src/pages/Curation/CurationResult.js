import styles from './CurationResult.module.css'
import Loding from '../../components/common/Loding';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CurationProducts from '../../../src/components/curation/CurationProducts'
import CurationInsert from '../../components/curation/CurationInsert';

function CurationResult() {

    const location = useLocation();

    const { name } = location.state;
    const { gender } = location.state;
    const { breed } = location.state;
    const { weight } = location.state;
    const { size }  = location.state;
    const { age } = location.state;
    const { neut } = location.state;
    const { allergy } = location.state;
    const { disease } = location.state;
    const { ingra } = location.state;
    const { cook } = location.state;

    // const [loding, setLoding] = useState(true);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //     setLoding(false);
    //     }, 5000); 
        
    //     return () => clearTimeout(timer); 
    // }, []);
    
    // if (loding) {
    //     return <Loding />;
    // }

    return (
        <div className={styles.mainBox}>
            <div className={styles.titleBox}>
                <p style={{fontSize:'36px', fontWeight:'bold'}}>DogSeek</p>
                <p style={{fontSize:'36px', fontWeight:'bold', color:'#63C54A', paddingLeft:'10px'}}>Recommend</p>
            </div>
            <div className={styles.nameBox}>
                <p style={{fontSize:'32px', fontWeight:'bold', color:'#63C54A', margin:'0'}}>{name}</p>
                <p style={{fontSize:'32px', fontWeight:'bold', margin:'0'}}>에게 어울리는 사료는?</p>
            </div>
            <div className={styles.productsBox}>
                <CurationInsert 
                name={name}
                gender={gender}
                breed={breed}
                weight={weight}
                size={size}
                age={age}
                neut={neut}
                allergy={allergy}
                disease={disease}
                ingra={ingra}
                cook={cook}
                />
                <CurationProducts 
                age={age}
                allergy={allergy}
                disease={disease}
                ingra={ingra}
                cook={cook}
                name={name}
                />
            </div>
        </div>        
    )
}

export default CurationResult;