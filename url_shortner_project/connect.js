const mongoose = require("mongoose")


const connectionToDb = async (url) => {
    return mongoose.connect(url)
}

module.exports = { connectionToDb }