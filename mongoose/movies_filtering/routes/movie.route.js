const express = require("express");
const MoviesModel = require("../models/movies.model");

const moviesRouter = express.Router();

moviesRouter.get("/all",async (req, res) => {

    try {
        const movies_list = await MoviesModel.find({})
        res.send(movies_list)
    } catch (error) {
        console.log('error: ', error.message);
        res.status(500).json({err:error.message})
    }
   
});

moviesRouter.post("/create", async (req, res) => {
  try {
    const new_movie = new MoviesModel(req.body);
    const saved_movie = await new_movie.save();
    console.log(saved_movie);
    res.status(201).json(saved_movie)
  } catch (error) {
    console.log("error: ", error.message);
    res.status(500).json({err:error.message})
  }
});

moviesRouter.patch("/update/:id", async(req,res)=>{
    const {id} = req.params
    try {
        const updated_movie = await MoviesModel.findByIdAndUpdate(id, req.body, {new:true})
        console.log('update_movie: ', updated_movie);
        res.status(200).send(updated_movie)
    } catch (error) {
        console.log('error: ', error.message);
        res.status(500).json({err:error.message})
        
    }
})

moviesRouter.delete("/delete/:id", async(req,res)=>{
    const {id} = req.params
    try {
       await MoviesModel.findByIdAndDelete(id)
        
        res.status(200).send({msg:`movie with id ${id} deleted`})
    } catch (error) {
        console.log('error: ', error.message);
        res.status(500).json({err:error.message})
        
    }
})

module.exports = moviesRouter;
