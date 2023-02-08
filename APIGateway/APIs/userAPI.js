require('dotenv').config()
/**
 * API Gateway - Users
 */
const express = require('express')
const axios = require('axios')
const auth = require('../controller/auth')
const router = express.Router()
const userAPI = 'http://localhost:3000'


router.get('/users/:username', auth.authenticateToken, (req, res) => {
    axios.get(userAPI + req.path).then((resp) => {
        res.send(resp.data)
    })
})

router.get('/users', auth.authenticateToken, (req, res) => {
    axios.get(userAPI + req.path).then((resp) => {
        res.send(resp.data)
        console.log('[*] Showing all users:')
        console.log(resp.data)
    })
})

router.get('/users/:id', auth.authenticateToken, (req, res) => {
    axios.get(userAPI + req.path).then((resp) => {
        res.send(resp.data)
        console.log(`[*] Showing user: ${req.params.id}`)
        console.log(resp.data)
    })
})

router.post('/users', auth.authenticateToken, (req, res) => {
    axios.post(userAPI + req.path, req.body).then((resp) => {
        res.send(resp.data)
        console.log('[*] Creating user:')
        console.log(resp.data)
    })
})

router.patch('/users/:id', auth.authenticateToken, (req, res) => {
    axios.patch(userAPI + req.path, req.body).then((resp) => {
        res.send(resp.data)
        console.log(`[*] Updated user: ${req.params.id}`)
        console.log(resp.data)
    })
})

router.delete('/users/:id', auth.authenticateToken, (req, res) => {
    axios.delete(userAPI + req.path).then((resp) => {
        res.send(resp.data)
        console.log(`[*] Deleted user: ${req.params.id}`)
        console.log(resp.data)
    })
})

router.post('/login', (req, res) => {
    const userForToken = { username: req.body.username }
    const token = auth.generateAccessToken(userForToken)
    
    axios.post(userAPI + req.path, req.body)
    .then(() => {
        res.send({
            username: req.body.username,
            token: token 
        })
        console.log("Status Code: ", res.statusCode)
    })
    .catch(() => {
        res.sendStatus(404)
        console.log("Status Code: ", res.statusCode)
    })
})

router.post('/register', (req, res) => {
    axios.post(userAPI + req.path, req.body)
    .then((resp) => {
        res.send(resp.data)
    })
    .catch((err) => console.log(err))
})


module.exports = router