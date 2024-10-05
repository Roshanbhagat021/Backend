const express = require("express")
const connectToDb = require("./config/db_connection")
const moviesRouter = require("./routes/movie.route")
const rateLimit = require("express-rate-limit")
require('dotenv').config()
const app = express()
app.use(express.json())

// rate limit 
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    handler: (req, res) => {
        res.status(429).json({
            message: "Too many requests. Please try again after 15 minutes.",
        });
    },
});

const port = process.env.PORT

app.get("/", limiter,(req, res)=>{
    res.send("All GOOD")
})

app.use("/movie",moviesRouter)

app.listen(port, ()=>{
    connectToDb()
    console.log(`server is running on port:${port}`);
})