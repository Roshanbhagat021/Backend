const express = require("express")


const app = express()
app.use(express.json())
const PORT = 3000

app.get("/", (req, res) => {
    res.send("Welcome to the express server!")
})

app.get("/about", (req, res) => {
    res.send("This is a simple web server built using Express.js")
})

app.get("/contact", (req, res) => {
    res.json(
        {
            "email": "student@example.com",
            "phone": "123-456-7890"
        }

    )
})

app.get("/random", (req, res) => {
    const random_num = Math.floor(Math.random() * 100) + 1;
    res.send(`<h1>Random number: ${random_num}</h2>`)
})

app.get("*", (req,res)=>{
    const not_found_elemnt = `<div style ="width:100%; height:100%;  display: flex;
    justify-content: center;
    align-items: center;"><h1 style="text-align:center;">404 - Page Not Found</h1></div>`

    res.status(404).send(not_found_elemnt)
})




app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
})