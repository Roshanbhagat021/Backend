const express = require("express");

const {
  getAllmovies,
  creteNewmovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies.controllers");

const moviesRouter = express.Router();

// all movies route
moviesRouter.get("/all", getAllmovies);

// new movies creation route
moviesRouter.post("/create", creteNewmovie);

// edit or update any movie route with the help of id
moviesRouter.patch("/update/:id", updateMovie);

// delete any movie with the help of id
moviesRouter.delete("/delete/:id", deleteMovie);

module.exports = moviesRouter;
