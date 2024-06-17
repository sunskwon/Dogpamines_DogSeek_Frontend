import styles from './Company.module.css';

function Company(){
    return(
        <div className={styles.container}>
            <div className={styles.containerBox}>
                <img className={styles.companyImg} src="/images/company.jpg"/>
            </div>
        </div>
    );
}

export default Company;