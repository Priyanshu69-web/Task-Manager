import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import moment from "moment";
import AvatarGroup from "../../components/layouts/AvatarGroup";
import toast from "react-hot-toast";
import { TaskDetailSkeleton } from "../../components/layouts/Skeletons";


const ViewTaskDetails = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case "Completed":
                return "bg-green-100 text-green-500 border border-green-200";
            case "Pending":
                return "bg-purple-100 text-purple-500 border border-purple-200";
            case "In Progress":
                return "bg-cyan-100 text-cyan-500 border border-cyan-200";
            default:
                return "bg-gray-100 text-gray-500 border border-gray-200";
        }
    };
    const getPriorityBadgeColor = (priority) => {
        switch (priority) {
            case "High":
                return "bg-red-100 text-red-500 border border-red-200";
            case "Medium":
                return "bg-orange-100 text-orange-500 border border-orange-200";
            case "Low":
                return "bg-green-100 text-green-500 border border-green-200";
            default:
                return "bg-gray-100 text-gray-500 border border-gray-200";
        }
    };

    const getTaskDetailsByID = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.get(
                API_PATHS.TASKS.GET_TASK_BY_ID(id)
            );
            if (response.data) {
                setTask(response.data);
            }
        } catch (error) {
            console.error("Error fetching task details:", error);
            setError("Failed to load task details. Please try again.");
            toast.error("Failed to load task details");
        } finally {
            setLoading(false);
        }
    };

    const updateTodoChecklist = async (index) => {
        const todoChecklist = [...task.todoChecklist];
        todoChecklist[index].completed = !todoChecklist[index].completed;

        try {
            const response = await axiosInstance.put(
                API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(task._id),
                { todoChecklist }
            );
            if (response.data) {
                setTask(response.data?.task || task);
                toast.success("Checklist updated!");
            }
        } catch (error) {
            console.error("Error Updating Todo Checklist:", error);
            toast.error("Failed to update checklist");
        }
    };

    const handleStatusChange = async (newStatus) => {
        try {
            const response = await axiosInstance.put(
                API_PATHS.TASKS.UPDATE_TASK_STATUS(task._id),
                { status: newStatus }
            );
            if (response.data) {
                setTask(response.data?.task || { ...task, status: newStatus });
                toast.success(`Task marked as ${newStatus}`);
            }
        } catch (error) {
            console.error("Error Updating Task Status:", error);
            toast.error("Failed to update task status");
        }
    };

    useEffect(() => {
        if (id) {
            getTaskDetailsByID();
        }
        return () => { };
    }, [id]);


    if (loading) {
        return (
            <DashboardLayout activeMenu={"My Tasks"}>
                <TaskDetailSkeleton />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout activeMenu={"My Tasks"}>
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                    <p className="text-red-500 text-sm">{error}</p>
                    <button className="card-btn" onClick={getTaskDetailsByID}>
                        Retry
                    </button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout activeMenu={"My Tasks"}>
            <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
                <div className="form-card col-span-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm md:text-lg font-medium">{task?.title}</h2>
                        <div>
                            <span
                                className={`text-xs px-3 py-1 rounded ${getStatusBadgeColor(
                                    task?.status
                                )}`}
                            >
                                {task?.status}
                            </span>
                            <span
                                className={`text-xs px-3 py-1 rounded ml-2 ${getPriorityBadgeColor(
                                    task?.priority
                                )}`}
                            >
                                {task?.priority} Priority
                            </span>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-4">{task?.description}</p>

                    <div className="flex flex-wrap gap-3 mt-4">
                        <div className="text-[13px]">
                            <label className="text-gray-500">Start Date: </label>
                            <span className="font-medium">
                                {task?.createdAt
                                    ? moment(task.createdAt).format("Do MMM YYYY")
                                    : "N/A"}
                            </span>
                        </div>
                        <div className="text-[13px]">
                            <label className="text-gray-500">Due Date: </label>
                            <span className="font-medium">
                                {task?.dueDate
                                    ? moment(task.dueDate).format("Do MMM YYYY")
                                    : "N/A"}
                            </span>
                        </div>
                    </div>

                    <div className="mt-2">
                        <label className="text-xs font-medium text-gray-500">
                            Assigned To
                        </label>
                        <AvatarGroup
                            avatars={
                                task?.assignedTo?.map((item) => item.profileImageUrl) || []
                            }
                            names={
                                task?.assignedTo?.map((item) => item.name) || []
                            }
                            maxVisible={5}
                        />
                    </div>

                    <div className="mt-6">
                        <label className="text-xs font-medium text-gray-500 mb-2 block">
                            Todo Checklist
                        </label>
                        {task?.todoChecklist?.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 my-2"
                            >
                                <input
                                    type="checkbox"
                                    checked={item.completed}
                                    onChange={() => updateTodoChecklist(index)}
                                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none cursor-pointer"
                                />
                                <p className="text-[13px] text-gray-800">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {task?.attachments?.length > 0 && (
                        <div className="mt-6">
                            <label className="text-xs font-medium text-gray-500 mb-2 block">
                                Attachments
                            </label>
                            {task.attachments.map((link, index) => (
                                <a
                                    key={index}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 mb-2 text-xs text-primary hover:bg-gray-100"
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ViewTaskDetails;