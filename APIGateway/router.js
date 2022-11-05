const express = require('express')
const router = express.Router()
const userRoutes = require('../NodeSide/app/routers/user')

router.use((req, res, next) => {
    console.log("[*] Called: ", req.path)
    next()
})

router.use(userRoutes)

module.exports = router