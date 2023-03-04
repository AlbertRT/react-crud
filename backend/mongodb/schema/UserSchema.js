import { Schema } from "mongoose"
import { v4 as uuidv4 } from 'uuid'
import moment from "moment"

const UserSchema = new Schema({
    userId: {
        type: String,
        default: uuidv4(),
        reqiured: true
    },
    firstName: {
        type: String,
        unique: false,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    lastName: {
        type: String,
        unique: false,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    friends: {
        type: Array
    },
    refresh_token: {
        type: String,
        default: null
    },
    created_at: {
        type: String,
        reqiured: true,
        default: moment().unix()
    }
})

export default UserSchema