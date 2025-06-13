const mongoose= require("mongoose");

 const connectDB=async ()=>{
    try{
       await mongoose.connect(process.env.MONGO_URI,{});
       console.log("mongoDB connected");

    } catch(err){
        console.log(err,"error connecting to mongodb");
        process.exit(1);

    }
 };
 module.exports =connectDB;
 