const express = require("express")
require('dotenv').config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT //accessing the port from the .env file

const moviesRouter = require("./routes/movies.route")

// health check route
app.get("/", (req, res) => {
    res.send("All good")
})

// movies route
app.use("/movies", moviesRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})