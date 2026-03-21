import React from "react";
import UI_IMG from "../../assets/images/login_bg.png";
import { motion } from "framer-motion";

const AuthLayout = ({ children }) => {
    return (
        <div className="flex w-screen h-screen">
            <div className=" md:w-[60vw] flex flex-col px-12 pt-8 pb-12">
                <motion.h2
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, }} className="text-lg font-medium text-black">Task Manager</motion.h2>
                {children}
            </div>
            <div className="hidden md:flex w-[40vw] h-screen items-center justify-center bg-cover bg-no-repeat bg-center overflow-hidden ">
                <motion.img initial={{ opacity: 0, x: 10, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }} src={UI_IMG} className="w-64 lg:w-[100%] h-screen" />
            </div>
        </div>
    );
}

export default AuthLayout;
