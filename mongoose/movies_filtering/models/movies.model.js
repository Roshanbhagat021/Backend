const mongoose = require("mongoose")

const MoviesSchema = new mongoose.Schema({
    title:{type:String,required:true,unique:true},
    genra:{type:[String], required:[true,"Please specify at least one genra"]},
    director:{type:String,required:true},
    cast:{type:[String]},
    releaseDate:{type:Date},
    rating:{type:Number}

})

const MoviesModel = mongoose.model("movie",MoviesSchema)

module.exports = MoviesModel