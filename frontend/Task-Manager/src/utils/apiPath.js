export const BASE_URL ="http://localhost:8000/";

//utils/apiPaths.js

export const API_PATHS ={
    AUTH:{
        REGISTER :"/api/auth/register", //register a new user (Admin or member)
        LOGIN:"/api/auth/login", // Authenticate user&return JWT Token
        GET_PROFILE :"api/auth/profile", //get logged-in user details
    },

    USERS:{
        GET_ALL_USERS:"api/users", //get all users (admin only)
        GET_USER_BY_ID:(userId)=> `/api/users/${userId}`, //get user by id 
     CREATE_USER:"/api/users", //create a new user (Admin only)
     UPDATE_USER:(userId)=>`/api/users/${userId}`,//update users details
     DELETE_USER: (userId)=>  `/api/users/${userId}`, //delete a user

    },

    TASKS:{
        GET_DASHBOARD_DATA :"/api/tasks/dashboard-data", //get dashboard data
        GET_USER_DASHBOARD_DATA:"/api/tasks/user-dashboard-data", 
        GET_ALL_TASKS:"/api/tasks",
        GET_TASK_BY_ID: (taskId)=>`/api/tasks/${taskId}`,
        CREATE_TASK:"/api/tasks",
        UPDATE_TASK:(taskId) =>`/api/tasks/${taskId}`,
        DELETE_TASK:(taskId)=> `/api/tasks/${taskId}`,

        UPDATE_TASK_STATUS:(taskId)=> `api/tasks/${taskId}/status`,
        UPDATE_TODO_CHECKLIST:(taskId)=> `api/tasks/${taskId}/todo`

    },

    REPORTS :{
        EXPORT_TASKS : "/api/reports/export/task",
        EXPORT_USERS : "/api/reports/export/users",
    },

    IMAGE:{
        UPLOAD_IMAGE:"/api/auth/upload-image",
    }
}