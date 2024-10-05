const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        title:{type:String, required:true},
        brand:{type:String,enum:["Apple", "Samsung","Vivo", "OnePlus","Genric"],default:"Genric"},
        price:{type:Number, required:true},
        description:{type:String}
    },{
        versionKey:false
    }
)

const ProductModel = mongoose.model("product",ProductSchema)

module.exports = ProductModel