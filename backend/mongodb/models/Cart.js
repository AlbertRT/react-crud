import UserCartSchema from '../schema/UserCartSchema.js'
import mongoose from 'mongoose'

const Cart = mongoose.model("Cart", UserCartSchema)

export default Cart