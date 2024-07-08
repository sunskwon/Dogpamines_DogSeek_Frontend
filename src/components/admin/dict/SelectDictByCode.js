import { useState, useEffect } from "react";

import { GetAPI } from "../../../api/RestAPIs";

import Loading from "../adminCommon/Loading";

import GradeOutput from "../adminCommon/GradeOutput";
import ListOutput from "../adminCommon/ListOutput";

import styles from "./AdminDict.module.css"

function SelectDictByCode({ Location }) {

    const [dict, setDict] = useState();
    const [diseaseList, setDiseaseList] = useState([]);
    const [error, setError] = useState(null);
    const [boolLoading, setBoolLoading] = useState(false);

    const call = async () => {

        setBoolLoading(true);

        try {

            const response = await GetAPI(Location);

            if (response.error) {

                setError(response.error);

                return null;
            }

            const result = await response.dict;

            return result;
        } catch (error) {

            setError(error);

            return null;
        } finally {

            setBoolLoading(false);
        }
    };

    useEffect(() => {
        call().then((res) => {

            setBoolLoading(true);

            try {

                const disease = res.dogDisease.split(',');

                setDict(res);
                setDiseaseList(disease);
            } catch (error) {

                setError(error);
                setDict(null);
            } finally {

                setBoolLoading(false);
            }
        });
    }, []);

    if (error) {
        throw error;
    };

    return boolLoading ? (<Loading />) : (
        dict ? (
            <>
                <div className={styles.detailBox}>
                    <div style={{ width: "680px", }}>
                        <div>
                            <div style={{ width: "510px", float: "left", }}>
                                <div>
                                    <div className={styles.detailBoxImage}>
                                        <p>이미지</p>
                                        <img
                                            src={dict?.dogImage}
                                            alt={`${dict?.dogName}`}
                                        />
                                    </div>
                                    <div style={{ width: "340px", float: "left", }}>
                                        <div>
                                            <div className={styles.detailBoxShort}>
                                                <p>견종 No.</p>
                                                <div className={styles.spanBox}>
                                                    <span>{dict?.dogCode}</span>
                                                </div>
                                            </div>
                                            <div className={styles.detailBoxShort}>
                                                <p>견종명</p>
                                                <div className={styles.spanBox}>
                                                    <span>{dict?.dogName}</span>
                                                </div>
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
                                                <div className={styles.spanBox}>
                                                    <span>{`${dict?.dogHeightM} cm`}</span>
                                                </div>
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
                                                <div className={styles.spanBox}>
                                                    <span>{`${dict?.dogHeightF} cm`}</span>
                                                </div>
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
                                                <div className={styles.spanBox}>
                                                    <span>{`${dict?.dogWeightM} kg`}</span>
                                                </div>
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
                                                <div className={styles.spanBox}>
                                                    <span>{`${dict?.dogWeightF} kg`}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ clear: "both", }}>
                                    <div className={styles.detailBoxShort}>
                                        <p>생애주기</p>
                                        <div className={styles.spanBox}>
                                            <span>{`유아기: ${dict?.dogChild}`}</span>
                                        </div>
                                    </div>
                                    <div className={styles.detailBoxShort}>
                                        <p>&nbsp;</p>
                                        <div className={styles.spanBox}>
                                            <span>{`청년기: ${dict?.dogYouth}`}</span>
                                        </div>
                                    </div>
                                    <div className={styles.detailBoxShort}>
                                        <p>&nbsp;</p>
                                        <div className={styles.spanBox}>
                                            <span>{`노년기: ${dict?.dogEld}`}</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ clear: "both", }}>
                                    <div className={styles.detailBoxShort}>
                                        <p>크기</p>
                                        <div className={styles.spanBox}>
                                            <span>{dict?.dogSize}</span>
                                        </div>
                                    </div>
                                    <div className={styles.detailBoxMid}>
                                        <p>취약질병</p>
                                        <div className={styles.listBox}>
                                            <div
                                                className={styles.scrollBox}
                                                style={{ height: "35px", }}
                                            >
                                                <ListOutput
                                                    list={diseaseList}
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
                                    <div className={styles.gradeOutputBox}>
                                        <GradeOutput
                                            grade={dict?.dogDrool}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <span
                                        style={{ paddingTop: "5px", marginRight: "5px", float: "left", }}
                                    >
                                        공동생활
                                    </span>
                                    <div className={styles.gradeOutputBox}>
                                        <GradeOutput
                                            grade={dict?.dogSocial}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <span
                                        style={{ paddingTop: "5px", marginRight: "5px", float: "left", }}
                                    >
                                        털 빠짐
                                    </span>
                                    <div className={styles.gradeOutputBox}>
                                        <GradeOutput
                                            grade={dict?.dogShed}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <span
                                        style={{ paddingTop: "5px", marginRight: "5px", float: "left", }}
                                    >
                                        짖음
                                    </span>
                                    <div className={styles.gradeOutputBox}>
                                        <GradeOutput
                                            grade={dict?.dogBark}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <span
                                        style={{ paddingTop: "5px", marginRight: "5px", float: "left", }}
                                    >
                                        반려동물
                                    </span>
                                    <div className={styles.gradeOutputBox}>
                                        <GradeOutput
                                            grade={dict?.dogPet}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <span
                                        style={{ paddingTop: "5px", marginRight: "5px", float: "left", }}
                                    >
                                        더위 적응
                                    </span>
                                    <div className={styles.gradeOutputBox}>
                                        <GradeOutput
                                            grade={dict?.dogHot}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <span
                                        style={{ paddingTop: "5px", marginRight: "5px", float: "left", }}
                                    >
                                        추위 적응
                                    </span>
                                    <div className={styles.gradeOutputBox}>
                                        <GradeOutput
                                            grade={dict?.dogCold}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <span
                                        style={{ paddingTop: "5px", marginRight: "5px", float: "left", }}
                                    >
                                        실내 적합
                                    </span>
                                    <div className={styles.gradeOutputBox}>
                                        <GradeOutput
                                            grade={dict?.dogHouse}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <span
                                        style={{ paddingTop: "5px", marginRight: "5px", float: "left", }}
                                    >
                                        그루밍
                                    </span>
                                    <div className={styles.gradeOutputBox}>
                                        <GradeOutput
                                            grade={dict?.dogGroom}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <span
                                        style={{ paddingTop: "5px", marginRight: "5px", float: "left", }}
                                    >
                                        활용량
                                    </span>
                                    <div className={styles.gradeOutputBox}>
                                        <GradeOutput
                                            grade={dict?.dogActi}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.detailBoxFull}>
                            <p>개요</p>
                            <div className={styles.spanBox}>
                                <span>{dict?.dogSummary}</span>
                            </div>
                        </div>
                    </div>
                </div >
            </>
        ) : (
            <>
                <div className={styles.errorBox}>
                    <div>
                        <img
                            src="/images/admin/CloseWindow.png"
                            alt="취소 아이콘"
                        />
                        <p>선택한 견종의 정보가 없습니다</p>
                        <p>다시 시도해주세요</p>
                    </div>
                </div>
            </>
        )
    )
}

export default SelectDictByCode;