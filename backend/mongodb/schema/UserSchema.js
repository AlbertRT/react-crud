import mongoose, { Schema } from "mongoose"
import { v4 as uuidv4 } from 'uuid'
import moment from "moment"

const PhoneSchema = new Schema({
    phoneId: {
        type: String,
        required: true,
        default: uuidv4()
    },
    country: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    }
})

const UserSchema = new Schema({
    userId: {
        type: String,
        default: uuidv4(),
        reqiured: true
    },
    firstName: {
        type: String,
        unique: false,
        required: false
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
        type: PhoneSchema,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    refresh_token: {
        type: String,
        default: null
    },
    isVerified: {
        type: String,
        required: true,
        default: false
    },
    created_at: {
        type: Number,
        reqiured: true,
        default: moment().unix()
    }
})

export default UserSchema