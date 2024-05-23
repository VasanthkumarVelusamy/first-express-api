import express from 'express'
import path from 'node:path'
import router from './router.mjs'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth.mjs'
import { createNewUser, signInUser } from './handlers/user.mjs'
import bodyParser from 'body-parser'
import { handleErrors } from './modules/middleware.mjs'

const app = express()

app.use(cors())
app.use(morgan('dev')) // just an example of middleware. this just logs every request.
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)=> {
    console.log("hello from express")
    res.status(200)
    // res.json({message: "hello"})
    res.sendFile(path.resolve("pages/index.html"));
})

app.use('/api', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signInUser)
app.use(handleErrors)

export default app