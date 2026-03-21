import React, { useState } from "react";
import SideMenu from "./SideMenu";
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { motion } from 'framer-motion';

const Navbar = ({ activeMenu }) => {

    const [openSideMenu, setOpenSideMenu] = useState(false)
    return (
        <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 ">
            <button
                className="block lg-:hidden text-black"
                onClick={() => {
                    setOpenSideMenu(!openSideMenu);
                }}>
                {openSideMenu ? (
                    <HiOutlineX className="text-2xl" />
                ) : (
                    <HiOutlineMenu className="text-2xl" />
                )}
            </button>
            <motion.h2
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="text-lg font-medium text-black">Task Manager</motion.h2>

            {openSideMenu && (
                <div className="fixed top-[61px] -ml-4 ng-white">
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </div>
    )
};

export default Navbar;