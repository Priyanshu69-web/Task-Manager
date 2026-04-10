import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";

import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector"
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { UserContext } from "../../context/useContext";
import UploadImage from "../../utils/uploadImage";
import { motion } from "framer-motion";

const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminInviteToken, setAdminInviteToKen] = useState("");

    const [error, setError] = useState(null);


    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    //Handle signup form Submit
    const handdleSignup = async (e) => {
        e.preventDefault();

        if (!fullName) {
            setError("Please enter a full name.");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter the password");
            return;
        }

        setError("");

        //Sign up API Call 

        try {
            let profileImageUrl = "";
            //upload image if present 
            if (profilePic) {
                const imgUploadRes = await UploadImage(profilePic);
                profileImageUrl = imgUploadRes.imageUrl || "";
            }
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                name: fullName,
                email,
                password,
                profileImageUrl,
                adminInviteToken
            });

            // Validate that we received a proper JSON response object
            if (!response.data || typeof response.data !== 'object') {
                console.error("Unexpected signup response:", response.data);
                setError("Received an unexpected response from the server. This usually means the backend is misconfigured and failing silently. Please check your backend.");
                return;
            }

            const { token, role } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(response.data);

                //Redirect based on role
                if (role === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/user/dashboard");
                }
            }

        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again");
            }

        }
    };



    return (
        <AuthLayout>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: .5 }} className=" lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Create an Account</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Join us today by entering your details below.
                </p>
            </motion.div>
            <form onSubmit={handdleSignup}>
                <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}></ProfilePhotoSelector>
                <motion.div initial={{ opacity: 0, x: -10, y: -10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 1, delay: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        value={fullName}
                        onChange={({ target }) => setFullName(target.value)}
                        label="Full Name"
                        placeholder="John Doe"
                        type="text"
                    />
                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Email Address"
                        placeholder="john@example.com"
                        type="text"
                    />
                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Password"
                        placeholder="Min 8 characters"
                        type="password"
                    />
                    <Input
                        value={adminInviteToken}
                        onChange={({ target }) => setAdminInviteToKen(target.value)}
                        label="Admin Invite Token"
                        placeholder="6 Digit Code"
                        type="text"
                    />

                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                    <button type="submit" className="btn-primary">
                        SIGNUP
                    </button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        Already  have an account?{""}
                        <Link className=" font-medium text-primary underline " to="/login">
                            Login
                        </Link>
                    </p>

                </motion.div>
            </form>

        </AuthLayout>
    )
};


export default SignUp;