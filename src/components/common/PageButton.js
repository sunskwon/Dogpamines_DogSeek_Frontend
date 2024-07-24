import styles from './PageButton.module.css';

function PageButton({ page, setPage, maxPage }) {

    return (
        <>
            <div className={styles.buttonBox}>
                <div
                    className={page > 1 ? styles.button : styles.hiddenButton}
                    onClick={() => setPage(1)}
                >
                    &lt;&lt;
                </div>
                <div
                    className={page - 4 > 1 ? styles.button : styles.hiddenButton}
                    onClick={() => setPage(prev => prev - 5)}
                >
                    &lt;
                </div>
                <div
                    className={page - 2 > 0 ? styles.button : styles.hiddenButton}
                    onClick={() => setPage(prev => prev - 2)}
                >
                    {page - 2}
                </div>
                <div
                    className={page - 1 > 0 ? styles.button : styles.hiddenButton}
                    onClick={() => setPage(prev => prev - 1)}
                >
                    {page - 1}
                </div>
                <div className={styles.selectedButton}>{page}</div>
                <div
                    className={page < maxPage ? styles.button : styles.hiddenButton}
                    onClick={() => setPage(prev => prev + 1)}
                >
                    {page + 1}
                </div>
                <div
                    className={page + 1 < maxPage ? styles.button : styles.hiddenButton}
                    onClick={() => setPage(prev => prev + 2)}
                >
                    {page + 2}
                </div>
                <div
                    className={page + 4 < maxPage ? styles.button : styles.hiddenButton}
                    onClick={() => setPage(prev => prev + 5)}
                >
                    &gt;
                </div>
                <div
                    className={page < maxPage ? styles.button : styles.hiddenButton}
                    onClick={() => setPage(maxPage)}

                >
                    &gt;&gt;
                </div>
            </div>
        </>
    );
}

export default PageButton;