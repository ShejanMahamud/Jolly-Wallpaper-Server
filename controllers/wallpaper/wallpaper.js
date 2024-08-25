import mongoose from "mongoose";
import { Wallpaper } from "../../models/wallpaper/wallpaper.js";

const {ObjectId} = mongoose.Types

export const createWallpaper = async (req,res) => {
    try{
        const wallpaper_body = req.body;

        const newWallpaper = new Wallpaper(wallpaper_body)

        const result = await newWallpaper.save()

        res.status(201).send({
            success: true,
            data: result
        });
    }
    catch(error){
        console.log('Error creating wallpaper:', error.message);
        res.status(500).send({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
}

export const getWallpapers = async (req,res) => {
    try{
        const result = await Wallpaper.find({})

        if(!result) return res.status(404).send({
            success: false,
            message: "Wallpaper not found!"
        })
        res.status(200).send({
            success: true,
            data: result
        })
    }
    catch(error){
        console.log('Error getting wallpaper:', error.message);
        res.status(500).send({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
}

export const getWallpaperById = async (req,res) => {
    try{
        const id = req.params.id
        const result = await Wallpaper.find({_id: new ObjectId(id)})

        if(!result) return res.status(404).send({
            success: false,
            message: "Wallpaper not found!"
        })
        res.status(200).send({
            success: true,
            data: result
        })
    }
    catch(error){
        console.log('Error getting wallpaper:', error.message);
        res.status(500).send({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
}

export const editWallpaper = async (req,res) => {
    try{
        const id = req.params.id
        const body = req.body;

        const result = await Wallpaper.findOneAndUpdate({
            _id: new ObjectId(id)
        },{
            ...body,
            updated_at: Date.now()
        },{
            new: true,
            runValidators: true
        })
        if(!result) return res.status(404).send({
            success: false,
            message: "Wallpaper modification failed, Wallpaper not found"
        })
        res.status(200).send({
            success: true,
            message: "Successfully Wallpaper Updated!",
            data: result
        })
    }
    catch(error){
        console.log('Error editing wallpaper:', error.message);
        res.status(500).send({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
}

export const deleteWallpaper = async (req,res) => {
    try{
        const id = req.params.id
        const result = await Wallpaper.findOneAndDelete({
            _id: new ObjectId(id)
        })

        if(!result) return res.status(404).send({
            success: false,
            message: "Wallpaper delete failed, Wallpaper not found"
        })
        res.status(200).send({
            success: true,
            message: "Successfully Wallpaper Deleted!",
        })
    }
    catch(error){
        console.log('Error deleting wallpaper:', error.message);
        res.status(500).send({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
}