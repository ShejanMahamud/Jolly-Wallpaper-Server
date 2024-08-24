import mongoose from 'mongoose';
import { WallpaperSubcategory } from '../../models/wallpaper/subcategory.js';

const { ObjectId } = mongoose.Types;

export const getWallpaperSubcategories = async (req,res) => {
    try{
        const result = await WallpaperSubcategory.find({})
        res.status(200).send({
            success: true,
            data: result
        })
    }
    catch(error){
        console.log('Getting wallpaper subcategory error:', error.message)
        res.status(500).send({
            status: false,
            message: "Something went wrong" || error.message
        })
    }
}

export const getWallpaperSubcategoryById = async (req,res) => {
    try{
        const result = await WallpaperSubcategory.find({_id: new ObjectId(req.params.id)})
        if(!result) return res.status(400).send({
            success: false,
            message: "Subcategory not found"
        })
        res.status(200).send({
            success: true,
            data: result
        })
    }
    catch(error){
        console.log('Getting wallpaper subcategory error:', error.message)
        res.status(500).send({
            status: false,
            message: "Something went wrong" || error.message
        })
    }
}

export const createWallpaperSubcategory = async (req, res) => {
    try {
        const body = req.body;
        const newWallpaperSubcategory = new WallpaperSubcategory(body); 
        
        const result = await newWallpaperSubcategory.save();

        res.status(201).send({
            success: true,
            data: result
        });
    } catch (error) {
        console.log('Error creating wallpaper subcategory:', error.message);
        res.status(500).send({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
};

export const editWallpaperSubcategory = async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id
        
        const result = await WallpaperSubcategory.findOneAndUpdate({_id: new ObjectId(id)},{
            ...body,
            updated_at: Date.now()
        },{
            new: true,
            runValidators: true
        });
        if(!result) return res.status(404).send({
            success: false,
            message: "Subcategory modification failed, Category not found"
        })
        res.status(200).send({
            success: true,
            message: "Successfully Subcategory Updated!",
            data: result
        })
    } catch (error) {
        console.log('Error modification wallpaper subcategory:', error.message);
        res.status(500).send({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
};

export const deleteWallpaperSubcategory = async (req, res) => {
    try {   
        const result = await WallpaperSubcategory.findOneAndDelete({
            _id: new ObjectId(req.params.id)
        })
        if(!result) return res.status(404).send({
            success: false,
            message: "Subcategory delete failed, User not found"
        })
        res.status(200).send({
            success: true,
            message: "Successfully Subcategory Deleted!",
        })
    } catch (error) {
        console.log('Error deleting wallpaper subcategory:', error.message);
        res.status(500).send({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
};