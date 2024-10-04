const data_validator_middleware = (req, res, next) => {
    const { ID, Name, Rating, Description, Genre, Cast } = req.body
    const Errors = []

    if (typeof ID != "number") {
        Errors.push(`Invalid Data type for 'ID': expected a Number`)
    }

    if (typeof Name != "string") {
        Errors.push(`Invalid Data type for 'Name': expected a String`)
    }

    if (typeof Rating != "number") {
        Errors.push(`Invalid Data type for 'Rating': expected a Number`)
    }

    if (typeof Description != "string") {
        Errors.push(`Invalid Data type for 'Description': expected a String`)
    }

    if (typeof Genre != "string") {
        Errors.push(`Invalid Data type for 'ID': expected a String`)
    }

    if (typeof Cast == "object") {
        Cast.map((e, i) => {
            if (typeof e != "string") {
                Errors.push("Invalid Data type for 'cast': expected a String")
                return
            }
        })

    } else {
        Errors.push(`Invalid Data type for 'Cast': expected a array`)
    }

    if (Errors.length > 0) {
        res.status(400).json({
            msg: "bad request. some data is incorrect.",
            Errors
        })
    }else{
        next()
    }
}


module.exports = {data_validator_middleware}