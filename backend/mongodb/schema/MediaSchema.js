import { Schema } from "mongoose"

const MediaSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    originalName: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})

export default MediaSchema