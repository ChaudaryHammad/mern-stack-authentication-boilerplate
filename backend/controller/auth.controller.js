import bcryptjs from "bcryptjs"
import { User } from "../models/user.model.js"
import generateJwtTokenAndSetCookie from "../utils/generateJwtTokenAndSetCookie.js"
import sendEmail from "../utils/sendEmail.js"
import generateEmailTemplate from '../utils/generateEmailTemplate.js';




export const signup = async(req,res)=>{
    const {name,email,password} = req.body
    try {
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:'Please fill all the fields'
            })
        }

        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already exists',
            
            })
        }

        const hashedPassword = await bcryptjs.hash(password,12)
        const verificationToken = Math.floor(100000 + Math.random() * 900000)
        const user = new User({
            name,
            email,
            password:hashedPassword,
            verificationToken,
            verificationTokenExpiresAt:Date.now() + 24 *60*60*1000

        })

        await user.save()

        const htmlMessage = generateEmailTemplate('verification', {
            name: user.name,
            token: verificationToken
        });

        await sendEmail({
            email: user.email,
            subject: 'Email Verification',
            message: `Your verification code is ${verificationToken}. Please use this code to verify your account.`, // Text content
            html: htmlMessage // HTML content
        });


      
        generateJwtTokenAndSetCookie(res,user._id)
        res.status(201).json({
            success:true,
            message:'User created successfully',
            user:{
                ...user._doc,
                password:undefined
            }
        })


} catch (error) {
    res.status(500).json({
        success:false,
        message:'Internal server error',
        error:error.message
    })
    
}
}




export const verifyEmail = async(req,res)=>{
    const {code} = req.body;
    console.log(code)
    try {
        const user = await User.findOne({
            verificationToken:code,
            verificationTokenExpiresAt:{$gt:Date.now()}
          
        })
        console.log(user);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found (verify token)",
             })

        }

        user.isVerified= true;
        user.verificationToken=undefined;
        user.verificationTokenExpiresAt=undefined;

        await user.save()

        const generateHtmlMessage = generateEmailTemplate('Welcome',{
            name:user.name,
            email:user.email

        })

        await sendEmail({
            email:user.email,
            subject:'Welcome',
            message:'Welcome to RUNO',
            html:generateHtmlMessage
        })


        res.status(200).json({
            success:true,
            message:"User verified",
            user:{
                ...user._doc,
                password:undefined
            }
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Internal server error (verifying token)',
            error:error.message
        })
    }
}





export const login = async(req,res)=>{
    const {email,password} = req.body
    try {

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'Please fill all the fields'
            })
        }

        const user = await User.findOne({email})
        if(!user){
          return  res.status(400).json({
                success:false,
                message:'Invalid credentials'
            })
        }

        const isPasswordMatch = await bcryptjs.compare(password,user.password)
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:'Invalid credentials'
            })
        }

        generateJwtTokenAndSetCookie(res,user._id)
       user.lastLogin = Date.now()
         await user.save()
    
          res.status(200).json({
                success:true,
                message:'User logged in successfully',
                user:{
                 ...user._doc,
                 password:undefined
                }   

            })

        
    } catch (error) {
       return res.status(500).json({
            success:false,
            message:'Internal server error',
            error:error.message
        })
        
    }
}








export const logout = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
          
            return res.status(400).json({
                success: false,
                message: 'No token found in cookies',
            });
        }

        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.status(200).json({
            success: true,
            message: 'User logged out successfully',
        });
    } catch (error) {
       
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};
