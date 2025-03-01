const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

module.exports = async() =>{
    try {
       await mongoose.connect(process.env.MONGO_URL)
       console.log("DB connection successfully")
    } catch (error) {
        console.log("error in DB connection")
    }
}