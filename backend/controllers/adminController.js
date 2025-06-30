
import jwt from 'jsonwebtoken'

import doctorModel from "../models/doctorModel.js";
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';

//login admin api
const loginAdmin = async(req,res) =>{
    try {
        const {email,password}= req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

            const token =jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success: true , token})

        }else{
            res.json({success:false, message:"Invalid Credentials"})
        }
        
    } catch (error) {
        console.log(error);
            res.json({success:false , message:error.message})
        
    }
}


export  {loginAdmin}