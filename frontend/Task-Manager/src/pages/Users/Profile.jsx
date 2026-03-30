import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { motion } from "framer-motion";
import Input from "../../components/Inputs/Input";
import { UserContext } from "../../context/useContext";
import UploadImage from "../../utils/uploadImage";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { getAvatarUrl, getInitials } from "../../utils/avatarHelper";

const Profile = () => {
    const { user, updateUser } = useContext(UserContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImageUrl, setProfileImageUrl] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [profileImgError, setProfileImgError] = useState(false);
    const [message, setMessage] = useState("");

    // Populate form with current user data on mount
    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
            setProfileImageUrl(user.profileImageUrl || "");
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let uploadedUrl = profileImageUrl;

            if (imageFile) {
                const res = await UploadImage(imageFile);
                uploadedUrl = res.imageUrl;
            }

            const res = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, {
                name,
                email,
                password: password || undefined,
                profileImageUrl: uploadedUrl,
            });

            updateUser(res.data);
            setMessage("Profile updated successfully!");
        } catch (err) {
            setMessage(err?.response?.data?.message || "Something went wrong.");
        }
    };

    return (
        <DashboardLayout>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-xl mx-auto mt-12"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center gap-4">
                        {imageFile ? (
                            <img
                                src={URL.createObjectURL(imageFile)}
                                alt="Profile"
                                className="w-16 h-16 rounded-full object-cover"
                            />
                        ) : getAvatarUrl(profileImageUrl) && !profileImgError ? (
                            <img
                                src={getAvatarUrl(profileImageUrl)}
                                alt="Profile"
                                className="w-16 h-16 rounded-full object-cover"
                                onError={() => setProfileImgError(true)}
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">
                                {getInitials(name)}
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            className="text-sm"
                        />
                    </div>

                    <Input
                        label="Full Name"
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    />

                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />

                    <button type="submit" className="btn-primary">
                        Update Profile
                    </button>

                    {message && <p className="text-sm text-center mt-2 text-red-500">{message}</p>}
                </form>
            </motion.div>
        </DashboardLayout>
    );
};

export default Profile;
