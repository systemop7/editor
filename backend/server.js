import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import connectToDB from './config/db.js'
import blogRoute from './routes/blog.route.js'
dotenv.config()


const app = express()
const PORT = process.env.PORT || 5050;
const __dirname = dirname(fileURLToPath(import.meta.url))


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))


const whiteList = ['http://localhost:5173']

const corsOptions = function(req, callBack){
    let options;

    if(whiteList.indexOf(req.header('Origin') !== -1)){
        options = { origin: true}
    }else{
        options = { origin : false }
    }
    callBack(null, options)
}

app.use(cors(corsOptions))

app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: "Successfully Getting Response"
    })
})

app.use('/api/v1/blog', blogRoute)


app.listen(PORT, () => {
    connectToDB()
    console.log(`Server running on port ${PORT}`)
})