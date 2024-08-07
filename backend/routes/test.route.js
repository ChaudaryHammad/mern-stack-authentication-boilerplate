import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router()

router.get('/test',isAuthenticated,(req,res)=>{
   try {
    res.send('Hello from test route')
   } catch (error) {
         return res.status(500).json({
              success:false,
              message:'Internal server error',
              error:error.message
            })
    
   }
})


export default router