import styles from'./AnimalRegist.module.css';

function AnimalRegist() {


    return(
        <>
         <div className={styles.titleContainer}>
            <span className={styles.title}>동물 등록 번호 검색</span>
            <span className={styles.titleContext}>동물등록 번호 검색의 경우 소유주가<span className={styles.link}>국가동물보호정보시스템</span>에 회원가입이 되어 있고,
            <br/>소유주의 정보가 등록되어 있어야 정상 조회가 가능합니다.</span>
            <span className={styles.ps}>※ 임의로 동물등록 사항을 확인하는 것을 방지하기 위한 등록번호 이외 소유주의 개인정보를 추가 입력이 필요합니다.</span>
         </div>
         <form className={styles.searchContainer}>
            <select className={styles.selectBox}>
                <option>소유주</option>
                <option>생년월일</option>
            </select>
                <input></input>
                <br/>
            <select className={styles.selectBox}>
                <option>등록 번호</option>
                <option>RFID</option>
            </select>
            <input></input>
         </form>
        </>
    )  
}

export default AnimalRegist;