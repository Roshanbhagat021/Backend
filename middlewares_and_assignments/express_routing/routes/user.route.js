const express = require("express")
const fs = require("fs")
const userController = require("../controllers/user.controllers")

const userRoute = express.Router()

userRoute.get("/", userController.getAllusers)
userRoute.post("/create", userController.createUser)
userRoute.delete("/delete/:id", userController.deleteUser)
userRoute.patch("/update/:id", userController.updateUser)


module.exports = userRoute