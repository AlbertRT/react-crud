import express from 'express'
import { addGame, getAllGames, getGamesById, insertGameGalleryPhoto } from '../controller/GamesProductController.js'
import { refreshToken } from '../controller/RefershToken.js'
import Middleware from '../middleware/Middleware.js'
import { getMedia } from '../controller/MediaController.js'
import { addToWishlist, getWishlistByUserId } from '../controller/WishlistController.js'
// import { me } from '../controller/AccountController.js'
import { Storage } from '../OnlineStore.js'
import Controller from "../controller/Controller.js";
//
const storage = new Storage()
const router = express.Router()

export default router
const controller = new Controller()

// auth
router.post('/api/v1/user/register', controller.Auth.register)
router.post('/api/v1/user/login', controller.Auth.login)
router.get('/api/v1/auth/token', refreshToken)
router.delete('/api/v1/user/logout', controller.Auth.logut)

// Game
router.post('/api/v1/game/insert', storage.uploadSingle('file'), addGame)
router.post('/api/v1/game/insert/gallery/:productId', storage.uploadMultiple('files', 30), insertGameGalleryPhoto)
router.get('/api/v1/games/all', getAllGames)
router.get('/api/v1/game/:id', getGamesById)

// Media
router.get('/media/download/:id', getMedia)

// Wishlist
router.get('/api/v1/wishlist/get/:userId', Middleware.TokenVarify, getWishlistByUserId)
router.post('/api/v1/wishlist/:productId', Middleware.TokenVarify, addToWishlist)

// Account
router.get('/api/v1/account/me/:id', Middleware.TokenVarify, controller.Account.me)

// Cart
router.post('/api/v1/cart/:userId', Middleware.TokenVarify , controller.Cart.addToCart)
router.get('/api/v1/cart/get/:userId', Middleware.TokenVarify, controller.Cart.getAllCartItemByUserId)
router.delete('/api/v1/cart/delete/:userId', Middleware.TokenVarify, controller.Cart.deleteItemById)
router.delete('/api/v1/cart/delete/all/:userId', Middleware.TokenVarify, controller.Cart.deleteAllItem)