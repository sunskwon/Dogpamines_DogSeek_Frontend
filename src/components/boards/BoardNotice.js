import styles from './BoardNotice.module.css';

function BoardNotice() {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.titleBox}>
                    <p>Notices</p>
                </div>
                <hr />
            </div>
        </>
    );
}

export default BoardNotice;