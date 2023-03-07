import mongoose from "mongoose"

const OTPSchema = new mongoose.Schema({
    userId: String,
    otp: String,
    createdAt: Date,
    expired: Date
})

export default OTPSchema