import jwt from 'jsonwebtoken'
import User from '../mongodb/models/UserModel.js'
import bcrypt from 'bcrypt'
import validator from 'validator'
import otpGenerator from 'otp-generator'
import otp from '../mongodb/models/OTPModel.js'
import moment from 'moment'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: "smtp-mail.gmail.com",
    auth: {
        user: "Localhost",
        pass: "1234567890@"
    }
})

export async function register(req, res) {
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

    try {

        await User.create({
            firstName,
            username,
            email,
            phone,
            password: passwordHash
        })
        res.status(201).json({ msg: "User register successfully" })

    } catch (error) {
        return res.status(500).json({ msg: "An Error" + error })
    }
}

export async function getAllUsers(req, res) {
    try {
        const users = await User.find()
        if (!users) return res.status(400).json({ msg: "No Userfound" })

        res.status(200).json({
            code: 200,
            status: 'ok',
            data: users
        })
    } catch (error) {
        return res.status(500).json({ msg: "An Error" + error })
    }
}

export async function login(req, res) {
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
            expiresIn: '1d'
        })

        await User.updateOne({
            userId
        }, { $set: { refresh_token } })

        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(200).json({
            code: 200,
            status: 'ok',
            token: accessToken
        })

    } catch (error) {
        return res.status(500).json({ msg: "An Error" + error })
    }
}

export async function logout(req, res) {
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

async function generateOTP (userId, email, res) {
    try {
        const otpCode = otpGenerator.generate(4, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })

        const mailOption = {
            from: 'localhost:5000',
            to: email,
            subject: 'Verify your email',
            html: `<p>To continue your login, please enter <b>${otpCode}</b></p><p>This code will expired at 15min</p>`
        }

        const saltRound = 10
        
        const hashOTP = await bcrypt.hash(otp, saltRound)

        await otp.create({
            userId,
            otp: hashOTP,
            createdAt: moment().unix(),
            expired: moment().unix() * 900000
        })
        await transporter.MailMessage(mailOption)
        res.json({
            status: "Pending",
            msg: "Verification otp email has been send",
            data: {
                userId,
                email
            }
        })

    } catch (error) {
        return res.status(500).json({ msg: "An Error" + error })
    }
}