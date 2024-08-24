import mongoose, { model } from "mongoose";

const Schema = mongoose.Schema

export const categorySchema = new Schema({
    category_name: {
        type: String,
        required: "Enter category name"
    },
    wallpaper_count: {
        type: Number,
        default: 0
    },
    category_image: {
        type: String,
        default: ""
    },
    status: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
})

export const WallpaperCategory = model("WallpaperCategory",categorySchema)