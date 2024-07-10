import { useState, useEffect } from "react";
import styles from './Topbtn.module.css';

function TopBtn() {

    const [showButton, setShowButton] = useState(false);

    const scrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })

    }
    useEffect(() => {
        const handleShowButton = () => {
            if (window.scrollY > 100) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        }

        console.log(window.scrollY)
        window.addEventListener("scroll", handleShowButton)
        return () => {
            window.removeEventListener("scroll", handleShowButton)
        }
    }, [])

    return showButton && (
        <div className={styles.scroll__container}>
            <img id={styles.top} onClick={scrollToTop} src='./images/main/topbtn5.png'></img>
        </div>

    )
}

export default TopBtn;