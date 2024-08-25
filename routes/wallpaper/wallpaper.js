import express from 'express'
import { createWallpaper, deleteWallpaper, editWallpaper, getWallpaperById, getWallpapers } from '../../controllers/wallpaper/wallpaper.js'

const router = express.Router()

router.route('/')
.get(getWallpapers)
.post(createWallpaper)

router.route('/:id')
.get(getWallpaperById)
.patch(editWallpaper)
.delete(deleteWallpaper)

export default router