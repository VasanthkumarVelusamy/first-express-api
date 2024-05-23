import app from './server.mjs'
import dotenv from 'dotenv'
import config from "./config/index.mjs"

dotenv.config()

app.listen(config.port, ()=>{
    console.log(`hello on http:localhost:${config.port}`)
})