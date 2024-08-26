import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config()

export const verifyToken = async (req,res,next) => {
    try{
        if(!req.headers.authorization){
            return res.status(401).send({
                success: false,
                message: "Forbidden Access!"
            })
        }
        const token = req.headers?.authorization?.split(" ")[1]
        jwt.verify(token,process.env.ACCESS_TOKEN, (error,decoded) => {
            if(error){
                return res.status(403).send({
                    success: false,
                    message: "Unauthorized Access!"
                })
            }
            req.user = decoded
            next()
        })
    }
    catch(error){
        console.log('Something went wrong!')
    }
}