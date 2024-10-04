const express = require("express")
const fs = require("fs")

const todoController = require("../controllers/todo.controllers")

const todoRoute = express.Router()

todoRoute.get("/", todoController.getAlltodos)
todoRoute.post("/create", todoController.createTodo)
todoRoute.delete("/delete/:id", todoController.deleteTodo)
todoRoute.patch("/update/:id", todoController.updateTodo)


module.exports = todoRoute