import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";




const Main = () => {
    return (
        <div className="container">
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;