import multer from 'multer'
import fs from 'fs'
import path from 'path'

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(!fs.existsSync('public')){
            fs.mkdirSync('public')
        }
        if(!fs.existsSync('public/images')){
            fs.mkdirSync('public/images')
        }
        cb(null, 'public/images')
    },
    filename: function(req, file, cb){
        const ext = path.extname(file.originalname)
        cb(null, Date.now().toString() + ext)
    }
})

const ImageUpload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        let ext = path.extname(file.originalname)
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.webp'){
            return cb(new Error('Only images are allowed'))
        }
        cb(null, true)
    }
})

export default ImageUpload