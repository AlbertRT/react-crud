import Wishses from "../mongodb/models/WishlistMode.js"
import Games from "../mongodb/models/GameProductModel.js"

export async function getWishlistByUserId (req, res) {
    const userId = req.params

    try {
        
        const data = await Wishses.findOne({ userId })

        return res.status(200).json({
            code: 200,
            status: 'ok',
            data
        })

    } catch (error) {
        return res.status(500).json({ msg: "Error" + error.message })
    }
}

export async function addToWishlist (req, res) {
    const { productId } = req.params
    const userId = req.userId
    try {
        
        const game = await Games.findOne({ id: productId })

        const wishlist = await Wishses.findOne({ userId })

        if (!wishlist) {
            await Wishses.create({
                userId,
                wishes: [
                    {
                        productId,
                        productName: game.title,
                        productCover: game.thumbnail.url
                    }
                ]
            })
        } else {
            await Wishses.updateOne({ 
                id: wishlist.id
             }, {
                $push: {
                    wishes: {
                        productId,
                        productName: game.title,
                        productCover: game.thumbnail.url
                    }
                }
             })
        }

        return res.json({ msg: "added into wishlist" }).status(200)
    } catch (error) {
        console.log(error)
    }
}