import { useState, useEffect, useRef } from "react";

import ConfirmModal from '../components/main/ConfirmModal';
import Curation from '../components/main/Curation';
import OurServices from "../components/main/OurServices";
import AboutDogs from "../components/main/AboutDogs";
import Board from "../components/main/Board";
import AboutDogSeek from "../components/main/AboutDogSeek";

import UsersBest from "../components/main/UsersBest";

function Main() {

    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();

    useEffect(() => {

        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {

        if (modalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        return () => {
            document.body.style.overflow = 'auto';
        };

    }, [modalOpen]);



    return (
        <>
            <ConfirmModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                modalBackground={modalBackground}
            />
            <Curation
                setModalOpen={setModalOpen}
            />
            <hr style={{ width: "1180px", }} />
            <OurServices
                setModalOpen={setModalOpen}
            />
            <hr style={{ width: "1180px", }} />
            <UsersBest />
            <hr style={{ width: "1180px", }} />
            <AboutDogs />
            <hr style={{ width: "1180px", }} />
            <Board />
            <hr style={{ width: "1180px", }} />
            <AboutDogSeek />
        </>
    )
}

export default Main;