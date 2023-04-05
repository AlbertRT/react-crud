import Cart from '../mongodb/models/Cart.js'

export async function cartIntance (id) {
    try {
        await Cart.create({
            userId: id
        })
        return 1
    } catch (error) {
        return error
    }
}
export async function addToCart(req, res) {
    const { userId } = req.params
    const { productName, productPrice, productThumbnail, productId } = req.body
    
    try {
        
        const cart = await Cart.findOne({ userId })

        // ! item duplicate check
        const items = cart.cartItem
        const duplicateCartItem = items.filter((item, index) => item.indexOf(item) !== index)
        if (duplicateCartItem.length > 0) {
            console.log('duplicate!')
            return res.status(400).json({ msg: "item all ready on your cart" })
        }

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
export async function getAllCartItemByUserId (req, res) {
    const { userId } = req.params

    try {
        const data = await Cart.findOne({
            userId
        })

        return res.status(200).json({
            code: 200,
            status: 'ok',
            data
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Error" + error.message
        })
    }
}

export async function deleteItemById(req, res) {
    const { productId } = req.query
    const { userId } = req.params

    try {
        const item = await Cart.findOne({
            userId
        })
        const oldPriceIndex = item.cartItem.findIndex(item => item.productId === productId)
        const newPrice = parseInt(item.totalPrice) - parseInt(item.cartItem[oldPriceIndex].productPrice)

        const updatedCartItems = item.cartItem.filter(item => item.productId !== productId)
        await Cart.updateOne({
            userId
        }, {
            $set: {
                cartItem: updatedCartItems
            },
            cartItemTotal: item.cartItemTotal - 1,
            totalPrice: newPrice
        }, {
            new: true
        })
        return res.status(200).json({
            msg: "an item successfully deleted from your cart"
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Error" + error.message
        })
    }
}

export async function deleteAllItem (req, res) {
    const { userId } = req.params

    try {
        await Cart.updateOne({
            userId
        }, {
            $set: {
                cartItem: []
            },
            cartItemTotal: 0,
            totalPrice: 0
        })
        return res.status(200).json({
            msg: "all item successfully deleted from your cart"
        })
    } catch (e) {
        console.log(e)
    }
}