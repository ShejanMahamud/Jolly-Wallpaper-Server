import express from 'express'
import { createWallpaperSubcategory, deleteWallpaperSubcategory, editWallpaperSubcategory, getWallpaperSubcategories, getWallpaperSubcategoryById } from '../../controllers/wallpaper/subcategory.js'

const router = express.Router()

router.route('/')
.get(getWallpaperSubcategories)
.post(createWallpaperSubcategory)

router.route("/:id")
.get(getWallpaperSubcategoryById)
.patch(editWallpaperSubcategory)
.delete(deleteWallpaperSubcategory)

export default router