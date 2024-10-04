const express = require("express")
const morgan = require('morgan')
const fs = require("fs")
const path = require("path")
const userRoute = require("./routes/user.route")

const todoRoute = require("./routes/todo.route")
require('dotenv').config()
const PORT = process.env.PORT

const app = express()
app.use(express.json())

// we can this from lots of it
// morgan.token("logger",(req,res)=>{
//      return req.hostname
// })

morgan.token("date", (req, res) => {
    const indianTime = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata"
    })

    return indianTime
})

app.use(morgan(":method :status :res[content-length] :date[web] :date"))

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan(":method :status :res[content-length] :date[web] :date :http-version :url", { stream: accessLogStream }))

app.get("/healtcheck", (req, res) => {
    res.send("All good")
})

app.use("/user", userRoute)
app.use("/todo", todoRoute)


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})