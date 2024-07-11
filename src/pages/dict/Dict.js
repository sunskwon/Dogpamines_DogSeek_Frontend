import styles from './Dict.module.css';
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { GetAPINotToken } from "../../api/RestAPIs"
import DictModal from "../../components/dict/DictModal"

function Dict() {

    const [isSmallModalOpen, setIsSmallModalOpen] = useState(true);
    const [isMediumModalOpen, setIsMediumModalOpen] = useState(true);
    const [isLargeModalOpen, setIsLargeModalOpen] = useState(true);
    const [isInSmallModalOpen, setInIsSmallModalOpen] = useState(true);
    const [isInMediumModalOpen, setInIsMediumModalOpen] = useState(true);
    const [isInLargeModalOpen, setInIsLargeModalOpen] = useState(true);

    const [modalContent, setModalContent] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const toggleInSmallModal = () => {
        setInIsSmallModalOpen(prevState => !prevState);
    };
    const toggleInMediumModal = () => {
        setInIsMediumModalOpen(prevState => !prevState);
    };
    const toggleInLargeModal = () => {
        setInIsLargeModalOpen(prevState => !prevState);
    };

    const [dogs, setDogs] = useState([]);

    const [search, setSearch] = useState({ dogName: '' });

    const selectAllDict = async () => {

        const address = '/dict';

        const response = await GetAPINotToken(address);

        const result = await response.dict;

        return result;
    };

    const searchDict = async () => {

        const address = `/dict/search?dogName=${search.dogName}`;

        const response = await GetAPINotToken(address);

        const result = await response.dict;

        return result;
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        selectAllDict().then(res => setDogs(res));
    }, []);

    const valueChangeHandler = e => {
        const { name, value } = e.target;
        setSearch({
            ...search,
            [name]: value
        });
    };

    const searchSubmitHandler = async (e) => {
        e.preventDefault();
        if (!search.dogName.trim()) {
            setModalContent(["검색 내용을 입력해주세요."]);
            setIsModalOpen(true);
            return;
        }
        const results = await searchDict();
        setIsSmallModalOpen(true);
        setIsMediumModalOpen(true);
        setIsLargeModalOpen(true);
        setInIsSmallModalOpen(true);
        setInIsMediumModalOpen(true);
        setInIsLargeModalOpen(true);
        console.log(search);
        setDogs(results);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirm = () => {
        console.log("확인 버튼 클릭!");
        closeModal();
    };

    const allSearchHandler = async () => {
        try {
            const res = await selectAllDict();
            setDogs(res);
        } catch (error) {
            console.error('견종전체 조회 에러', error)

        }
    };

    const filterDogBySize = (size) => {
        return dogs.filter(dog => dog.dogSize === size);
    };


    return (
        <>
            <div className={styles.container1}>
                <div className={styles.title}>
                    <span className={styles.titletext1}> 견종에 대해 찾아보세요.</span>
                    <span className={styles.titletext2}>반려견 품종의 특징과 요구사항에 대한 전문적인 정보를 찾아보세요. <br />
                        스크롤 또는 검색 기능을 사용해 원하는 견종에 대한 정보를 찾을 수 있습니다. </span>
                    <img className={styles.img} src='https://lh3.google.com/u/0/d/1OYEelsFN-8xWWbi2SgMzZl3FN8fTx2mQ=w1920-h945-iv1' />
                    <div style={{display:"flex"}}>
                    <form className={styles.form} onSubmit={searchSubmitHandler}>
                        <input
                            className={styles.search}
                            type="text"
                            name="dogName"
                            placeholder="Search"
                            value={search.dogName}
                            onChange={valueChangeHandler}
                        />
                        <button className={styles.searchButton} type="submit">
                            <img value={search.dogName} src='/images/dict/Search.png' />
                        </button>
                    </form>
                    <button className={styles.allSearch} onClick={allSearchHandler}>전체</button>
                    </div>
                </div>
            </div>

            <DictModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                modalContent={modalContent}
                onConfirm={handleConfirm}
            />

            <div className={styles.errorContainer} >
                {filterDogBySize('소형견').length === 0 && filterDogBySize('중형견').length === 0 && filterDogBySize('대형견').length === 0 &&
                    <>
                        <img src='/images/animal/cuteDog.png' alt='error' />
                        <p>해당 내용이 포함된 견종이 없습니다.</p>
                    </>
                }
            </div>

            <div className={styles.container2} >

                {isSmallModalOpen &&
                    <div>
                        {filterDogBySize('소형견').length > 0 &&
                            (<>
                                <hr color="D4D4D4" />
                                <div className={styles.size} onClick={toggleInSmallModal}>
                                    소형
                                </div>
                                {isInSmallModalOpen &&
                                    <div className={styles.grid} >
                                        {filterDogBySize('소형견').map((dog) => (
                                            <Link to={`/dict/${dog.dogName}`} key={dog.dogName} state={{ dogName: dog.dogName }}>
                                                <div className={styles.modalContainer}>
                                                    <img className={styles.dogImages} src={dog.dogImage} />
                                                    <p className={styles.dogName}> {dog.dogName} </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                }
                            </>
                            )}
                    </div>
                }

            </div>
            <div className={styles.container2}>
                {isMediumModalOpen &&
                    <div>
                        {filterDogBySize('중형견').length > 0 &&
                            (<>
                                <hr color="D4D4D4" />
                                <div className={styles.size} onClick={toggleInMediumModal}>
                                    중형
                                </div>
                                {isInMediumModalOpen &&
                                    <div className={styles.grid} >
                                        {filterDogBySize('중형견').map((dog) => (
                                            <Link to={`/dict/${dog.dogName}`} key={dog.dogName} state={{ dogName: dog.dogName }}>
                                                <div className={styles.modalContainer}>
                                                    <img className={styles.dogImages} src={dog.dogImage} />
                                                    <p className={styles.dogName}> {dog.dogName} </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                }
                            </>
                            )}
                    </div>
                }


            </div>
            <div className={styles.container2}>
                {isLargeModalOpen &&
                    <div>
                        {filterDogBySize('대형견').length > 0 &&
                            (<>
                                <hr color="D4D4D4" />
                                <div className={styles.size} onClick={toggleInLargeModal}>
                                    대형
                                </div>
                                {isInLargeModalOpen &&
                                    <div className={styles.grid} >
                                        {filterDogBySize('대형견').map((dog) => (
                                            <Link to={`/dict/${dog.dogName}`} key={dog.dogName} state={{ dogName: dog.dogName }}>
                                                <div className={styles.modalContainer}>
                                                    <img className={styles.dogImages} src={dog.dogImage} />
                                                    <p className={styles.dogName}> {dog.dogName} </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                }
                            </>
                            )}
                    </div>
                }


            </div>

        </>
    )
}

export default Dict;