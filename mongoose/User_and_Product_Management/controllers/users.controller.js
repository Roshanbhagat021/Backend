const UserModel = require("../models/user.model");


const getAllUsers = async (req, res) => {
    try {
      const allUsers = await UserModel.find();
      console.log(allUsers);
      res.json(allUsers);
    } catch (error) {
      console.log("error: ", error.message);
      res.status(500).send({ err: error.message });
    }
  }


  const crateNewUser = async (req, res) => {
    const user_details = req.body;
    try {
      // Two ways to save a new document into the db
  
      // .save() method
      // const new_user = new UserModel(user_details)
      // const savedUser = await new_user.save()
      // res.status(201).json(savedUser)
  
      // create method
      const new_user = await UserModel.create(user_details);
      res.status(201).json(new_user);
    } catch (error) {
      console.log("error: ", error.message);
      res.status(500).json({ err: error.message });
    }
  }


  const updateUser =  async (req, res) => {
    // const updatedDetail = req.body;
    const { id } = req.params;
    console.log("id: ", id);
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      console.log(updatedUser);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log("error: ", error.message);
      res.status(500).json({ err: error.message });
    }
  }


  const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      await UserModel.findByIdAndDelete(id);
      res.send({ message: "user deleted successfully" });
    } catch (error) {
      console.log("error: ", error.message);
      res.status(500).json({ err: error.message });
    }
  }
  

  module.exports ={getAllUsers, crateNewUser, updateUser, deleteUser}