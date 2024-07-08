import React from "react";

import styles from "./AdminCommon.module.css";

class FetchErrorBoundaryWBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <div className={styles.boundary}>
                        <div style={{ height: "53.5px", }}></div>
                        <div
                            className={styles.errorBoundaryContainer}
                            style={{ height: (this.props.height) }}
                        >
                            <img
                                src="/images/admin/Error.png"
                                alt="에러 아이콘"
                            />
                            <div>
                                <p>자료를 불러오는데 실패했습니다</p>
                                <p>데이터 서버와의 연결을 확인해주세요</p>
                            </div>
                        </div >
                    </div >
                </>
            );
        }
        return this.props.children;
    }
}

export default FetchErrorBoundaryWBoundary;