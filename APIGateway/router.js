const express = require('express')
const axios = require('axios')
const router = express.Router()

const userAPI = 'http://localhost:3000'
const taskAPI = 'http://localhost:8000'

router.get('/users', (req, res) => {
    axios.get(`${userAPI}${req.path}`).then((resp) => {
        res.send(resp.data)
        console.log(resp.data)
    })
})

module.exports = router