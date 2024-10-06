const express = require("express");
const UserModel = require("../models/user.model");

const userRouter = express.Router()

userRouter.get("/users",async(req,res)=>{
    try {
        const allUser = await UserModel.find()
        res.send(allUser)
        
    } catch (error) {
        console.log('error: ', error.message);
        res.status(500).json(error.message)
        
    }
})

userRouter.post("/allusers",async(req,res)=>{
    try {
        const allUser = await UserModel.find()
        res.send(allUser)
        
    } catch (error) {
        console.log('error: ', error.message);
        res.status(500).json(error.message)
        
    }
})





module.exports = userRouter;