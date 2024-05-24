import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

export const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash)
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 4)
}

export const createJWT = (user) => {
    const token = jwt.sign(
        {
            id: user.id, 
            username: user.username,
            tokenCreatedAt: new Date(),
            isValid: true,
            tokenValidity: 30
        }, 
        process.env.JWT_SECRET
    )
    return token
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization

    if (!bearer) {
        res.status(401)
        res.json({message: "not authorized"})
        return
    }

    const [, token] = bearer.split(" ")

    if (!token) {
        res.status(401)
        res.json({message: "not authorized"})
        return
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        const currentTime = new Date()
        const jwtCreatedTime = user.tokenCreatedAt
        const timeLapsed =  Math.abs(currentTime - new Date(jwtCreatedTime)) / 1000
        console.log("current time: ", currentTime)
        console.log("jwt created time: ", jwtCreatedTime)
        console.log("time lapsed: ", timeLapsed)
        if (timeLapsed < user.tokenValidity) {
            req.user = user
            next()
        } else {
            res.status(401)
            next(new Error("Token expired"))
        }
        
    } catch (e) {
        console.error(e)
        res.status(401)
        res.json({message: "not authorized"})
        return
    }
}