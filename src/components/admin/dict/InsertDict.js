import { useState } from "react";

import styles from "./AdminDict.module.css";

function InsertDict({ dict, setDict }) {

    const [diseaseInput, setDiseaseInput] = useState('');
    const [disease, setDisease] = useState([]);

    const valueChangeHandler = e => {
        setDict({
            ...dict,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className={styles.detailProductBox}>
            <div style={{ width: "680px", }}>
                <div style={{ width: "510px", float: "left", }}>
                    <div>
                        <div className={styles.detailProductBoxPart}>
                            <p>이미지</p>
                        </div>
                        <div className={styles.detailProductBoxPart}>
                            <p>견종코드</p>
                            <input
                                style={{ backgroundColor: "rgba(212, 212, 212, 1)" }}
                                disabled
                            />
                            <p>
                                체고
                                &nbsp;
                                <img
                                    src="/images/admin/Male.png"
                                    style={{ height: "15px", }}
                                />
                            </p>
                            <input
                                type="text"
                                name="dogHeightM"
                                onChange={valueChangeHandler}
                                style={{ width: "100px", }}
                            />
                            <span>cm</span>
                            <p>
                                체중
                                &nbsp;
                                <img
                                    src="/images/admin/Male.png"
                                    style={{ height: "15px", }}
                                />
                            </p>
                            <input
                                type="text"
                                name="dogWeightM"
                                onChange={valueChangeHandler}
                                style={{ width: "100px", }}
                            />
                            <span>kg</span>
                        </div>
                        <div className={styles.detailProductBoxPart}>
                            <p>견종명</p>
                            <input
                                type="text"
                                name="dogName"
                                onChange={valueChangeHandler}
                            />
                            <p>
                                체고
                                &nbsp;
                                <img
                                    src="/images/admin/Female.png"
                                    style={{ height: "15px", }}
                                />
                            </p>
                            <input
                                type="text"
                                name="dogHeightF"
                                onChange={valueChangeHandler}
                                style={{ width: "100px", }}
                            />
                            <span>cm</span>
                            <p>
                                체중
                                &nbsp;
                                <img
                                    src="/images/admin/Female.png"
                                    style={{ height: "15px", }}
                                />
                            </p>
                            <input
                                type="text"
                                name="dogWeightF"
                                onChange={valueChangeHandler}
                                style={{ width: "100px" }}
                            />
                            <span>kg</span>
                        </div>
                    </div>
                    <div style={{ clear: "both", }}>
                        <div className={styles.detailProductBoxShort}>
                            <p>생애주기</p>
                            <input
                                type="text"
                                name="dogChild"
                                onChange={valueChangeHandler}
                                placeholder="유아기"
                            />
                        </div>
                        <div className={styles.detailProductBoxShort}>
                            <p>&nbsp;</p>
                            <input
                                type="text"
                                name="dogYouth"
                                onChange={valueChangeHandler}
                                placeholder="청년기"
                            />
                        </div>
                        <div className={styles.detailProductBoxShort}>
                            <p>&nbsp;</p>
                            <input
                                type="text"
                                name="dogEld"
                                onChange={valueChangeHandler}
                                placeholder="노년기"
                            />
                        </div>
                    </div>
                    <div style={{ clear: "both", }}>
                        <div className={styles.detailProductBoxShort}>
                            <p>크기</p>
                            <select
                                name="dogSize"
                                onChange={valueChangeHandler}
                            >
                                <option value={'소형견'}>소형견</option>
                                <option value={'중형견'}>중형견</option>
                                <option value={'대형견'}>대형견</option>
                            </select>
                        </div>
                        <div className={styles.detailProductBoxLong}>
                            <p>취약질병</p>
                            <div style={{ marginRight: "10px", float: "left", }}>
                                {disease.map((item, index) => (
                                    <div key={index} style={{ display: "flex", float: "left", }}>
                                        <span>
                                            {item}
                                            &nbsp;
                                            <img
                                                src="/images/admin/Delete.png"
                                                style={{ width: "15px", height: "15px", cursor: "pointer", }}
                                                onClick={() => {
                                                    const removeIndex = index
                                                    const originDisease = disease;
                                                    const removeDisease = originDisease.filter(function (_, index) {
                                                        return index !== removeIndex;
                                                    });
                                                    setDisease(removeDisease);
                                                    setDict({
                                                        ...dict,
                                                        dogDisease: removeDisease.toString()
                                                    });
                                                }}
                                            />
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.inputContainer}>
                                <input
                                    type="text"
                                    id="diseaseInput"
                                    onChange={(e) => {
                                        setDiseaseInput(e.target.value);
                                    }}
                                />
                                <img
                                    src="/images/admin/Add.png"
                                    style={{ cursor: "pointer", }}
                                    onClick={() => {
                                        const originDisease = disease;
                                        const updateDisease = [...originDisease, diseaseInput];
                                        setDisease(updateDisease);
                                        setDict({
                                            ...dict,
                                            dogDisease: updateDisease.toString()
                                        });
                                        document.getElementById('diseaseInput').value = '';
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ float: "left", }}>

                    <div className={styles.detailProductBoxPart}>
                        <p>주요 정보</p>
                        <span style={{ float: "left", }}>침 흘림</span>
                        <div className={styles.detailProductBoxPartGrade}>
                            <img
                                src={dict.dogDrool > 0 ? "/images/admin/star On.png" : "/images/admin/star Off.png"}
                                onClick={() => {
                                    setDict({
                                        ...dict,
                                        dogDrool: 1
                                    })
                                }}
                            />
                            <img
                                src={dict.dogDrool > 1 ? "/images/admin/star On.png" : "/images/admin/star Off.png"}
                                onClick={() => {
                                    setDict({
                                        ...dict,
                                        dogDrool: 2
                                    })
                                }}
                            />
                            <img
                                src={dict.dogDrool > 2 ? "/images/admin/star On.png" : "/images/admin/star Off.png"}
                                onClick={() => {
                                    setDict({
                                        ...dict,
                                        dogDrool: 3
                                    })
                                }}
                            />
                            <img
                                src={dict.dogDrool > 3 ? "/images/admin/star On.png" : "/images/admin/star Off.png"}
                                onClick={() => {
                                    setDict({
                                        ...dict,
                                        dogDrool: 4
                                    })
                                }}
                            />
                            <img
                                src={dict.dogDrool > 4 ? "/images/admin/star On.png" : "/images/admin/star Off.png"}
                                onClick={() => {
                                    setDict({
                                        ...dict,
                                        dogDrool: 5
                                    })
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div style={{ clear: "both", }}></div>
                <div className={styles.detailProductBoxFull}>
                    <p>재료</p>
                </div>
            </div>
        </div>
    );
}

export default InsertDict;