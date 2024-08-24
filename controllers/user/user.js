import bcrypt from 'bcrypt';
import { User } from '../../models/user/user.js';

export const createUser = async (req,res) => {
    try{
        const user = req.body;
        const strongPassword = await bcrypt.hash(user?.password, 13)

        const newUser = new User({
            ...user,
            password: strongPassword
        })

       const result = await newUser.save()

        res.status(201).send({
            success: true,
            message: "Successfully Registered!",
            data: result
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

export const getAllUser = async (req,res) => {
    try{
        const users = await User.find({})
        res.status(200).send({
            success: true,
            data: users
        })
    }
    catch(error){
        console.log('Getting user error:', error.message)
        res.status(500).send({
            status: false,
            message: "Something went wrong" || error.message
        })
    }
}

export const getUser = async (req,res) => {
    try{
        const user = await User.findOne({email:req.params.email})
        if(!user) return res.status(404).send({
            success: false,
            message: "User not found!"
        })
        res.status(200).send({
            success: true,
            data: user
        })
    }
    catch(error){
        console.log('Getting single user error', error.message)
        res.status(400).send({
            success: false,
            message: "Something went wrong" || error.message
        })
    }
}

export const editUser = async (req,res) => {
    try{
        const user = req.body;
        const result = await User.findOneAndUpdate({email:req.params.email},{
            ...user,
            updated_at: Date.now()
        },{
            new: true,
            runValidators: true
        })
        if(!result) return res.status(404).send({
            success: false,
            message: "User modification failed, User not found"
        })
        res.status(200).send({
            success: true,
            message: "Successfully User Updated!",
            data: result
        })
    }
    catch(error){
        console.log('Getting error while updating', error.message)
        res.status(400).send({
            success: false,
            message: "Something went wrong" || error.message
        })
    }
}

export const deleteUser = async (req,res) => {
    try{
        const result = await User.findOneAndDelete({email:req.params.email})

        if(!result) return res.status(404).send({
            success: false,
            message: "User delete failed, User not found"
        })
        res.status(200).send({
            success: true,
            message: "Successfully User Deleted!",
        })
    }
    catch(error){
        console.log('Getting error while deleting', error.message)
        res.status(400).send({
            success: false,
            message: "Something went wrong" || error.message
        })
    }
}