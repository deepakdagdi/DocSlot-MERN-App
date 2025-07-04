import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";

//app config
const app=express();
const port = process.env.PORT || "https://docslot-mern-app-backend.onrender.com";
connectDB();
connectCloudinary();

//Middleware
app.use(express.json())
app.use(cors())

//api endpoint
 app.use('/api/admin',adminRouter)
 app.use('/api/doctor',doctorRouter)
 app.use('/api/user',userRouter)
 app.get('/',(req,res)=>{
    res.send('API IS WORKING');
})
app.listen(port,()=>console.log("http://localhost:",port))