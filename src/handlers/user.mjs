import prisma from '../db.mjs'
import { comparePassword, createJWT, hashPassword } from '../modules/auth.mjs'

export const createNewUser = async (req, res, next) => {
    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password)
            }
        })
        const token = createJWT(user)
        res.json({token})
    } catch (e) {
        next(e)
    }
}

export const signInUser = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: req.body.username
            }
        })

        console.log("logging in user", user)

        const isValid = await comparePassword(req.body.password, user.password)

        if (!isValid) {
            res.status(401)
            res.json("nope")
            return 
        }

        const token = createJWT(user)
        res.json({token})
    } catch (e) {
        next(e)
    }
}