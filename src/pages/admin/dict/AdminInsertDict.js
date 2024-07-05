import { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { PostAPI } from "../../../api/RestAPIs";

import InsertDict from "../../../components/admin/dict/InsertDict";

import AlertModal from "../../../components/admin/adminCommon/AlertModal";

import styles from "../AdminPages.module.css";

function AdminInsertDict() {

    const [dict, setDict] = useState({
        dogImage: '/images/admin/NoImageAvailable.png',
        dogCode: 0,
        dogName: '',
        dogHeightM: '',
        dogWeightM: '',
        dogHeightF: '',
        dogWeightF: '',
        dogChild: '',
        dogYouth: '',
        dogEld: '',
        dogSize: '소형견',
        dogDisease: '',
        dogSummary: '',
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
    });
    const [message, setMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const modalBackground = useRef();

    const navigate = useNavigate();

    const submitHandler = async () => {

        if (dict.dogName === '') {
            setMessage('견종의 이름을 입력해야 합니다');
            setModalOpen(true);
        } else if (dict.dogHeightM === '') {
            setMessage('수컷의 체고를 입력해야 합니다');
            setModalOpen(true);
        } else if (dict.dogHeightF === '') {
            setMessage('암컷의 체고를 입력해야 합니다');
            setModalOpen(true);
        } else if (dict.dogWeightM === '') {
            setMessage('수컷의 체중을 입력해야 합니다');
            setModalOpen(true);
        } else if (dict.dogWeightF === '') {
            setMessage('암컷의 체중을 입력해야 합니다');
            setModalOpen(true);
        } else if (dict.dogChild === '') {
            setMessage('생애주기 유아기를 입력해야 합니다');
            setModalOpen(true);
        } else if (dict.dogYouth === '') {
            setMessage('생애주기 청년기를 입력해야 합니다');
            setModalOpen(true);
        } else if (dict.dogEld === '') {
            setMessage('생애주기 노년기를 입력해야 합니다');
            setModalOpen(true);
        } else if (dict.dogSummary === '') {
            setMessage('견종의 개요를 입력해야 합니다');
            setModalOpen(true);
        } else {
            const address = '/dict';

            const response = await PostAPI(address, dict);

            navigate("/admin/dictdetail", {
                state: { Location: response.headers.get('Location') }
            })
        };
    };

    return (
        <div>
            <p className={styles.subTitle}>견종 정보 관리</p>
            <div className={styles.mainOuter}>
                <div className={styles.mainBox}>
                    <div>
                        <p className={styles.subjectTitle}>신규 견종 등록</p>
                        <div style={{ float: "right", }}>
                            <button
                                className={styles.cancelButton}
                                style={{ marginRight: "15px", }}
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                돌아가기
                            </button>
                            <button
                                className={styles.submitButton}
                                style={{ marginRight: "10px", }}
                                onClick={submitHandler}
                            >
                                등록
                            </button>
                        </div>
                        <AlertModal
                            message={message}
                            modalOpen={modalOpen}
                            setModalOpen={setModalOpen}
                            modalBackground={modalBackground}
                        />
                    </div>
                    <div className={styles.productDetail}>
                        <InsertDict
                            dict={dict}
                            setDict={setDict}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminInsertDict;