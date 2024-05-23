import merge from 'lodash.merge'
import prod from './prod.mjs'
import local from './local.mjs'
import testing from './testing.mjs'

process.env.NODE_ENV = process.env.NODE_ENV || "development"

const stage = process.env.STAGE || "local"

let envConfig

if (stage === "production") {
    envConfig = prod
} else if (stage === "testing") {
    envConfig = testing
} else {
    envConfig = local
}

export default merge({
    stage,
    env: process.env.NODE_ENV,
    port: 3001,
    secrets: {
        jwt: process.env.JWT_SECRET,
        dbUrl: process.env.DATABASE_URL
    }
}, envConfig)