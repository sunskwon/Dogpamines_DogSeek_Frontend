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
                <img src="/images/admin/Data Grid.png" />
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
                <img src="/images/admin/Open Delivered Box.png" />
                <span>사료 정보 관리</span>
            </div>
            <div
                style={{
                    display: "flex",
                    marginBottom: "30px",
                }}
            >
                <img src="/images/admin/Open Book.png" />
                <span>견종 백과 관리</span>
            </div>
            <div
                style={{
                    display: "flex",
                    marginBottom: "30px",
                }}
            >
                <img src="/images/admin/Flipboard.png" />
                <span>게시판 관리</span>
            </div>
            <div
                style={{
                    display: "flex",
                    marginBottom: "30px",
                }}
            >
                <img src="/images/admin/Man.png" />
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
            >
                <img src="/images/admin/External Link.png" />
                <span>돌아가기</span>
            </div>
            <div
                style={{
                    display: "flex",
                }}
            >
                <img src="/images/admin/Logout.png" />
                <span>로그아웃</span>
            </div>
        </div>
    );
}

export default Navbar;