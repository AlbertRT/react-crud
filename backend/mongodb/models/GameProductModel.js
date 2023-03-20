import mongoose from 'mongoose'
import GameProductSchema from '../schema/GameProductSchema.js'

const Games = mongoose.model('Game', GameProductSchema)

export default Games