require('dotenv').config()
const jwt = require('jsonwebtoken')


function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN)
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    let token = ''

    if(authHeader && authHeader.toLowerCase().startsWith('bearer')) {
        token = authHeader.substring(7)
    }

    if (token == null) return res.status(401).json({ error: "Token missing"})

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.status(403).json({ error: "The token you have is invalid"})
        req.user = user
        next()
    })
}


module.exports = { authenticateToken, generateAccessToken }