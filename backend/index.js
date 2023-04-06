import cors from 'cors'
import router from './Routes/routes.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import OnlineStore from "./OnlineStore.js";

dotenv.config()

const MyStore = new OnlineStore({port: 5000})
MyStore.start()
MyStore.plugin({
    cors: cors({
        credentials: true,
        origin: 'http://localhost:5173'
    }),
    cookieParser: cookieParser(),
    router: router
})
MyStore.db.connect({ uri: process.env.MongoDBURL })