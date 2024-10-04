const createMovies =  (req, res) => {
    try {
        res.send("data recieved")

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ err: error.message })
    }
}


module.exports = {createMovies}