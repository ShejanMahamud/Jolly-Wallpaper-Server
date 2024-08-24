import mongoose, { model } from "mongoose"

const Schema = mongoose.Schema

export const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: "Enter email address",
        unique: true
    },
    photo: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }

})

export const User = model("User", userSchema)