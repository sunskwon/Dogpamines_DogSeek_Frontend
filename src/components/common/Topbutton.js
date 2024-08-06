import { useState, useEffect } from "react";
import styles from './Topbutton.module.css';

function TopButton() {

    const [showButton, setShowButton] = useState(false);

    const onClickHandler = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    };

    useEffect(() => {
        const handleShowButton = () => {
            if (window.scrollY > 100) {
                setShowButton(true)
            } else {
                setShowButton(false)
            };
        };

        window.addEventListener("scroll", handleShowButton)
        return () => {
            window.removeEventListener("scroll", handleShowButton)
        }
    }, []);

    return showButton && (
        <>
            <img
                id={styles.top}
                onClick={onClickHandler}
                src='/images/main/topbtn5.png'
                alt=''
            />
        </>
    );
}

export default TopButton;