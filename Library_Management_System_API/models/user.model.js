const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{type:String,unique:true, required:true},
    password:{type:String, required:true},
    role:{String, enum:["Admin","Member"], default:"Member"},
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    borrowedBook:{type:mongoose.Schema.Types.ObjectId, ref:"book"}
})

const UserModel = mongoose.model('user',UserSchema)

module.exports = UserModel;



// Just for reference 

// username (String, unique, required)
// password (String, required)
// role (String, enum: ['Admin', 'Member'], default: 'Member')
// name (String, required)
// email (String, required, unique)
// borrowedBooks (Array of Book references)