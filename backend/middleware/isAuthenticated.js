import jwt from 'jsonwebtoken'

export const isAuthenticated = async(req,res,next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Unauthorized'
            })
        }
       const decode = jwt.verify(token,process.env.JWT_SECRET)
         req.user = decode

         next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Internal server error',
            error:error.message
        })
        
    }
}