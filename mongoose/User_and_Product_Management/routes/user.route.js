const express = require("express");
const userController = require("../controllers/users.controller");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("From user route.");
});

userRouter.get("/allusers", userController.getAllUsers);
userRouter.post("/create", userController.crateNewUser);
userRouter.patch("/updateUser/:id", userController.updateUser);
userRouter.delete("/deleteUser/:id", userController.deleteUser);

module.exports = userRouter;
