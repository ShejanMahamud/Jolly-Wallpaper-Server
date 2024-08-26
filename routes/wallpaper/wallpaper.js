import express from 'express';
import { createWallpaper, deleteWallpaper, editWallpaper, getWallpaperById, getWallpapers } from '../../controllers/wallpaper/wallpaper.js';
import { verifyToken } from './../../middlewares/verify.js';

const router = express.Router()

router.route('/',verifyToken)
.get(getWallpapers)
.post(createWallpaper)

router.route('/:id')
.get(getWallpaperById)
.patch(editWallpaper)
.delete(deleteWallpaper)

export default router