import mongoose from "mongoose"
import WishlistSchema from "../schema/UserWishListSchema"

const Wishses = mongoose.model('wishses', WishlistSchema)

export default Wishses