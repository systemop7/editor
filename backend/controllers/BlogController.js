import fs from 'fs'
import https from 'https'
import Blog from './../models/Blog.js'


export const getAllBlog = async (req, res, next) => {
    try {
        const blogs = await Blog.find()
        return res.status(200).json(blogs)
    } catch (error) {
        next(error)
    }
}

export const uploadSinglePhoto = async (req, res, next) => {
    try {
       const ImageURL = `http://localhost:${process.env.PORT}/images/${req.file.filename}`
        res.status(200).json({
            success: 1,
            file: {
                url: ImageURL
            }
        })
    } catch (error) {
        next(error)
    }
}

export const createByURL = async (req, res, next) => {
    try {
        const { url } = req.body;
        const name = Date.now().toString()
        const imagePath = `public/urls/${name}.jpg`;
        const file = fs.createWriteStream(`./${imagePath}`);
        https.get(url, (response) => {
            response.pipe(file);
            file.on("finish", () => {
                file.close()
                res.status(200).json({
                    success: 1,
                    file: {
                        url: `http://localhost:5050/urls/${name}.jpg`
                    }
                })
            })
        })
    } catch (error) {
        next(error)
    }
}

export const createNewBlog = async (req, res, next) => {
    const { title, body } = req.body;
    try {
        const blog = await Blog.create({
            title, body
        })
        return res.status(200).json({
            data: blog
        })
    } catch (error) {
        next(error)
    }
}

export const showSingleBlog = async (req, res, next) => {
    const {id } = req.params
    try {
        const post = await Blog.findById(id)
        return res.status(200).json(post)
    } catch (error) {
        next(error)
    }
}