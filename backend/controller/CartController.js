import Cart from '../mongodb/models/Cart.js'

export async function addToCart(req, res) {
    const { userId } = req.params
    const { productName, productPrice, productThumbnail, productId } = req.body
    
    try {
        
        const cart = await Cart.findOne({ userId })

        // ! item duplicate check 
        

        if (!cart) {
            const newCart = await Cart.create({
                userId,
                cartItemTotal: 1,
                cartItem: [
                    {
                        productId,
                        productName,
                        productPrice,
                        productThumbnail
                    }
                ],
                totalPrice: productPrice
            })
        } else {
            const newCart = await Cart.updateOne({
                userId
            }, {
                cartItemTotal: cart.cartItemTotal + 1,
                $push: {
                    cartItem: {
                        productId,
                        productName,
                        productPrice,
                        productThumbnail
                    }
                },
                totalPrice: cart.totalPrice + productPrice
            })
        }
        
        return res.status(200).json({
            msg: "an item added into your cart"
        })

    } catch (error) {
        return res.status(500).json({ msg: "Error" + error.message })
    }
}