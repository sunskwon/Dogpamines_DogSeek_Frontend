import { useNavigate } from "react-router-dom";

import styles from "./Navbar.module.css";

function Navbar() {

    const navigate = useNavigate();

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
                <img src="/images/admin/Data Grid.png" alt="Data Grid icon"/>
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
                <img src="/images/admin/Open Delivered Box.png" alt="Open DeliveredBox icon"/>
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
                <img src="/images/admin/Open Book.png" alt="Open Book icon"/>
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
                <img src="/images/admin/Flipboard.png" alt="Flipboard icon"/>
                <span>게시판 관리</span>
            </div>
            <div
                style={{
                    display: "flex",
                    marginBottom: "30px",
                }}
            >
                <img src="/images/admin/Man.png" alt="Man icon"/>
                <span>회원 관리</span>
            </div>
            <div
                style={{
                    height: "220px",
                    cursor: "default",
                }}
            >

            </div>
            <div
                style={{
                    display: "flex",
                    marginBottom: "30px",
                }}
                onClick={() => {
                    navigate("/");
                }}
            >
                <img src="/images/admin/External Link.png" alt="External Link icon"/>
                <span>돌아가기</span>
            </div>
            <div
                style={{
                    display: "flex",
                }}
            >
                <img src="/images/admin/Logout.png" alt="Logout icon"/>
                <span>로그아웃</span>
            </div>
        </div>
    );
}

export default Navbar;