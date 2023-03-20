import express from 'express'
import cors from 'cors'
import connection from './mongodb/config/connection.js'
import router from './routes/routes.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

connection()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(cookieParser())
app.use(express.json())
app.use(router)

app.listen(5000, () => console.log('server listen on 5000'))