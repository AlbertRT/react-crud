import express from 'express'
import { getAllUsers, login, register, logout } from '../controller/AuthController.js'
import { refreshToken } from '../controller/RefershToken.js'
import TokenVerify from '../middleware/TokenVerify.js'

const router = express.Router()

export default router

router.post('/api/v1/user/register', register)
router.get('/api/v1/users/all', TokenVerify, getAllUsers)
router.post('/api/v1/user/login', login)
router.get('/api/v1/auth/token', refreshToken)
router.delete('/api/v1/user/logout', logout)