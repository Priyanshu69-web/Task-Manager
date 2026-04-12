import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { LuFileSpreadsheet } from "react-icons/lu";
import UserCard from "../../components/Cards/UserCard";
import toast from "react-hot-toast";
import { UserCardsSkeleton } from "../../components/layouts/Skeletons";

const ManageUsers = () => {

    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAllUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);

            if (response.data?.length > 0) {
                setAllUsers(response.data);
            }
        } catch (error) {
            console.error("Error fetching Users:", error);
            setError("Failed to load team members. Please try again.");
            toast.error("Failed to load team members");
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadReport = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS, {
                responseType: "blob",
            });

            // create a URL for the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "user_details.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading Users Details:", error);
            toast.error("Failed to download Users Details. Please try again.")
        }
    }

    useEffect(() => {
        getAllUsers();
        return () => { };
    }, []);

    return (
        <DashboardLayout activeMenu={"Team Members"}>
            <div className="mt-5 mb-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <h2 className="text-xl md:text-xl font-medium">Team Members</h2>

                    <button className="flex md:flex download-btn" onClick={handleDownloadReport}>
                        <LuFileSpreadsheet className="text-lg" />
                        Download Report
                    </button>
                </div>
                
                {loading ? (
                    <UserCardsSkeleton count={3} />
                ) : error ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-4">
                        <p className="text-red-500 text-sm">{error}</p>
                        <button className="card-btn" onClick={getAllUsers}>
                            Retry
                        </button>
                    </div>
                ) : allUsers.length === 0 ? (
                    <div className="flex items-center justify-center h-64">
                        <p className="text-gray-400 text-sm">No team members found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                        {allUsers?.map((user) => (
                            <UserCard key={user._id} userInfo={user} />
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default ManageUsers