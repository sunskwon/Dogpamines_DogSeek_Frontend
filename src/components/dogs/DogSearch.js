import styles from './DogSearch.module.css';

function DogSearch({ search, setSearch }) {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.box}>
                    <p>견종에 대해 찾아보세요</p>
                    <span>반려견 견종에 대한 정보를 찾아보세요</span>
                    <div className={styles.searchBox}>
                        <button>전체</button>
                        <form>
                            <input
                                type='text'
                                name='input'
                                placeholder='Search'
                            />
                            <button>
                                <img
                                    src='/images/dict/Search.png'
                                    alt='search'
                                    style={{ width: "30px", }}
                                />
                            </button>
                        </form>
                    </div>
                </div>
                <img
                    src='https://blog.kakaocdn.net/dn/IHtYc/btsIBa6j4gj/k48pkVhUBmPo9kg7Qbh5fk/img.png'
                    alt='견종에 대해 찾아보세요'
                />
            </div>
        </>
    );
}

export default DogSearch;