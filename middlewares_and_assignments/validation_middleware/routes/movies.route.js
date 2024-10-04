const express = require("express")
const moviesRouter = express.Router()

const {data_validator_middleware} = require("../middlewares/validator.middleware")
const { createMovies } = require("../controllers/movies.controllers")

moviesRouter.get("/", (req, res) => {
    res.send("All good")
})

moviesRouter.post("/create", data_validator_middleware,createMovies)

module.exports = moviesRouter