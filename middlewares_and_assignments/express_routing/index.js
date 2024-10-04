const express = require("express")
const userRoute = require("./routes/user.route")
const todoRoute = require("./routes/todo.route")
require('dotenv').config()
const PORT = process.env.PORT

const app = express()
app.use(express.json())

app.get("/healtcheck",(req,res)=>{
    res.send("All good")
})

app.use("/user",userRoute)
app.use("/todo",todoRoute)


app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
})