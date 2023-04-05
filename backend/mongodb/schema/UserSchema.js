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
const Profile_Photo = new Schema({
    id: {
        type: String,
        required: true,
        default: uuidv4()
    },
    url: String
})
const UserBackground = new Schema({
    id: {
        type: String,
        required: true,
        default: uuidv4()
    },
    url: String
})

const UserSchema = new Schema({
    userId: {
        type: String,
        reqiured: true
    },
    firstName: {
        type: String,
        unique: false,
        required: false,
        default: null
    },
    username: {
        type: String,
        unique: true
    },
    lastName: {
        type: String,
        unique: false,
        required: false,
        default: null
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
    created_at: {
        type: Number,
        reqiured: true,
        default: moment().unix()
    },
    profile_photo: {
        type: Profile_Photo,
        default: {}
    },
    description: {
        type: String,
        default: null
    },
    background: {
        type: UserBackground,
        default: {}
    }
})

export default UserSchema