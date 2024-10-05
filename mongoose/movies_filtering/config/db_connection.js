const mongoose = require("mongoose")
require('dotenv').config()
console.log(process.env.MONGODBURL);
const connectToDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGODBURL)
        console.log("Connected to DB");
        
    } catch (error) {
        console.log('error from db connection: ', error.message);
    }
}

module.exports = connectToDb