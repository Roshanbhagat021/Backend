const express = require("express");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const registerAndLoginRoute = express.Router();

registerAndLoginRoute.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      res.send("User already exits! Please try to login!");
      return;
    }
    const hash = bcrypt.hashSync(password, 10);
    const new_user = UserModel({ ...req.body, password: hash });
    const created_user = await new_user.save();
    console.log("new_user: ", new_user);
    res.json(created_user);
  } catch (error) {
    console.log("error: ", error.message);
    res.status(500).json(error.message);
  }
});

registerAndLoginRoute.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // checks weather user exits or not, if not then send a response with "User not found"
    const user = await UserModel.findOne({ username });
    if (!user) {
      res.send("User not Found! Please try to register first!");
      return;
    }
    // console.log("user: ", user);
    // checking for password is correct or not, if not response with incorrect password 
    const isPasswordMatched = await bcrypt.compareSync(password, user.password);
    if (!isPasswordMatched) {
      res.send("Password is incorrect");
      return;
    }

    // if user exits and password is correct then send a token 
    const token = jwt.sign({ user }, "shhhhh");
    res.json({ msg:"Login successfull", token });
  } catch (error) {
    console.log("error: ", error.message);
    res.status(500).json(error.message);
  }
});

module.exports = registerAndLoginRoute;
