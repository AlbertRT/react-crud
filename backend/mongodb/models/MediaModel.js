import mongoose from "mongoose"
import MediaSchema from '../schema/MediaSchema.js'

const Media = mongoose.model('media', MediaSchema)

export default Media