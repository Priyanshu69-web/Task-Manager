import React, { useEffect, useState } from "react";
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { LuFileSpreadsheet } from "react-icons/lu";
import TaskStatusTabs from '../../components/layouts/TaskStatusTabs'
import TaskCard from "../../components/Cards/TaskCard";
import toast from "react-hot-toast";
import { TaskCardsSkeleton } from "../../components/layouts/Skeletons";

const ManageTasks = () => {

    const [allTasks, setAllTasks] = useState([]);
    const [tabs, setTabs] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const getAllTasks = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS,
                {
                    params: {
                        status: filterStatus === "All" ? "" : filterStatus,
                    },
                });

            setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : []);

            const statusSummary = response.data?.statusSummary || {};

            const statusArray = [
                { label: "All", count: statusSummary.all || 0 },
                { label: "Pending", count: statusSummary.pendingTasks || 0 },
                { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
                { label: "Completed", count: statusSummary.completedTasks || 0 },
            ];

            setTabs(statusArray);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setError("Failed to load tasks. Please try again.");
            toast.error("Failed to load tasks");
        } finally {
            setLoading(false);
        }
    };

    const handleClick = (taskData) => {
        navigate('/admin/create-task', { state: { taskId: taskData._id } })
    };

    // download task report
    const handleDownloadReport = async () => {
         try{
            const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_TASKS, {
                responseType: "blob",
            });

            // create a URL for the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "Task_details.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch(error){
            console.error("Error downloading Task Details:", error);
            toast.error("Failed to download Task Details. Please try again.")
        }
    };

    useEffect(() => {
        getAllTasks(filterStatus);
        return () => { };
    }, [filterStatus]);

    return (
        <DashboardLayout activeMenu={"Manage Tasks"}>
            <div className="my-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex items-center justify-between w-full lg:w-auto gap-3">
                        <h2 className="text-xl md:text-xl font-medium">My Tasks</h2>

                        <button
                            className="flex lg:hidden download-btn"
                            onClick={handleDownloadReport}
                        >
                            <LuFileSpreadsheet className="text-lg" />
                            Download Report
                        </button>
                    </div>
                    {tabs?.[0]?.count > 0 && (
                        <div className="flex items-center gap-3 mt-4 lg:mt-0 w-full min-w-0">
                            <div className="flex-1 min-w-0">
                                <TaskStatusTabs
                                    tabs={tabs}
                                    activeTab={filterStatus}
                                    setActiveTab={setFilterStatus}
                                />
                            </div>
                            <button className="hidden lg:flex download-btn whitespace-nowrap" onClick={handleDownloadReport}>
                                <LuFileSpreadsheet className="text-lg" />
                                Download SpreadSheet
                            </button>
                        </div>
                    )}
                </div>
                
                {loading ? (
                    <TaskCardsSkeleton count={6} />
                ) : error ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-4">
                        <p className="text-red-500 text-sm">{error}</p>
                        <button className="card-btn" onClick={() => getAllTasks()}>
                            Retry
                        </button>
                    </div>
                ) : allTasks.length === 0 ? (
                    <div className="flex items-center justify-center h-64">
                        <p className="text-gray-400 text-sm">No tasks found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {allTasks?.map((item) => (
                            <TaskCard
                                key={item._id}
                                title={item.title}
                                description={item.description}
                                priority={item.priority}
                                status={item.status}
                                progress={item.progress}
                                createdAt={item.createdAt}
                                dueDate={item.dueDate}
                                assignedTo={item.assignedTo?.map((item) => item.profileImageUrl)}
                                attachmentCount={item.attachments?.length || 0}
                                completedTodoCount={item.completedTodoCount || 0}
                                todoChecklist={item.todoChecklist || []}
                                onClick={() => {
                                    handleClick(item);
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default ManageTasks