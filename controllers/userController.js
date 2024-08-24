import bcrypt from 'bcrypt';
import { User } from '../models/user.js';

export const createUser = async (req,res) => {
    try{
        const user = req.body;
        const strongPassword = await bcrypt.hash(user?.password, 13)

        const newUser = new User({
            ...user,
            password: strongPassword
        })

       const res = await newUser.save()

        res.send({
            success: true,
            message: "Successfully Registered!",
            data: res
        })
    }
    catch(error){
        if(error.code === 11000){
            return res.status(400).send({
                success: false,
                message: 'Registration Failed! Email Already Exists!'
            })
        }else{
            return res.status(500).send({
                success: false,
                message: error.message || 'Registration Error'
            })
        }
        console.log(`This error happened during registration: ${error.message}`)
    }
}