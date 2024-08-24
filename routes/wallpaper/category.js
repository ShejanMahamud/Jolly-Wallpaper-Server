import express from 'express'
import { createWallpaperCategory, deleteWallpaperCategory, editWallpaperCategory, getWallpaperCategories, getWallpaperCategoryById } from '../../controllers/wallpaper/category.js'

const router = express.Router()

router.route('/')
.get(getWallpaperCategories)
.post(createWallpaperCategory)

router.route("/:id")
.get(getWallpaperCategoryById)
.patch(editWallpaperCategory)
.delete(deleteWallpaperCategory)

export default router