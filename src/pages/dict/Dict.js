import styles from './Dict.module.css';
import React, {useState, useEffect} from "react";

import { Link } from "react-router-dom";

import { GetAPI, GetAPINotToken } from "../../api/RestAPIs"

function Dict(){
    
    const [isSmallModalOpen, setIsSmallModalOpen] = useState(false);
    const [isMediumModalOpen, setIsMediumModalOpen] = useState(false);
    const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);

    const toggleSmallModal = () => {
        setIsSmallModalOpen(prevState => !prevState);
    };
    const toggleMediumModal = () => {
        setIsMediumModalOpen(prevState => !prevState);
    };
    const toggleLargeModal = () => {
        setIsLargeModalOpen(prevState => !prevState);
    };

    const [dogs, setDogs] = useState([]);

    const [search, setSearch] = useState({dogName:''});
        
    const selectAllDict = async () => {
        
        const address = '/dict';
        
        const response = await GetAPI(address);

        const result = await response.dict;

        return result;
    };

    const searchDict = async () => {

        const address = `/dict/search?dogName=${search.dogName}`;

        const response = await GetAPI(address);

        const result = await response.dict;

        return result;
    };

    useEffect(() => {
        selectAllDict().then(res => setDogs(res));
    }, []);

    useEffect(() => {
        searchDict().then(res => setDogs(res));
    }, [search]);

    const valueChangeHandler = e => {
        const { name, value } = e.target;
    setSearch({
        ...search,
        [name]: value
        });
    }; 

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        toggleLargeModal();
        toggleMediumModal();
        toggleSmallModal();
        console.log(search);
    }

    const filterDogBySize = (size) => {
        return dogs.filter(dog => dog.dogSize === size);
    };


    return(
        <>
        <div className={styles.container1}>
            <div className={styles.title}>
                <span className={styles.titletext1}> 견종에 대해 찾아보세요.</span>
                <span className={styles.titletext2}>반려견 품종의 특징과 요구사항에 대한 전문적인 정보를 찾아보세요. <br/> 
                스크롤 또는 검색 기능을 사용해 원하는 견종에 대한 정보를 찾을 수 있습니다. </span>
                <img className={styles.img} src='https://lh3.google.com/u/0/d/1OYEelsFN-8xWWbi2SgMzZl3FN8fTx2mQ=w1920-h945-iv1'/>
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
                    <img value={search.dogName} onChange={valueChangeHandler} src='/images/dict/Search.png'/>
                </button>
                    </form>
            </div>
        </div>
 
        <div className={styles.container2} > 
        <hr color="D4D4D4"/>
            <button className={styles.size} onClick={toggleSmallModal}>
                소형
            </button>

           {isSmallModalOpen && 
            <div className={styles.grid} >
                {filterDogBySize('소형견').length > 0 ? 
                (
                filterDogBySize('소형견').map((dog) => (
                    <Link to={`/dict/${dog.dogName}`} key={dog.dogName} state={{dogName: dog.dogName}}>
                    <div className={styles.modalContainer}>
                       <img className={styles.dogImages} src={dog.dogImage}/>
                       <p className={styles.dogName}> {dog.dogName} </p>
                    </div>
                    </Link>
                ))
               ) : (
                <p>해당 내용이 포함된 견종이 없습니다.</p>
               )}
                </div>
                }

        </div>
        <div className={styles.container2}>
        <hr color="D4D4D4"/>
            <button className={styles.size} onClick={toggleMediumModal}>
                중형
            </button>

            {isMediumModalOpen &&
            <div className={styles.grid}>
                 {filterDogBySize('중형견').length > 0 ? 
                  (  
                    filterDogBySize('중형견').map((dog) => (
                    <Link to={`/dict/${dog.dogName}`} key={dog.dogName} state={{dogName: dog.dogName}}>
                    <div className={styles.modalContainer} key={dog.dogCode}>
                       <img className={styles.dogImages} src={dog.dogImage}/>
                       <p className={styles.dogName}>{dog.dogName}</p> 
                    </div>
                    </Link>
                ))
            ) : (
                <p>해당 내용이 포함된 견종이 없습니다.</p>
            )}
                </div>
                }

        </div>
        <div className={styles.container2}>
        <hr color="D4D4D4"/>
            <button className={styles.size} onClick={toggleLargeModal}>
                대형
            </button>

            {isLargeModalOpen &&
            <div className={styles.grid}>
                {filterDogBySize('대형견').length > 0 ? 
                  (  
                filterDogBySize('대형견').map((dog) => (
                    <Link to={`/dict/${dog.dogName}`} key={dog.dogName} state={{dogName: dog.dogName}}>
                    <div className={styles.modalContainer} key={dog.dogCode}>
                        <img className={styles.dogImages} src={dog.dogImage}/>
                        <p className={styles.dogName}>{dog.dogName}</p> 
                    </div>
                    </Link>
                ))
            ) : (
                <p>해당 내용이 포함된 견종이 없습니다.</p>
            )}
                </div>
                }

        </div>
    
        </>
    )
}

export default Dict;