import styles from './Company.module.css';

function Company(){
    return(
        <div className={styles.container}>
            <div className={styles.containerBox}>
                <img className={styles.companyImg} src="/images/etc/company.jpg"/>
                <div className={styles.textBox1}>
                    <p className={styles.text1}>Health is our obsession</p><br/>
                    <p className={styles.text2}>DogSeek은 반려견의 건강에 대한 집념으로부터 시작되었습니다.</p>
                </div>
                <div className={styles.textBox2}>
                    <img className={styles.logo1} src='/images/etc/logo1.png'/>
                    <p className={styles.text3}>DogSeek은 단순 ‘사료 소개’에 그치는 것이 아닌,<br/>강아지의 선호 입맛, 크기, 나이, 알러지 등을 고려하여 여러분들에게<br/>더욱 편하고 자세한 맞춤 사료를 안내드립니다.</p>
                </div>
                <div className={styles.textBox1}>
                    <p className={styles.text1}>DogSeek Color</p><br/>
                    <p className={styles.text2}>자연과 함께 뛸 수 있는 강아지를 생각하며</p><br/>
                    <img className={styles.colorchip} src='/images/etc/colorchip.png'/>
                </div>
                <div className={styles.videoBox}>
                    <video autoPlay muted loop src='/images/etc/video.mp4' className={styles.video1}>
                    </video>
                </div>
            </div>
        </div>
    );
}

export default Company;