import mongoose, { model } from "mongoose";

const Schema = mongoose.Schema

export const wallpaperSubcategory = new Schema({
    subcategory_name: {
        type: String,
        required: "Enter subcategory name"
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'WallpaperCategory',
        required: "Enter category"
    },
    subcategory_image: {
        type: String,
        default: ""
    },
    wallpaper_count: {
        type: Number,
        default: 0
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

export const WallpaperSubcategory = model("WallpaperSubcategory", wallpaperSubcategory)