import express from "express";
import chalk from "chalk";
import mongoose from "mongoose";
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

class OnlineStore {
    #app = express()
    #port
    db

    constructor({port}) {
        this.#port = port
    }

    start() {
        this.#app.listen(this.#port, () => console.log(chalk.bgGreen.white('Server Up & Running!!!')))
    }

    plugin(plugins) {
        const pluginsObj = Object.entries(plugins)
        this.#app.use(express.json())
        pluginsObj.map(([key, value]) => {
            this.#app.use(value)
        })
    }

    db = {
        connect: async ({uri, urlParser}) => {
            if (!uri) {
                throw new Error('URI is required to connect')
            }
            let useUrlParser
            !urlParser ? useUrlParser = true : useUrlParser = urlParser

            try {
                await mongoose.connect(uri, {useNewUrlParser: useUrlParser})
                console.log(chalk.bgGreen.white('Connection Success!'))
            } catch (error) {
                return Promise.reject(error)
            }
        },
        disconnect: async () => {
            await mongoose.disconnect()
            console.log(chalk.bgGreen.white('Successfully disconected from database!'))
        }
    }
}

export class Storage {
    #upload

    constructor() {
        this.configureFileUpload()
    }

    configureFileUpload() {
        const storage = multer.diskStorage({
           destination: (req, file, cb) => {
               cb(null, 'media');
           },
           filename: (req, file, cb) => {
               cb(null, uuidv4() + file.originalname);
           },
       });
        this.#upload = multer({ storage });
    }

    uploadSingle(fieldName) {
        return this.#upload.single(fieldName);
    }
    uploadMultiple(fieldName, maxCount) {
        return this.#upload.array(fieldName, maxCount)
    }
}

export default OnlineStore