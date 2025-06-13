import React from "react";
import UI_IMG from "../../assets/images/login_bg.png";

const AuthLayout = ({ children }) => {
    return (
        <div className="flex w-screen h-screen">
            <div className=" md:w-[60vw] flex flex-col px-12 pt-8 pb-12">
                <h2 className="text-lg font-medium text-black">Task Manager</h2>
                {children}
            </div>
            <div className="hidden md:flex w-[40vw] h-screen items-center justify-center bg-cover bg-no-repeat bg-center overflow-hidden ">
                <img src={UI_IMG} className="w-64 lg:w-[100%] h-screen" />
            </div>
        </div>
    );
}

export default AuthLayout;
