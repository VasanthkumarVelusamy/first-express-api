import { validationResult } from "express-validator"

export const handleInputErrors = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400)
        res.json({errors: errors.array()})
    } else {
        next()
    }
}

export const handleErrors = (err, req, res, next) => {
    console.log("I'm inside error handler", err)
    if (err) {
        res.json({message: `some error occurred - ${err}`})
    } else {
        next()
    }
}