import express from 'express'
import {login, register, logout } from '../controller/AuthController.js'
import { addGame, getAllGames, getGamesById, insertGameGalleryPhoto } from '../controller/GamesProductController.js'
import { refreshToken } from '../controller/RefershToken.js'
import TokenVerify from '../middleware/TokenVerify.js'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import { getMedia } from '../controller/MediaController.js'
import { addToWishlist, getWishlistByUserId } from '../controller/WishlistController.js'
import { me } from '../controller/AccountController.js'
import {addToCart, deleteAllItem, deleteItemById, getAllCartItemByUserId} from '../controller/CartController.js'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'media')
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + file.originalname)
    }
})
const upload = multer({ storage })

const router = express.Router()

export default router

// auth
router.post('/api/v1/user/register', register)
router.post('/api/v1/user/login', login)
router.get('/api/v1/auth/token', refreshToken)
router.delete('/api/v1/user/logout', logout)

// Game
router.post('/api/v1/game/insert', upload.single('file'), addGame)
router.post('/api/v1/game/insert/gallery/:productId', upload.array('files', 20), insertGameGalleryPhoto)
router.get('/api/v1/games/all', getAllGames)
router.get('/api/v1/game/:id', getGamesById)

// Media
router.get('/media/download/:id', getMedia)

// Wishlist
router.get('/api/v1/wishlist/get/:userId', TokenVerify, getWishlistByUserId)
router.post('/api/v1/wishlist/:productId', TokenVerify, addToWishlist)

// Account
router.get('/api/v1/account/me/:id', TokenVerify, me)

// Cart

router.post('/api/v1/cart/:userId', TokenVerify , addToCart)
router.get('/api/v1/cart/get/:userId', TokenVerify, getAllCartItemByUserId)
router.delete('/api/v1/cart/delete/:userId', TokenVerify, deleteItemById)
router.delete('/api/v1/cart/delete/all/:userId', TokenVerify, deleteAllItem)