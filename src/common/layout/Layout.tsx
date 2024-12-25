import {Outlet} from "react-router-dom";
import {Navbar} from "./Navbar";

export const Layout = () => {
    return (
        <div className="relative w-[960px] min-h-[100vh] max-h-[100vh] mx-auto flex flex-col overflow-hidden">
            <div className="overflow-auto z-40 mb-[80px] w-full">
                <Outlet/>
            </div>
            <Navbar />
        </div>
    );
};
