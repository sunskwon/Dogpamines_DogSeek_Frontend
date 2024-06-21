import styles from './DictDetail.module.css';
import {useState, useEffect} from "react";


function DictDetail(){


return( 
<>
<div className={styles.container1}>
            <div className={styles.title}>
                <span className={styles.titletext1}> 요크셔테리어</span>
                <span className={styles.titletext2}> 
                    작짐나 용기 있는 이 견종은 몸의 크기만 작을 뿐
                    성격은 소형견답지 않습니다.<br/> 
                    혈기 왕성하지만 우호적인 성격으로 알려진
                    요크셔테리어는 다양한 성격 덕분에 반려견으로<br/> 
                    좋으며 보호자 가족과 긴밀한 애착 관계를 형성합니다.<br/> 
                    진정한 테리어로서의 모든 성격을 갖추고 있기 때문에
                    감시견으로도 훌륭합니다.<br/> 
                    우아하고 긴 부드러운 털 덕분에 ‘작은 사자’라는 별명이 잘 어울립니다.
                 </span>
                <img className={styles.img} src='./images/dict/1. 상단_사진.png'/>
            </div>
        </div>


        <div className={styles.detailtitle}>
            세부사항
        </div>
        <div className={styles.grid}>
        <div className={styles.detailcontext}>
            수컷 암컷
        </div>
        <div>
            취약질병
        </div>
        </div>

        <div className={styles.grid}>
        <div>
            생애주기
        </div>
        </div>

        <div className={styles.detailtitle}>
            특징
        </div>
        <div className={styles.grid}>
        <div className={styles.detailcontext}>
            침 흘림 ★★★★★
        </div>
        <div>
            더위 적응 ★★★★★
        </div>
        </div>
</>
)
}

export default DictDetail;