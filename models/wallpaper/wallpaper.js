import mongoose, { model } from "mongoose";

const Schema = mongoose.Schema

export const wallpaperSchema = new Schema({
    title: {
        type: String,
        required: "Enter wallpaper title"
    },
    wallpaper_url: {
        type: String,
        required: "Enter wallpaper url"
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "WallpaperCategory",
        required: "Enter wallpaper category"
    },
    subcategory: {
        type: Schema.Types.ObjectId,
        ref: "WallpaperSubcategory",
        required: "Enter wallpaper subcategory"
    },
    tags: {
        type: [String]
    },
    status: {
        type: Boolean,
        default: false
    },
    downloads: {
        type: Number,
        default: 0,
    },
    views: {
        type: Number,
        default: 0
    },
    featured: {
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

export const Wallpaper = model("Wallpaper", wallpaperSchema)