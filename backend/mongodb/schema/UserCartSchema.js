import { Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const CartItemSchema = new Schema({
    productId: {
        type: String,
        required: true
    },
    productName: String,
    productPrice: String,
    productThumbnail: String
})

const CartSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    cartId: {
        type: String,
        required: true,
        default: uuidv4()
    },
    cartItemTotal: {
        type: Number,
        default: 0
    },
    cartItem : {
        type: [CartItemSchema],
        default: []
    },
    totalPrice: {
        type: Number,
        default: 0
    }
})

export default CartSchema