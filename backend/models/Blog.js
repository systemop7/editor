import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: Object
    }
},{
    timestamps: true,
    versionKey: false
})

const Blog = mongoose.model('Blog', blogSchema)
export default Blog