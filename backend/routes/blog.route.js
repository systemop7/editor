import express from 'express'
import { createByURL, getAllBlog, uploadSinglePhoto, createNewBlog, showSingleBlog } from '../controllers/BlogController.js'
import ImageUpload from '../utils/multer.js'
const router = express.Router()

router.get('/', getAllBlog)
router.post('/upload-single', ImageUpload.single('photo'), uploadSinglePhoto)
router.post('/createByURL',createByURL)
router.post('/create', createNewBlog)
router.get('/view/:id', showSingleBlog)


export default router