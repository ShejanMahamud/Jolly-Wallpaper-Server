import mongoose from 'mongoose';
import { WallpaperCategory } from '../../models/wallpaper/category.js';

const { ObjectId } = mongoose.Types;

export const getWallpaperCategories = async (req,res) => {
    try{
        const result = await WallpaperCategory.find({})
        res.status(200).send({
            success: true,
            data: result
        })
    }
    catch(error){
        console.log('Getting wallpaper category error:', error.message)
        res.status(500).send({
            status: false,
            message: "Something went wrong" || error.message
        })
    }
}

export const getWallpaperCategoryById = async (req,res) => {
    try{
        const result = await WallpaperCategory.find({_id: new ObjectId(req.params.id)})
        if(!result) return res.status(400).send({
            success: false,
            message: "Category not found"
        })
        res.status(200).send({
            success: true,
            data: result
        })
    }
    catch(error){
        console.log('Getting wallpaper category error:', error.message)
        res.status(500).send({
            status: false,
            message: "Something went wrong" || error.message
        })
    }
}

export const createWallpaperCategory = async (req, res) => {
    try {
        const body = req.body;
        const newWallpaperCategory = new WallpaperCategory(body); 
        
        const result = await newWallpaperCategory.save();

        res.status(201).send({
            success: true,
            data: result
        });
    } catch (error) {
        console.log('Error creating wallpaper category:', error.message);
        res.status(500).send({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
};

export const editWallpaperCategory = async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id
        
        const result = await WallpaperCategory.findOneAndUpdate({_id: new ObjectId(id)},{
            ...body,
            updated_at: Date.now()
        },{
            new: true,
            runValidators: true
        });
        if(!result) return res.status(404).send({
            success: false,
            message: "category modification failed, Category not found"
        })
        res.status(200).send({
            success: true,
            message: "Successfully Category Updated!",
            data: result
        })
    } catch (error) {
        console.log('Error modification wallpaper category:', error.message);
        res.status(500).send({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
};

export const deleteWallpaperCategory = async (req, res) => {
    try {   
        const result = await WallpaperCategory.findOneAndDelete({
            _id: new ObjectId(req.params.id)
        })
        if(!result) return res.status(404).send({
            success: false,
            message: "Category delete failed, User not found"
        })
        res.status(200).send({
            success: true,
            message: "Successfully Category Deleted!",
        })
    } catch (error) {
        console.log('Error deleting wallpaper category:', error.message);
        res.status(500).send({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
};