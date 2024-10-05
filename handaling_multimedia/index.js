const express = require("express")
const PORT = 8956
const app = express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("all good")
})

app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`);
})