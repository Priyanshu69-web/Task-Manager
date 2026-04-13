import React, { useContext } from "react";
import { UserContext } from "../../context/useContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {

    const{ user } = useContext(UserContext);
    return (
        <div className="">
            <Navbar activeMenu={activeMenu} />
            {user && (
                <div className="flex w-full">
                    <div className="max-lg:hidden w-[240px]">
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                    <div className="grow min-w-0 mx-2 md:mx-5">{children}</div>
                </div>
            )}
        </div>
    );

};

export default DashboardLayout;