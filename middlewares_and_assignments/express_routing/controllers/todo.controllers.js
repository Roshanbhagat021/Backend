const fs = require("fs")
const todoDb_path = "./dbs/todo_db.json"

const readfile_from_dbs = (path) => {
    try {
        const jsonData = fs.readFileSync(path, "utf-8")
        return jsonData;
    } catch (error) {
        throw new Error(`Error while reading file at ${path}`)
    }
}


const getAlltodos = (req, res) => {
    try {
        const todo_data = readfile_from_dbs(todoDb_path)
        const parsedData = JSON.parse(todo_data)
        res.json(parsedData)
    } catch (error) {
        res.status(500).send(error.message)

    }
}



const createTodo = (req, res) => {
    const new_todo = req.body
    try {
        const todo_data = readfile_from_dbs(todoDb_path)
        const parsedData = JSON.parse(todo_data)
        parsedData.todos.push(new_todo)
        const jsonData = JSON.stringify(parsedData, null, 2)
        fs.writeFile(todoDb_path, jsonData, (err) => {
            if (err) {
                res.status(500).send("Error while creating new todo")
                return
            }
            res.status(201).send("New todo created")
        })

    } catch (error) {
        // console.error(error.message)
        res.status(500).send(error.message)

    }
}


const deleteTodo = (req, res) => {
    const { id } = req.params
    try {
        const todo_data = readfile_from_dbs(todoDb_path)
        const parsedData = JSON.parse(todo_data)
        const all_todos = parsedData["todos"]

        let has_todo_with_id = false
        all_todos.map((c, i) => {
            if (c.id == id) {
                all_todos.splice(i, 1)
                has_todo_with_id = true
            }
        })

        if (!has_todo_with_id) {
            res.status(404).send({ err: "todo not found" })
            return
        }

        fs.writeFile(todoDb_path, JSON.stringify(parsedData, null, 2), (err) => {
            if (err) {
                res.status(500).send("Error while deleting new todo")
                return
            }

        })


        res.status(200).send("Todo deleted successfully")


    } catch (error) {
        res.status(500).send({ err: error.message })
    }

}

const updateTodo = (req, res) => {
    const { id } = req.params
    const update_data = req.body
    try {
        const todo_data = readfile_from_dbs(todoDb_path)
        const parsedData = JSON.parse(todo_data)
        const all_todos = parsedData["todos"]

        let has_todo_with_id = false
        all_todos.map((c, i) => {
            if (c.id == id) {
                all_todos[i] = { ...all_todos[i], ...req.body }
                has_todo_with_id = true
            }
        })
        if (!has_todo_with_id) {
            res.status(404).send({ err: "todo not found" })
            return
        }
        fs.writeFile(todoDb_path, JSON.stringify(parsedData, null, 2), (err) => {
            if (err) {
                res.status(500).send("Error while updating todo")
                return
            }
        })
        res.status(200).send("Todo updated successfully")
    } catch (error) {
        res.status(500).send({ err: error.message })
    }

}

module.exports = { getAlltodos, createTodo, deleteTodo, updateTodo }