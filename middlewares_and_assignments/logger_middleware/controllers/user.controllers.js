const fs = require("fs")
const userDb_path = "./dbs/user_db.json"

const readfile_from_dbs = (path) => {
    try {
        const jsonData = fs.readFileSync(path, "utf-8")
        return jsonData;
    } catch (error) {
        throw new Error(`Error while reading file at ${path}`)
    }
}


const getAllusers = (req, res) => {
    try {
        const user_data = readfile_from_dbs(userDb_path)
        const parsedData = JSON.parse(user_data)
        res.json(parsedData)
    } catch (error) {
        // console.error(error.message)
        res.status(500).send(error.message)

    }
}



const createUser = (req, res) => {
    const new_user = req.body
    try {
        const user_data = readfile_from_dbs(userDb_path)
        const parsedData = JSON.parse(user_data)
        parsedData.users.push(new_user)
        const jsonData = JSON.stringify(parsedData, null, 2)
        fs.writeFile(userDb_path, jsonData, (err) => {
            if (err) {
                res.status(500).send("Error while creating new user")
                return
            }
            res.status(201).send("New user created")
        })

    } catch (error) {
        // console.error(error.message)
        res.status(500).send(error.message)

    }
}


const deleteUser = (req, res) => {
    const { id } = req.params
    try {
        const user_data = readfile_from_dbs(userDb_path)
        const parsedData = JSON.parse(user_data)
        const all_users = parsedData["users"]

        let has_user_with_id = false
        all_users.map((c, i) => {
            if (c.id == id) {
                all_users.splice(i, 1)
                has_user_with_id = true
            }
        })

        if (!has_user_with_id) {
            res.status(404).send({ err: "user not found" })
            return
        }

        fs.writeFile(userDb_path, JSON.stringify(parsedData, null, 2), (err) => {
            if (err) {
                res.status(500).send("Error while creating new user")
                return
            }

        })


        res.status(200).send("User deleted successfully")


    } catch (error) {
        res.status(500).send({ err: error.message })
    }

}

const updateUser = (req, res) => {
    const { id } = req.params
    const update_data = req.body
    try {
        const user_data = readfile_from_dbs(userDb_path)
        const parsedData = JSON.parse(user_data)
        const all_users = parsedData["users"]

        let has_user_with_id = false
        all_users.map((c, i) => {
            if (c.id == id) {
                all_users[i] = { ...all_users[i], ...req.body }
                has_user_with_id = true
            }
        })
        if (!has_user_with_id) {
            res.status(404).send({ err: "user not found" })
            return
        }
        fs.writeFile(userDb_path, JSON.stringify(parsedData, null, 2), (err) => {
            if (err) {
                res.status(500).send("Error while updateing the user")
                return
            }
        })
        res.status(200).send("User updated successfully")
    } catch (error) {
        res.status(500).send({ err: error.message })
    }

}

module.exports = { getAllusers, createUser, deleteUser, updateUser }