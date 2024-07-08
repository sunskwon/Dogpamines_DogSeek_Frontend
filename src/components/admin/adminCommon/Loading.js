import React from "react";

import { Oval } from "react-loader-spinner";

import styles from "./AdminCommon.module.css";

function Loading({ height }) {

    return (
        <div
            className={styles.loadingBox}
            style={{ height: height ? height : "500px", }}
        >
            <div>
                <h3>잠시만 기다려주세요</h3>
                <div className={styles.innerLoading}>
                    <Oval />
                </div>
            </div>
        </div>
    );
};

export default Loading;