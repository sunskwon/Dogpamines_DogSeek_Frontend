import { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import cookie from "react-cookies";

import { callLogoutAPI} from "../../../api/RestAPIs";

import ConfirmModal from "../../../components/admin/adminCommon/ConfirmModal";

import styles from "./Navbar.module.css";

function Navbar() {

    const [moveModalOpen, setMoveModalOpen] = useState(false);
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);

    const modalBackground = useRef();

    const navigate = useNavigate();

    const logoutHandler =  async () => {

        const result = await callLogoutAPI();

        if (result === 'true') {

            window.localStorage.removeItem("accessToken");
            window.localStorage.removeItem("refreshToken");

            cookie.remove('Identifier', {path : '/'}, 1000);
        }

        navigate('/');
    };

    return (
        <div className={styles.navbar}>
            <div
                style={{
                    display: "flex",
                    marginBottom: "30px",
                }}
                onClick={() => {
                    navigate("/admin/dashboard");
                }}
            >
                <img src="/images/admin/DataGrid.png" alt="Data Grid icon" />
                <span>대시보드</span>
            </div>
            <div
                style={{
                    display: "flex",
                    marginBottom: "30px",
                }}
                onClick={() => {
                    navigate("/admin/products");
                }}
            >
                <img src="/images/admin/OpenDeliveredBox.png" alt="Open DeliveredBox icon" />
                <span>사료 정보 관리</span>
            </div>
            <div
                style={{
                    display: "flex",
                    marginBottom: "30px",
                }}
                onClick={() => {
                    navigate("/admin/dicts");
                }}
            >
                <img src="/images/admin/OpenBook.png" alt="Open Book icon" />
                <span>견종 백과 관리</span>
            </div>
            <div
                style={{
                    display: "flex",
                    marginBottom: "30px",
                }}
                onClick={() => {
                    navigate("/admin/boards");
                }}
            >
                <img src="/images/admin/Flipboard.png" alt="Flipboard icon" />
                <span>게시판 관리</span>
            </div>
            <div
                style={{
                    display: "flex",
                    marginBottom: "30px",
                }}
                onClick={() => {
                    navigate("/admin/users");
                }}
            >
                <img src="/images/admin/Man.png" alt="Man icon" />
                <span>회원 관리</span>
            </div>
            <div
                style={{
                    display: "flex",
                    marginBottom: "30px",
                }}
                onClick={() => {
                    navigate("/admin/chatlist");
                }}
            >
                <img src="/images/admin/Chat.png" alt="Chat icon" />
                <span>1:1 문의</span>
            </div>
            
            <div
                style={{
                    height: "160px",
                    cursor: "default",
                }}
            >

            </div>
            <div
                style={{
                    display: "flex",
                    marginBottom: "30px",
                }}
                onClick={() => setMoveModalOpen(true)}
            >
                <img src="/images/admin/ExternalLink.png" alt="External Link icon" />
                <span>메인으로</span>
            </div>
            <div
                style={{ display: "flex", }}
                onClick={() => setLogoutModalOpen(true)}
            >
                <img src="/images/admin/Logout.png" alt="Logout icon" />
                <span>로그아웃</span>
            </div>
            <ConfirmModal
                message='독식(DogSeek) 메인 페이지로 이동 하시겠습니까?'
                onClickHandler={() => navigate('/')}
                modalOpen={moveModalOpen}
                setModalOpen={setMoveModalOpen}
                modalBackground={modalBackground}
            />
            <ConfirmModal
                message='정말 로그아웃 하시겠습니까?'
                onClickHandler={logoutHandler}
                modalOpen={logoutModalOpen}
                setModalOpen={setLogoutModalOpen}
                modalBackground={modalBackground}
            />
        </div>
    );
}

export default Navbar;