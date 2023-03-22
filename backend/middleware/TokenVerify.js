import jwt from 'jsonwebtoken'

export default function TokenVerify(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) return res.sendStatus(403).json({msg: err})
        req.username = decoded.username
        req.email = decoded.email
        req.userId = decoded.userId
        next()
    })
}