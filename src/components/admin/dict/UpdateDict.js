import { useState, useEffect, useRef } from "react";

import { GetAPI } from "../../../api/RestAPIs";

import GradeInput from "../adminCommon/GradeInput";
import ListInput from "../adminCommon/ListInput";

import ImageInputModal from "../adminCommon/ImageInputModal";

import styles from "./AdminDict.module.css";

function UpdateProduct({ Location, dict, setDict }) {

    const [diseaseList, setDiseaseList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const modalBackground = useRef();

    const call = async () => {

        const response = await GetAPI(Location);

        const result = await response.dict;

        return result;
    };

    useEffect(() => {
        call().then((res) => {

            const disease = res?.dogDisease.split(',');

            setDict(res);
            setDiseaseList(disease);
        });
    }, []);

    const valueChangeHandler = e => {
        setDict({
            ...dict,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className={styles.detailBox}>
            <div style={{ width: "680px", }}>
                <div>
                    <div style={{ width: "510px", float: "left", }}>
                        <div>
                            <div className={styles.detailBoxImage}>
                                <p>이미지</p>
                                <div>
                                    <img
                                        src={dict?.dogImage}
                                        alt='견종'
                                        onClick={() => setModalOpen(true)}
                                    />
                                    <div
                                        className={styles.imageInfo}
                                        onClick={() => setModalOpen(true)}
                                    >
                                        <span>클릭하여</span>
                                        <br />
                                        <span>이미지 URL을</span>
                                        <br />
                                        <span>입력하세요</span>
                                    </div>
                                </div>
                            </div>
                            <ImageInputModal
                                name='dogImage'
                                item={dict}
                                setItem={setDict}
                                modalOpen={modalOpen}
                                setModalOpen={setModalOpen}
                                modalBackground={modalBackground}
                            />
                            <div style={{ width: "340px", float: "left", }}>
                                <div>
                                    <div className={styles.detailBoxShort}>
                                        <p>견종코드</p>
                                        <input
                                            style={{ backgroundColor: "rgba(212, 212, 212, 1)" }}
                                            disabled
                                            value={dict?.dogCode}
                                        />
                                    </div>
                                    <div className={styles.detailBoxShort}>
                                        <p>견종명</p>
                                        <input
                                            type="text"
                                            name="dogName"
                                            onChange={valueChangeHandler}
                                            value={dict?.dogName}
                                        />
                                    </div>
                                </div>
                                <div style={{ clear: "both", }}>
                                    <div className={styles.detailBoxShort}>
                                        <p>
                                            체고
                                            &nbsp;
                                            <img
                                                src="/images/admin/Male.png"
                                                alt="Male symbol"
                                                style={{ height: "15px", }}
                                            />
                                        </p>
                                        <input
                                            type="text"
                                            name="dogHeightM"
                                            style={{ width: "100px", }}
                                            onChange={valueChangeHandler}
                                            value={dict?.dogHeightM}
                                        />
                                        <span>cm</span>
                                    </div>
                                    <div className={styles.detailBoxShort}>
                                        <p>
                                            체고
                                            &nbsp;
                                            <img
                                                src="/images/admin/Female.png"
                                                alt="Female symbol"
                                                style={{ height: "15px", }}
                                            />
                                        </p>
                                        <input
                                            type="text"
                                            name="dogHeightF"
                                            style={{ width: "100px", }}
                                            onChange={valueChangeHandler}
                                            value={dict?.dogHeightF}
                                        />
                                        <span>cm</span>
                                    </div>
                                </div>
                                <div style={{ clear: "both", }}>
                                    <div className={styles.detailBoxShort}>
                                        <p>
                                            체중
                                            &nbsp;
                                            <img
                                                src="/images/admin/Male.png"
                                                alt="Male symbol"
                                                style={{ height: "15px", }}
                                            />
                                        </p>
                                        <input
                                            type="text"
                                            name="dogWeightM"
                                            style={{ width: "100px", }}
                                            onChange={valueChangeHandler}
                                            value={dict?.dogWeightM}
                                        />
                                        <span>kg</span>
                                    </div>
                                    <div className={styles.detailBoxShort}>
                                        <p>
                                            체중
                                            &nbsp;
                                            <img
                                                src="/images/admin/Female.png"
                                                alt="Female symbol"
                                                style={{ height: "15px", }}
                                            />
                                        </p>
                                        <input
                                            type="text"
                                            name="dogWeightF"
                                            style={{ width: "100px" }}
                                            onChange={valueChangeHandler}
                                            value={dict?.dogWeightF}
                                        />
                                        <span>kg</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ clear: "both", }}>
                            <div className={styles.detailBoxShort}>
                                <p>생애주기</p>
                                <input
                                    type="text"
                                    name="dogChild"
                                    onChange={valueChangeHandler}
                                    value={`유아기: ${dict?.dogChild}`}
                                />
                            </div>
                            <div className={styles.detailBoxShort}>
                                <p>&nbsp;</p>
                                <input
                                    type="text"
                                    name="dogYouth"
                                    onChange={valueChangeHandler}
                                    value={`청년기: ${dict?.dogYouth}`}
                                />
                            </div>
                            <div className={styles.detailBoxShort}>
                                <p>&nbsp;</p>
                                <input
                                    type="text"
                                    name="dogEld"
                                    onChange={valueChangeHandler}
                                    value={`노년기: ${dict?.dogEld}`}
                                />
                            </div>
                        </div>
                        <div style={{ clear: "both", }}>
                            <div className={styles.detailBoxShort}>
                                <p>크기</p>
                                <select
                                    name="dogSize"
                                    onChange={valueChangeHandler}
                                    value={dict?.dogSize}
                                >
                                    <option value={'소형견'}>소형견</option>
                                    <option value={'중형견'}>중형견</option>
                                    <option value={'대형견'}>대형견</option>
                                </select>
                            </div>
                            <div className={styles.detailBoxMid}>
                                <p>취약질병</p>
                                <div className={styles.listBox}>
                                    <div
                                        className={styles.scrollBox}
                                        style={{ height: "35px", }}
                                    >
                                        <ListInput
                                            target={'dogDisease'}
                                            list={diseaseList}
                                            setList={setDiseaseList}
                                            form={dict}
                                            setForm={setDict}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={styles.detailBoxShort}
                        style={{ height: "375px", }}
                    >
                        <p>주요 정보</p>
                        <div>
                            <span
                                style={{ paddingTop: "5px", marginRight: "5px", float: "left", }}
                            >
                                침 흘림
                            </span>
                            <div className={styles.gradeBox}>
                                <GradeInput
                                    target={'dogDrool'}
                                    form={dict}
                                    setForm={setDict}
                                />
                            </div>
                        </div>
                        <div>
                            <span
                                style={{ paddingTop: "5px", marginRight: "5px", float: "left", }}
                            >
                                공동생활
                            </span>
                            <div className={styles.gradeBox}>
                                <GradeInput
                                    target={'dogSocial'}
                                    form={dict}
                                    setForm={setDict}
                                />
                            </div>
                        </div>
                        <div>
                            <span
                                style={{ paddingTop: "5px", marginRight: "5px", float: "left", }}
                            >
                                털 빠짐
                            </span>
                            <div className={styles.gradeBox}>
                                <GradeInput
                                    target={'dogShed'}
                                    form={dict}
                                    setForm={setDict}
                                />
                            </div>
                        </div>
                        <div>
                            <span
                                style={{ paddingTop: "5px", marginRight: "5px", float: "left", }}
                            >
                                짖음
                            </span>
                            <div className={styles.gradeBox}>
                                <GradeInput
                                    target={'dogBark'}
                                    form={dict}
                                    setForm={setDict}
                                />
                            </div>
                        </div>
                        <div>
                            <span
                                style={{ paddingTop: "5px", marginRight: "5px", float: "left", }}
                            >
                                반려동물
                            </span>
                            <div className={styles.gradeBox}>
                                <GradeInput
                                    target={'dogPet'}
                                    form={dict}
                                    setForm={setDict}
                                />
                            </div>
                        </div>
                        <div>
                            <span
                                style={{ paddingTop: "5px", marginRight: "5px", float: "left", }}
                            >
                                더위 적응
                            </span>
                            <div className={styles.gradeBox}>
                                <GradeInput
                                    target={'dogHot'}
                                    form={dict}
                                    setForm={setDict}
                                />
                            </div>
                        </div>
                        <div>
                            <span
                                style={{ paddingTop: "5px", marginRight: "5px", float: "left", }}
                            >
                                추위 적응
                            </span>
                            <div className={styles.gradeBox}>
                                <GradeInput
                                    target={'dogCold'}
                                    form={dict}
                                    setForm={setDict}
                                />
                            </div>
                        </div>
                        <div>
                            <span
                                style={{ paddingTop: "5px", marginRight: "5px", float: "left", }}
                            >
                                실내 적합
                            </span>
                            <div className={styles.gradeBox}>
                                <GradeInput
                                    target={'dogHouse'}
                                    form={dict}
                                    setForm={setDict}
                                />
                            </div>
                        </div>
                        <div>
                            <span
                                style={{ paddingTop: "5px", marginRight: "5px", float: "left", }}
                            >
                                그루밍
                            </span>
                            <div className={styles.gradeBox}>
                                <GradeInput
                                    target={'dogGroom'}
                                    form={dict}
                                    setForm={setDict}
                                />
                            </div>
                        </div>
                        <div>
                            <span
                                style={{ paddingTop: "5px", marginRight: "5px", float: "left", }}
                            >
                                활용량
                            </span>
                            <div className={styles.gradeBox}>
                                <GradeInput
                                    target={'dogActi'}
                                    form={dict}
                                    setForm={setDict}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.detailBoxFull}>
                    <p>개요</p>
                    <textarea
                        type="text"
                        name="dogSummary"
                        style={{ width: "630px", height: "105px", textAlign: "start", }}
                        onChange={valueChangeHandler}
                        value={dict?.dogSummary}
                    />
                </div>
            </div>
        </div >
    );
}

export default UpdateProduct;