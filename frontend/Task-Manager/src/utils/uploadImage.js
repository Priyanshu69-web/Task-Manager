import { API_PATHS } from "./apiPath";
import axiosInstance from "./axiosInstance";

const UploadImage =async(imageFile)=>{
    const formData =new FormData();
     //Append Image file to form Data 
     formData.append('image', imageFile);

     try{
        const response =await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData,{
            headers:{
                'Content-Type':'multipart/form-data',  //Set header for file upload
            },
        });
        return response.data;//return response data
     }catch(error){
        console.error('Error uploading the image:', error);
        throw error; // Rethrow error for handling
     }
};

export default UploadImage;