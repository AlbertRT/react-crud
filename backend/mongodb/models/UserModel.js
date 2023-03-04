import mongoose from 'mongoose'
import UserSchema from '../schema/UserSchema.js'

const User = mongoose.model('user', UserSchema)

export default User