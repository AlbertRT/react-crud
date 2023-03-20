import { Schema } from "mongoose"
import { v4 as uuidv4 } from 'uuid'

const WishesSchema = new Schema({
    productId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true,
    },
    productCover: String
})

const WishlistSchema = new Schema({
    id: {
        type: String,
        required: true,
        default: uuidv4()
    },
    userId: {
        type: String,
        required: true,
        default: uuidv4()
    },
    wishes: {
        type: [WishesSchema],
        default: []
    }
})

export default WishlistSchema