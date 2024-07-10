import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';

function SignUp() {
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [isTerm1Checked, setIsTerm1Checked] = useState(false);
    const [isTerm2Checked, setIsTerm2Checked] = useState(false);
    const [isTerm1Open, setIsTerm1Open] = useState(false);
    const [isTerm2Open, setIsTerm2Open] = useState(false);
    const navigate = useNavigate();

    const [modal, setModal] = useState({
        state: false,
        isOneBtn: true,
        text: '',
    });

    const handleAllCheck = (e) => {
        const checked = e.target.checked;
        setIsAllChecked(checked);
        setIsTerm1Checked(checked);
        setIsTerm2Checked(checked);
    };

    const handleTerm1Check = (e) => {
        setIsTerm1Checked(e.target.checked);
        if (!e.target.checked) {
            setIsAllChecked(false);
        } else if (e.target.checked && isTerm2Checked) {
            setIsAllChecked(true);
        }
    };

    if (modal.state || isTerm1Open || isTerm2Open) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }

    const handleTerm2Check = (e) => {
        setIsTerm2Checked(e.target.checked);
        if (!e.target.checked) {
            setIsAllChecked(false);
        } else if (e.target.checked && isTerm1Checked) {
            setIsAllChecked(true);
        }
    };

    const handleNextPage = () => {
        if (isTerm1Checked && isTerm2Checked) {
            window.scrollTo(0,0);
            navigate('/signupidentity'); // 다음 페이지 경로로 이동
        } else {
            setModal({ ...modal, state: true, isOneBtn: true, text: '필수 약관에 모두 동의해 주세요.' });
        }
    };

    const handleCancel = () => {
        setModal({ ...modal, state: true, isOneBtn: false, text: '회원가입을 취소하시겠습니까?' });
    };

    const closeModal = () => {
        setModal({ ...modal, state: false, text: '' });
    }

    const confirmCancel = () => {
        // 회원가입 취소 로직 추가
        navigate('/'); // 메인 페이지로 이동
    };

    const onClickTerm1 = () => {
        setIsTerm1Open(true);
    }

    const onClickTerm2 = () => {
        setIsTerm2Open(true);
    }

    const closeTerm1Modal = () => {
        setIsTerm1Open(false);
    }

    const closeTerm2Modal = () => {
        setIsTerm2Open(false);
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.titleBox}>
                    <p>회원가입</p>
                </div>
                <div className={styles.seqBox}>
                    <hr />
                    <div className={styles.wrapper}>
                        <div className={styles.circle1}>1</div>
                        <div className={styles.circle2}>2</div>
                        <div className={styles.circle3}>3</div>
                        <div className={styles.circle4}>4</div>
                    </div>
                </div>
                <div className={styles.txtBox}>
                    <p>약관동의</p>
                    <p>본인인증</p>
                    <p>정보입력</p>
                    <p>가입완료</p>
                </div>
                <div className={styles.subTitleBox}>
                    <p>약관동의</p>
                </div>
                <div className={styles.lTxtBox}>
                    <p className={styles.text1}>필수 약관을 동의하셔야 회원가입이 가능합니다.</p>
                    <p className={styles.text2}>회원가입을 위해서 아래 DogSeek 이용약관 및 개인정보 수집 및 이용안내를 확인 후 동의해 주세요.</p>
                    <div className={styles.checkBoxes}>
                        <div className={styles.checkboxContainer}>
                            <input type="checkbox" checked={isAllChecked} onChange={handleAllCheck} />
                            <label>전체 약관 동의</label>
                        </div>
                        <div className={styles.checkboxContainer}>
                            <input type="checkbox" checked={isTerm1Checked} onChange={handleTerm1Check} />
                            <label>회원 서비스 이용 약관 (필수)</label>
                            <span onClick={onClickTerm1}>+</span>
                        </div>
                        <div className={styles.checkboxContainer}>
                            <input type="checkbox" checked={isTerm2Checked} onChange={handleTerm2Check} />
                            <label>개인정보 수집 및 이용 동의 (필수)</label>
                            <span onClick={onClickTerm2}>+</span>
                        </div>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.leftBtn} onClick={handleCancel}>취소</button>
                        <button className={styles.rightBtn} onClick={handleNextPage}>다음</button>
                    </div>
                </div>
                {isTerm1Open && (
                    <div className={styles.modal}>
                        <div className={styles.termsContent}>
                            <div className={styles.textBox1}>
                                <p className={styles.title}>이용약관</p>
                            </div>
                            <div className={styles.textBox2}>
                                <span className={styles.terms}>
                                    <p className={styles.subTitle} style={{ marginTop: "-10px" }}>제1조(목적)</p>
                                    이 약관은 (주)독식 회사가 운영하는 ‘독식’에서 제공하는 인터넷 관련 서비스(이하 “서비스”라 한다)를 이용함에 있어 독식과 이용자의 권리.의무 및 책임사항을 규정함을 목적으로 합니다. ※「PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다.」<br />
                                    <br />
                                    <p className={styles.subTitle}>제2조(정의)</p>
                                    ① “독식”이란 (주)독식 회사가 재화 또는 용역(이하 “재화 등”이라 함)을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 설정하였습니다.<br />
                                    ② “이용자”란 “독식”에 접속하여 이 약관에 따라 “독식”이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.<br />
                                    ③ ‘회원’이라 함은 “독식”에 회원등록을 한 자로서, 계속적으로 “독식”이 제공하는 서비스를 이용할 수 있는 자를 말합니다.<br />
                                    ④ ‘비회원’이라 함은 회원에 가입하지 않고 “독식”이 제공하는 서비스를 이용하는 자를 말합니다.<br />
                                    <br />
                                    <p className={styles.subTitle}>제3조 (약관 등의 명시와 설명 및 개정)</p>
                                    ① “독식”은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호.전자우편주소, 사업자등록번호, 개인정보보호책임자등을 이용자가 쉽게 알 수 있도록 “독식” 초기 서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.<br />
                                    ② “독식은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.<br />
                                    ③ “독식”은 「약관의 규제에 관한 법률」, 「전자문서 및 전자거래기본법」,  「정보통신망 이용촉진 및 정보보호 등에 관한 법률」등 관련 법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.<br />
                                    ④ “독식”이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 몰의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 “독식“은 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다.<br />
                                    ⑤ “독식”이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정 전의 약관조항이 그대로 적용됩니다. 다만 이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제3항에 의한 개정약관의 공지기간 내에 “독식”에 송신하여 “독식”의 동의를 받은 경우에는 개정약관 조항이 적용됩니다.<br />
                                    ⑥ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 소비자보호에 관한 법률, 약관의 규제 등에 관한 법률, 공정거래위원회가 정하는 소비자 보호지침 및 관계법령 또는 상관례에 따릅니다.<br />
                                    <br />
                                    <p className={styles.subTitle}>제4조(서비스의 제공 및 변경)</p>
                                    ① “독식”은 다음과 같은 업무를 수행합니다.<br />
                                    재화 또는 용역에 대한 정보 제공 체결<br />
                                    기타 “독식”이 정하는 업무<br />
                                    ② “독식”은 재화 또는 용역의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화 또는 용역의 내용을 변경할 수 있습니다. 이 경우에는 변경된 재화 또는 용역의 내용 및 제공일자를 명시하여 현재의 재화 또는 용역의 내용을 게시한 곳에 즉시 공지합니다.<br />
                                    ③ “독식”이 제공하기로 이용자와 계약을 체결한 서비스의 내용을 기술적 사양의 변경 등의 사유로 변경할 경우에는 그 사유를 이용자에게 통지 가능한 주소로 즉시 통지합니다. ④ 전항의 경우 “독식”은 이로 인하여 이용자가 입은 손해를 배상합니다. 다만, “독식”이 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.<br />
                                    <br />
                                    <p className={styles.subTitle}>제5조(서비스의 중단)</p>
                                    ① “독식”은 컴퓨터 등 정보통신설비의 보수점검.교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.<br />
                                    ② “독식”은 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단, “독식”이 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.<br />
                                    ③ 사업종목의 전환, 사업의 포기, 업체 간의 통합 등의 이유로 서비스를 제공할 수 없게 되는 경우에는 “독식”은 제8조에 정한 방법으로 이용자에게 통지하고 당초 “독식”에서 제시한 조건에 따라 소비자에게 보상합니다.<br />
                                    <br />
                                    <p className={styles.subTitle}>제6조(회원가입)</p>제6조(회원가입)
                                    ① 이용자는 “독식”이 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.<br />
                                    ② “독식”은 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.<br />
                                    - 가입신청자가 이 약관 제7조제3항에 의하여 이전에 회원자격을 상실한 적이 있는 경우, 다만 제7조제3항에 의한 회원자격 상실 후 3년이 경과한 자로서 “독식”의 회원재가입 승낙을 얻은 경우에는 예외로 한다.<br />
                                    - 등록 내용에 허위, 기재누락, 오기가 있는 경우<br />
                                    - 기타 회원으로 등록하는 것이 “독식”의 기술상 현저히 지장이 있다고 판단되는 경우<br /> ③ 회원가입계약의 성립 시기는 “독식”의 승낙이 회원에게 도달한 시점으로 합니다.<br /> ④ 회원은 회원가입 시 등록한 사항에 변경이 있는 경우, 상당한 기간 이내에 “독식”에 대하여 회원정보 수정 등의 방법으로 그 변경사항을 알려야 합니다.<br />
                                    <br />
                                    <p className={styles.subTitle}>제7조(회원 탈퇴 및 자격 상실 등)</p>
                                    ① 회원은 “독식”에 언제든지 탈퇴를 요청할 수 있으며 “독식”은 즉시 회원탈퇴를 처리합니다.<br />
                                    ② 회원이 다음 각 호의 사유에 해당하는 경우, “독식”은 회원자격을 제한 및 정지시킬 수 있습니다.<br />
                                    ③ 가입 신청 시에 허위 내용을 등록한 경우<br />
                                    ④ 다른 사람의 “독식” 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우<br />
                                    ⑥ “독식”을 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우<br />
                                    ⑦ “독식”이 회원 자격을 제한.정지 시킨 후, 동일한 행위가 2회 이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우 “독식”은 회원자격을 상실시킬 수 있습니다.<br />
                                    ⑧ “독식”이 회원자격을 상실시키는 경우에는 회원등록을 말소합니다. 이 경우 회원에게 이를 통지하고, 회원등록 말소 전에 최소한 30일 이상의 기간을 정하여 소명할 기회를 부여합니다.<br />
                                    <br />
                                    <p className={styles.subTitle}>제8조(회원에 대한 통지)</p>
                                    ① “독식”이 회원에 대한 통지를 하는 경우, 회원이 “독식”과 미리 약정하여 지정한 전자우편 주소로 할 수 있습니다.<br />
                                    ② “독식”은 불특정다수 회원에 대한 통지의 경우 1주일이상 “독식” 게시판에 게시함으로서 개별 통지에 갈음할 수 있습니다. <br />다만, 회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 개별통지를 합니다.<br /><br />

                                    <p className={styles.subTitle}>제9조(개인정보보호)</p>
                                    ① “독식”은 이용자의 개인정보 수집시 서비스제공을 위하여 필요한 범위에서 최소한의 개인정보를 수집합니다.<br />
                                    ② “독식”은 회원가입시 구매계약이행에 필요한 정보를 미리 수집하지 않습니다. 다만, 관련 법령상 의무이행을 위하여 구매계약 이전에 본인확인이 필요한 경우로서 최소한의 특정 개인정보를 수집하는 경우에는 그러하지 아니합니다.<br />
                                    ③ “독식”은 이용자의 개인정보를 수집·이용하는 때에는 당해 이용자에게 그 목적을 고지하고 동의를 받습니다.<br />
                                    ④ “독식”은 수집된 개인정보를 목적외의 용도로 이용할 수 없으며, 새로운 이용목적이 발생한 경우 또는 제3자에게 제공하는 경우에는 이용·제공단계에서 당해 이용자에게 그 목적을 고지하고 동의를 받습니다. 다만, 관련 법령에 달리 정함이 있는 경우에는 예외로 합니다.<br />
                                    ⑤ “독식”이 제2항과 제3항에 의해 이용자의 동의를 받아야 하는 경우에는 개인정보보호 책임자의 신원(소속, 성명 및 전화번호, 기타 연락처), 정보의 수집목적 및 이용목적, 제3자에 대한 정보제공 관련사항(제공받은자, 제공목적 및 제공할 정보의 내용) 등 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 제22조제2항이 규정한 사항을 미리 명시하거나 고지해야 하며 이용자는 언제든지 이 동의를 철회할 수 있습니다.<br />
                                    ⑥ 이용자는 언제든지 “독식”이 가지고 있는 자신의 개인정보에 대해 열람 및 오류정정을 요구할 수 있으며 “독식”은 이에 대해 지체 없이 필요한 조치를 취할 의무를 집니다. 이용자가 오류의 정정을 요구한 경우에는 “독식”은 그 오류를 정정할 때까지 당해 개인정보를 이용하지 않습니다.<br />
                                    ⑦ “독식”은 개인정보 보호를 위하여 이용자의 개인정보를 처리하는 자를 최소한으로 제한하여야 하며 신용카드, 은행계좌 등을 포함한 이용자의 개인정보의 분실, 도난, 유출, 동의 없는 제3자 제공, 변조 등으로 인한 이용자의 손해에 대하여 모든 책임을 집니다.<br />
                                    ⑧ “독식” 또는 그로부터 개인정보를 제공받은 제3자는 개인정보의 수집목적 또는 제공받은 목적을 달성한 때에는 당해 개인정보를 지체 없이 파기합니다.<br />
                                    ⑨ “독식”은 개인정보의 수집·이용·제공에 관한 동의란을 미리 선택한 것으로 설정해두지 않습니다. 또한 개인정보의 수집·이용·제공에 관한 이용자의 동의거절시 제한되는 서비스를 구체적으로 명시하고, 필수수집항목이 아닌 개인정보의 수집·이용·제공에 관한 이용자의 동의 거절을 이유로 회원가입 등 서비스 제공을 제한하거나 거절하지 않습니다.<br /><br />

                                    <p className={styles.subTitle}>제10조(“몰“의 의무)</p>
                                    ① “독식”은 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 이 약관이 정하는 바에 따라 지속적이고, 안정적으로 재화.용역을 제공하는데 최선을 다하여야 합니다.<br />
                                    ② “독식”은 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의 개인정보(신용정보 포함)보호를 위한 보안 시스템을 갖추어야 합니다.<br />
                                    ③ “독식”이 상품이나 용역에 대하여 「표시.광고의 공정화에 관한 법률」 제3조 소정의 부당한 표시.광고행위를 함으로써 이용자가 손해를 입은 때에는 이를 배상할 책임을 집니다.<br />
                                    ④ “독식”은 이용자가 원하지 않는 영리목적의 광고성 전자우편을 발송하지 않습니다.<br /><br />

                                    <p className={styles.subTitle}>제11조(회원의 ID 및 비밀번호에 대한 의무)</p>
                                    ① ID와 비밀번호에 관한 관리책임은 회원에게 있습니다.<br />
                                    ② 회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안됩니다.<br />
                                    ③ 회원이 자신의 ID 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로 “독식”에 통보하고 “독식”의 안내가 있는 경우에는 그에 따라야 합니다.<br /><br />

                                    <p className={styles.subTitle}>제12조(이용자의 의무) 이용자는 다음 행위를 하여서는 안 됩니다.</p>
                                    ① 신청 또는 변경시 허위 내용의 등록<br />
                                    ② 타인의 정보 도용<br />
                                    ③ “독식”에 게시된 정보의 변경<br />
                                    ④ “독식”이 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시<br />
                                    ⑤ “독식” 기타 제3자의 저작권 등 지적재산권에 대한 침해<br />
                                    ⑥ “독식” 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위<br />
                                    ⑦ 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 독식에 공개 또는 게시하는 행위<br /><br />

                                    <p className={styles.subTitle}>제13조(연결“독식”과 피연결“물” 간의 관계)</p>
                                    ① 상위 “독식”과 하위 “물”이 하이퍼링크(예: 하이퍼링크의 대상에는 문자, 그림 및 동화상 등이 포함됨)방식 등으로 연결된 경우, 전자를 연결 “독식”(웹 사이트)이라고 하고 후자를 피연결 “몰”(웹사이트)이라고 합니다.<br />
                                    ② 연결“독식”은 피연결“몰”이 독자적으로 제공하는 재화 등에 의하여 이용자와 행하는 거래에 대해서 보증 책임을 지지 않는다는 뜻을 연결“독식”의 초기화면 또는 연결되는 시점의 팝업화면으로 명시한 경우에는 그 거래에 대한 보증 책임을 지지 않습니다.<br /><br />

                                    <p className={styles.subTitle}>제14조(저작권의 귀속 및 이용제한)</p>
                                    ① “독식“이 작성한 저작물에 대한 저작권 기타 지적재산권은 ”몰“에 귀속합니다.<br />
                                    ② 이용자는 “독식”을 이용함으로써 얻은 정보 중 “독식”에게 지적재산권이 귀속된 정보를 “독식”의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.<br />
                                    ③ “독식”은 약정에 따라 이용자에게 귀속된 저작권을 사용하는 경우 당해 이용자에게 통보하여야 합니다.<br /><br />

                                    <p className={styles.subTitle}>제15조(분쟁해결)</p>
                                    ① “독식”은 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치.운영합니다.<br />
                                    ② “독식”은 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시 통보해 드립니다.<br /> ③ “독식”과 이용자 간에 발생한 전자상거래 분쟁과 관련하여 이용자의 피해구제신청이 있는 경우에는 공정거래위원회 또는 시·도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다.<br /><br />

                                    부 칙(시행일) 이 약관은 2024년 7월 18일부터 시행합니다.</span>
                            </div>
                            <button onClick={closeTerm1Modal}>확인</button>
                        </div>
                    </div>

                )}
                {isTerm2Open && (
                    <div className={styles.modal}>
                        <div className={styles.termsContent}>
                            <div className={styles.textBox1}>
                                <p className={styles.title}>개인정보처리방침</p>
                            </div>
                            <div className={styles.textBox2}>
                                <span className={styles.terms}>
                                    <p className={styles.subTitle} style={{ marginTop: "-10px" }}>1. 개인정보의 처리 목적</p>
                                    '독식'('www.dogseek.com'이하 ‘독식’) 은 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.<br />
                                    - 고객 가입의사 확인, 고객에 대한 서비스 제공에 따른 본인 식별.인증, 회원자격 유지.관리 등<br /><br />

                                    <p className={styles.subTitle}>2. 개인정보의 처리 및 보유 기간</p>
                                    ① ‘독식’은 정보주체로부터 개인정보를 수집할 때 동의 받은 개인정보 보유․이용기간 또는 법령에 따른 개인정보 보유․이용기간 내에서 개인정보를 처리․보유합니다.<br />
                                    ② 구체적인 개인정보 처리 및 보유 기간은 다음과 같습니다.<br />
                                    - 고객 가입 및 관리 : 카카오싱크를 통한 회원가입 및 카카오채널을 통한 관리<br />
                                    - 보유 기간 : 카카오채널 탈퇴 시, 즉시 삭제<br /><br />

                                    <p className={styles.subTitle}>3. 정보주체와 법정대리인의 권리·의무 및 그 행사방법</p>
                                    이용자는 개인정보주체로써 다음과 같은 권리를 행사할 수 있습니다.<br />
                                    ① 정보주체는 ‘독식’ 에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.<br />
                                    1. 개인정보 열람요구<br />
                                    2. 오류 등이 있을 경우 정정 요구<br />
                                    3. 삭제요구<br />
                                    4. 처리정지 요구<br /><br />

                                    <p className={styles.subTitle}>4. 처리하는 개인정보의 항목 작성</p>
                                    ① ‘독식’은 다음의 개인정보 항목을 처리하고 있습니다.<br />
                                    ‘독식’에서 수집하는 개인정보 항목<br />
                                    ‘독식’ 회원 가입 및 고객 문의 시, 제공 동의를 해주시는 개인정보 수집 항목입니다.<br />
                                    - 회원 가입 시(회원)<br />
                                    - 필수항목 : 이름, 이메일, 전화번호, 닉네임, 비밀번호<br />
                                    - 수집목적 : 어반런드렛 회원관리 및 마케팅 이용<br />
                                    - 보유기간 : 회원 탈퇴 또는 동의철회 시 지체없이 파기<br />
                                    '카카오 개인정보 제3자 제공 동의'<br />
                                    아래는 ‘독식’ 회원 가입 시(카카오 계정을 통한 간편 가입시) 제공 동의를 해주시는 자동 수집 항목입니다.<br />
                                    - 필수항목 : 프로필 정보(닉네임), 카카오계정(이메일), 카카오계정(전화번호)<br />
                                    - 수집목적 : 독식 회원관리 및 마케팅 이용<br />
                                    - 보유기간 : 카카오채널 탈퇴 또는 동의철회 시 지체없이 파기<br />
                                    ② ‘독식’은 만 14세 미만 아동의 개인정보를 보호하기 위하여 회원가입은 만14세 이상만 가능하도록 함으로써 아동의 개인정보를 수집하지 않습니다.<br /><br />

                                    <p className={styles.subTitle}>5. 개인정보의 파기</p>
                                    ‘독식’은 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.<br />
                                    -파기절차<br />
                                    이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다. 이 때, DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로 이용되지 않습니다.<br />
                                    -파기기한<br />
                                    이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는 보유기간의 종료일로부터 5일 이내에, 개인정보의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게 되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 5일 이내에 그 개인정보를 파기합니다.<br /><br />

                                    <p className={styles.subTitle}>6. 개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항</p>
                                    ① ‘독식’은 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.<br />
                                    ② 쿠키는 웹사이트를 운영하는데 이용되는 서버(https)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.<br />
                                    가. 쿠키의 사용 목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.<br />
                                    나. 쿠키의 설치•운영 및 거부 : 웹브라우저 상단의 도구,인터넷 옵션,개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다.<br />
                                    다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.<br /><br />

                                    <p className={styles.subTitle}>7. 개인정보 보호책임자 작성</p>
                                    ① ‘독식’은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.<br />
                                    ▶ 개인정보 보호책임자<br />
                                    성명 : 독식<br />
                                    연락처 : soobinnunu1101@gmail.com<br />
                                    ※ 개인정보 보호 담당부서로 연결됩니다.<br /><br />
                                    ▶ 개인정보 보호 담당부서<br />
                                    담당자 : 독식<br />
                                    연락처 : soobinnunu1101@gmail.com<br />
                                    ② ‘독식’의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다.<br />
                                    ‘독식’은 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.<br /><br />

                                    <p className={styles.subTitle}>8. 개인정보 처리방침 변경</p>
                                    ① 이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.<br /><br />

                                    <p className={styles.subTitle}>9. 개인정보의 안전성 확보 조치</p>
                                    ‘독식’은 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.<br />
                                    ① 개인정보 취급 직원의 최소화 및 교육<br />
                                    개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고 있습니다.<br />
                                    ② 해킹 등에 대비한 기술적 대책<br />
                                    ‘독식’은 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.<br />
                                    ③ 개인정보의 암호화<br />
                                    이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.<br />
                                    ④ 접속기록의 보관 및 위변조 방지<br />
                                    개인정보처리시스템에 접속한 기록을 최소 6개월 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능 사용하고 있습니다.<br />
                                    ⑤ 개인정보에 대한 접근 제한<br />
                                    개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.<br /><br />

                                    <p className={styles.subTitle}>10. 정보주체의 권익침해에 대한 구제방법</p>
                                    아래의 기관은 독식 과는 별개의 기관으로서, ‘독식’의 자체적인 개인정보 불만처리, 피해구제 결과에 만족하지 못하시거나 보다 자세한 도움이 필요하시면 문의하여 주시기 바랍니다.<br />
                                    ▶ 개인정보 침해신고센터 (한국인터넷진흥원 운영)<br />
                                    - 소관업무 : 개인정보 침해사실 신고, 상담 신청<br />
                                    - 홈페이지 : privacy.kisa.or.kr<br />
                                    - 전화 : (국번없이) 118<br />
                                    - 주소 : (58324) 전남 나주시 진흥길 9(빛가람동 301-2) 3층 개인정보침해신고센터<br /><br />
                                    ▶ 개인정보 분쟁조정위원회<br />
                                    - 소관업무 : 개인정보 분쟁조정신청, 집단분쟁조정 (민사적 해결)<br />
                                    - 홈페이지 : www.kopico.go.kr<br />
                                    - 전화 : (국번없이) 1833-6972<br />
                                    - 주소 : (03171)서울특별시 종로구 세종대로 209 정부서울청사 4층<br /><br />
                                    ▶ 대검찰청 사이버범죄수사단 : 02-3480-3573 (www.spo.go.kr)<br />
                                    ▶ 경찰청 사이버안전국 : 182 (http://cyberbureau.police.go.kr)<br />
                                </span>
                            </div>
                            <button onClick={closeTerm2Modal}>확인</button>
                        </div>
                    </div>

                )}
                {modal.state && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <div className={styles.iconContainer}>
                                <img src='./images/auth/exclamationmark_circle.png' alt='exclamation_circle'></img>
                            </div>
                            <div className={styles.modalTextContainer}>
                                <p>{modal.text}</p>
                            </div>
                            {modal.isOneBtn ? (
                                <button onClick={closeModal}>닫기</button>
                            ) : (
                                <div className={styles.btnContainer}>
                                    <button className={styles.leftBtn} onClick={confirmCancel}>예</button>
                                    <button className={styles.rightBtn} onClick={closeModal}>아니오</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default SignUp;
