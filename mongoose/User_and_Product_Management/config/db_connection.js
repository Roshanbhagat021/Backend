const mongoose = require("mongoose")

const connectToDb = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/user_product_db")
        console.log("Connected to DB");

    } catch (error) {
        console.log('error: ', error.message);

    }
}

module.exports = connectToDb