const express = require("express")
const connectToDb = require("./config/db_connection")
const userRouter = require("./routes/user.route")
const productRouter = require("./routes/product.route")

const app = express()
app.use(express.json())

const PORT = 8080

// health check route
app.get("/",(req,res)=>{
    res.send("Server check! Server check! 123")
})


app.use("/user", userRouter)
app.use("/product", productRouter)


app.listen(PORT,()=>{
    connectToDb()
    console.log(`server is running on port:${PORT}`);
})