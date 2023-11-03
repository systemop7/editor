import mongoose from "mongoose";

const connectToDB = () => {
    mongoose.connect(process.env.MONGODB_URI)

    mongoose.connection.on('connected', () => {
        console.log('Database successfully connected!')
    })
    mongoose.connection.on('error', (err) => {
        console.log(err)
    })
}

export default connectToDB