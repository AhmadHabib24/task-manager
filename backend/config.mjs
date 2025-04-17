import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
const env = process.env

const ENV = {
    port:env.PORT,
    database: env.DATABASE_URL,
    jwt_secret: env.JWT_SECRET
}

export default ENV
