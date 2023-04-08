import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config();

var mongoURL = process.env.MONGO_URL

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })

var connection = mongoose.connection

connection.on('error', () => {
    console.log('Mongodb connection failed')
})

connection.on('connected', () => {
    console.log('successfully connected to mongodb')
})

export default mongoose;
