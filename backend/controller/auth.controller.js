import bcryptjs from "bcryptjs"
import { User } from "../models/user.model.js"
import generateJwtTokenAndSetCookie from "../utils/generateJwtTokenAndSetCookie.js"

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
            verificationToken

        })

        await user.save()
        
      
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



export const login = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}



export const logout = async(req,res)=>{
    res.send('logout')
}