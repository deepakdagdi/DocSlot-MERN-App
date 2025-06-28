import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import userModel from '../models/userModel.js';
import {v2 as cloudinary} from 'cloudinary'

//Api to register user

const registerUser=async (req,res)=>{
    try {
        const {name,email,password} =req.body;
        
        if(!name  || !password || !email){
            return res.json({success:false,message:"Missing Details"});
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"enter a valid email "});
        }
        if(password.length < 6){
            return res.json({success:false,message:"enter a strong password"});
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(password,salt)

        const userData={
            name,
            email,
            password : hashedPassword
        }

        const newUser= new userModel(userData)
        const user=await newUser.save()

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({success:true,token})
        
        
    } catch (error) {
         console.log(error)
        res.json({success:false , message:error.message})
        
    }
}

// Api for user login
const  loginUser = async(req,res)=>{
    try {
        
        const {email,password} = req.body;
        const user= await userModel.findOne({email})
        if(!user){
            return res.json({success:false , message:"User doesn't exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true, token})
        }else{

            res.json({success:false , message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
        
    }

}

// Api to get User profile data

const getProfile = async(req,res) =>{
    try {
        
        const {userId} = req;
        
        const userData= await userModel.findById(userId).select('-password')

        res.json({success:true,userData})

    } catch (error) {
          console.log(error)
        res.json({success:false , message:error.message})
        
    }
}


//Api to update user profile
const updateProfile = async(req,res)=>{
    try {
        const {userId}=req;
        const {name,phone,address,dob,gender}=req.body
        const imageFile = req.file;
        
        if(!name || !phone || !address || !dob || !gender){
            return res.json({success:false,message:"Data Missing"})

        }

        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

        if(imageFile){
            //upload image to cloudinary

            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageURL})

        }
        res.json({success:true,message:"profile Updated"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
        
    }
}

export {registerUser,loginUser,getProfile,updateProfile}