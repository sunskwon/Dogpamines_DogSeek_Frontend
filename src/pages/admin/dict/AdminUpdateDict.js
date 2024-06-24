import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { PutAPI } from "../../../api/RestAPIs";

import UpdateDict from "../../../components/admin/dict/UpdateDict";

import styles from "../AdminPages.module.css";

function AdminUpdateDict() {

    const [dict, setDict] = useState(
        {
            dogCode: 0,
        dogName: '',
        dogSize: '소형견',
        dogSummary: '',
        dogHeightM: '',
        dogWeightM: '',
        dogHeightF: '',
        dogWeightF: '',
        dogChild: '',
        dogYouth: '',
        dogEld: '',
        dogDisease: '',
        dogDrool: 0,
        dogSocial: 0,
        dogShed: 0,
        dogBark: 0,
        dogPet: 0,
        dogHot: 0,
        dogCold: 0,
        dogHouse: 0,
        dogGroom: 0,
        dogActi: 0,
        dogImage: '/images/admin/No Image Available.png',
        dogDetail: '/images/admin/No Image Available.png',
        }
    );

    const { state } = useLocation();

    const navigate = useNavigate();

    const submitHandler = async () => {

        const address = '/dict';

        const response = await PutAPI(address, dict);
        
        navigate("/admin/dictdetail", {
            state: {Location: response.headers.get('Location')}
        });
    };

    return (
        <div>
            <p className={styles.subTitle}>견종 정보 관리</p>
            <div className={styles.mainOuter}>
                <div className={styles.mainBox}>
                    <div>
                        <p className={styles.subjectTitle}>견종 정보 수정</p>
                        <div style={{ float: "right", }}>
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "10px", }}
                                onClick={submitHandler}
                            >
                                수정
                            </button>
                            <button
                                className={styles.cancelButton}
                                style={{ marginRight: "15px", }}
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                돌아가기
                            </button>
                        </div>
                        <div className={styles.productDetail}>
                            <UpdateDict
                                Location={state.Location}
                                dict={dict}
                                setDict={setDict}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminUpdateDict;