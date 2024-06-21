import Footer from "../components/common/Footer";
import Header1 from "../components/common/Header1";
import { Outlet } from "react-router-dom";

function Layout1(){
    return(
        <>
            <Header1/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout1;