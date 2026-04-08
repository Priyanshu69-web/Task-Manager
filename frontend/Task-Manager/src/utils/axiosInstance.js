import axios from "axios";
import {BASE_URL} from "./apiPath";

const axiosInstance =axios.create({
    baseURL:BASE_URL,
    timeout:10000,
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
    },

});

//Request Interceptor

axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken =localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization=`Bearer ${accessToken}`;

        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

//Response Interceptor

axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        //Handle common error globally
        if(error.response){
            if(error.response.status ===401){
                //redirect to login page only if not already on it
                //Using hash check because the app uses HashRouter
                if (!window.location.hash.includes("/login")) {
                    localStorage.removeItem("token");
                    window.location.hash = "#/login";
                }
            }else if (error.response.status===500){
                console.error("Server error:", error.response.data?.message || "Internal server error");
            }
        } else if(error.code ==="ECONNABORTED"){
            console.error("Request timeout. Please try again.");
        }
        return Promise.reject(error);
    }

);

export default axiosInstance;