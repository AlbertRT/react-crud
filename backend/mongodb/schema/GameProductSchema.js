import { Schema } from "mongoose"
import { v4 as uuidv4 } from 'uuid'
import moment from "moment"

const gameEdition = new Schema({
    id: {
        type: String,
        default: uuidv4(),
        required: true
    },
    edition_name: String,
    price: {
        type: Number,
        trim: true,
        required: true
    }
})

const thumbSchema = new Schema({
    id: String,
        url: String
})

const SpecSchema = new Schema({
    minimum: {
        os: { type: String, required: true },
        cpu: { type: String, required: true },
        memory: { type: String, required: true },
        gpu: { type: String, required: true },
        directX: { type: String },
        storage: { type: String }
    },
    recommended: {
        os: { type: String, required: true },
        cpu: { type: String, required: true },
        memory: { type: String, required: true },
        gpu: { type: String, required: true },
        directX: { type: String },
        storage: { type: String }
    }
});

const AditionalSchema = new Schema({
    type: String,
    list: Array
})
const LanguageSchema = new Schema({
    type: String,
    list: Array
})

const GameProductSchema = new Schema({
    id: {
        type: String,
        required: true,
        default: uuidv4()
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    thumbnail: thumbSchema,
    description: String,
    isSale: Boolean,
    developer: String,
    publisher: String,
    release_date: String,
    platform: [
        {
            name: {
                type: String,
                required: true
            },
        }
    ],
    isHaveEdition: Boolean,
    edition: [gameEdition],
    specification: SpecSchema,
    aditional: AditionalSchema,
    language: [LanguageSchema],
    copyright: String,
    date_added: {
        type: String,
        default: moment().unix()
    }
})

export default GameProductSchema
