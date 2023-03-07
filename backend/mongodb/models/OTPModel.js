import mongoose from "mongoose"
import OTPSchema from "../schema/OTPSchema"

const otp = mongoose.model('otp', OTPSchema)

export default otp