import jwt from 'jsonwebtoken'
import User from '../mongodb/models/UserModel.js'
import bcrypt from 'bcrypt'
import validator from 'validator'
import { v4 as uuidv4 } from 'uuid'
import { cartIntance } from "./CartController.js";
import {wishlishIntance} from "./WishlistController.js";


class Auth {
    register = async (req, res) => {
        const { firstName, username, email, phone, password, confirmPassword } = req.body

        if (confirmPassword !== password) {
            return res.status(400).json({ msg: "Password not Match" })
        }

        const isEmail = validator.isEmail(email)

        if (!isEmail) {
            return res.status(400).json({ msg: "Email is In Valid" })
        }
        const isPhone = validator.isMobilePhone(phone.number)
        if (!isPhone) {
            return res.status(400).json({ msg: "Phone Number is Invalid is In Valid" })
        }

        const passwordHash = await bcrypt.hash(password, 10)
        const userId = uuidv4()

        try {

            await User.create({
                userId,
                firstName,
                username,
                email,
                phone,
                password: passwordHash
            })
            cartIntance(userId)
            wishlishIntance(userId)
            return res.status(200).json({
                msg: "User created"
            })

        } catch (error) {
            return res.status(500).json({ msg: "An Error" + error })
        }
    }
    login = async (req, res) => {
        const user = await User.findOne({
            $or: [{ username: req.body.username }, { email: req.body.username }]
        })

        if (!user) {
            return res.status(404).json({ msg: "User not Found" })
        }

        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) {
            return res.status(404).json({ msg: "Wrong Password" })
        }

        const { userId, username, email } = user

        try {

            const accessToken = jwt.sign({ userId, username, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '20s'
            })
            const refresh_token = jwt.sign({ userId, username, email }, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '14d'
            })

            await User.updateOne({
                userId
            }, { $set: { refresh_token } })

            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            })
            return res.status(200).json({
                code: 200,
                status: 'ok',
                token: accessToken
            })

        } catch (error) {
            return res.status(500).json({ msg: "An Error" + error })
        }
    }
    logut = async (req,res) => {
        const refresh_token = req.cookies.refresh_token
        if(!refresh_token) return res.sendStatus(204)

        const user = await User.findOne({
            refresh_token
        })

        if(!user) return res.sendStatus(204)

        await User.updateOne({
            userId: user.userId
        }, {
            refresh_token: null
        })
        res.clearCookie('refresh_token')
        return res.sendStatus(200)
    }
}
export default Auth