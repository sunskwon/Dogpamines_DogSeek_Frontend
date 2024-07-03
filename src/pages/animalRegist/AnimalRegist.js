import styles from'./AnimalRegist.module.css';

function AnimalRegist() {

    // const [search, setSearch] = useState();
    // const [isModalOpen, setIsModalOpen] = useState(false);

    /*const toggleModal = () => {
        setIsModalOpen(true);
    };*/

    /*const valueChangeHandler = e => {
        const { }
    }*/

    return(
        <div className={styles.allContainer}>
         <div className={styles.titleContainer}>
            <span className={styles.title}>동물 등록 번호 검색</span>
            <span className={styles.titleContext}>동물등록 번호 검색의 경우 소유주가<span className={styles.link}>국가동물보호정보시스템</span>에 회원가입이 되어 있고,
            <br/>소유주의 정보가 등록되어 있어야 정상 조회가 가능합니다.</span>
            <span className={styles.ps}>※ 임의로 동물등록 사항을 확인하는 것을 방지하기 위한 등록번호 이외 소유주의 개인정보를 추가 입력이 필요합니다.</span>
         </div>
         <form className={styles.searchContainer1}>
            <select className={styles.selectBox}>
                <option>소유주</option>
                <option>생년월일</option>
            </select>
                <input className={styles.inputBox}></input>
        </form>

        <form className={styles.searchContainer2}>
            <select className={styles.selectBox}>
                <option>등록 번호</option>
                <option>RFID</option>
            </select>
            <input className={styles.inputBox}></input>
        </form>
        <div className={styles.buttonContainer}>
        <button className={styles.button} >확인</button>
        </div>



         <div className={styles.modalTitle}>
            <img className={styles.img} src='/images/dict/DogPaw(green).png' alt='greenPaw'></img><span>등록 동물 정보</span>
         </div>
         <table className={styles.table}>
        <tr>
            <th>등록번호</th> <td>1111</td> <th>RFID_CD</th> <td>sdf</td>
        </tr>
        <tr>
            <th>개이름</th> <td>sdf</td> <th>성별</th> <td>sdf</td>
        </tr>
        <tr>
            <th>품종</th> <td>sdf</td> <th>중성화 여부</th> <td>sdf</td>
        </tr>
        <tr>
            <th>관할기관</th> <td>sdf</td> <th>관할기관연락처</th> <td>sdf</td>
        </tr>
         </table>
         

         <div className={styles.errorContainer}>
            <img src='/images/animal/cuteDog.png'></img>
            <span>해당번호로 등록된 반려동물이 없습니다.</span>


         </div>
        </div>
    )  
}

export default AnimalRegist;