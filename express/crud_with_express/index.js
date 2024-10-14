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
        const all_todos = jsondata["todos"]
        const todo_id = all_todos[all_todos.length - 1].id
        newTodo_with_id = { ...newTodo, id: todo_id + 1 }

        jsondata.todos.push(newTodo_with_id)

        fs.writeFile("db.json", JSON.stringify(jsondata, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error writing file");
            }
            res.status(201).send("Todo created successfully")
        })
    })
// this is my first website

})

app.patch("/evenUpdate", async (req, res) => {
    try {
        fs.readFile("db.json", "utf-8", (err, data) => {
            if (err) {
                res.status(500).send("Error while finding all todos.")
                return
            }
            const jsondata = JSON.parse(data)
            const all_todos =jsondata["todos"]
            all_todos.map((currentval, i, array) => {
                if (currentval.id % 2 == 0) {
                    currentval.iscompleted = true
                }
            })
            jsondata["todos"]= all_todos
            fs.writeFile("db.json", JSON.stringify(jsondata, null, 2), (err) => {
                if (err) {
                    res.send("Error while updating the even todos")
                }

            })
        })
        res.send("all the todos with even ids are updated ")
    } catch (error) {
        console.log('error: ', error);
        res.send(error.message)

    }
})

app.delete("/deleteCompleted",async(req,res)=>{
    fs.readFile("db.json","utf-8",(err, data)=>{
        if (err){
            res.status(500).send("Error while reading files")
            return
        }
        const jsondata = JSON.parse(data)
        const all_todos = jsondata["todos"]


        
        all_todos.map((ele, i)=>{
            if(ele.iscompleted == true){
                all_todos.splice(i,1)
            }
        })

        jsondata["todos"] = all_todos
        fs.writeFile("db.json",JSON.stringify(jsondata),(err)=>{
            if (err){
                 res.status(500).send("Error while updating the todos ")
                 return
            }
            res.send("Deleted all the completed tasks!")
        })

    })
})


app.listen(PORT, () => {
    console.log(`Sever is running on http://localhost:${PORT}`);
})