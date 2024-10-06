const mongoose = require("mongoose")
require("dotenv").config();

const connectToDB = async()=>{
   try {
    mongoose.connect(process.env.MONGODBURI)
    console.log("Connected to DB")
    } catch (error) {
    console.log('error: ', error.message);
    
   }
}

module.exports = connectToDB;