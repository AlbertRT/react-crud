import User from "../mongodb/models/UserModel.js"
import jwt from 'jsonwebtoken'

export async function refreshToken(req, res) {
    try {
        
        const refresh_token = req.cookies.refresh_token
        if (!refresh_token) return res.sendStatus(401)
        
        const user = await User.findOne({
            refresh_token
        })
        if (!user) return res.sendStatus(403)
        jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, function (err, decoded) {
            if (err) return res.sendStatus(403)

            const { userId, username, email } = user
            const accessToken = jwt.sign({ userId, username, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            })
            res.json({ accessToken })
        })

    } catch (error) {
        console.log(error)
    }
}