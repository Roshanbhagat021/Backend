const express = require("express")
const fs = require("fs")


const app = express()
app.use(express.json())
const PORT = 3600


app.get("/alltodos", async (req, res) => {
    fs.readFile("db.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("Error while finding all todos.")
            return
        }
        const Data = JSON.parse(data)
        res.status(200).send(Data["todos"])
    })

})

app.post("/createtodo", async (req, res) => {
    const newTodo = req.body
    fs.readFile("db.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("Error while finding all todos.")
            return
        }
        const jsondata = JSON.parse(data)
        
        jsondata.todos.push(newTodo)
        
        fs.writeFile("db.json", JSON.stringify(jsondata,null, 2),(err)=>{
            if(err){
                return res.status(500).send("Error writing file");
            }
            res.status(201).send("Todo created successfully")
        })
    })


})


app.listen(PORT, () => {
    console.log(`Sever is running on http://localhost:${PORT}`);
})