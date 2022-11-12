/**
 * API Gateway - Users
 */
const express = require('express')
const axios = require('axios')
const router = express.Router()

const userAPI = 'http://localhost:3000'

// Get user by username
router.get('/users/:username', (req, res) => {
    axios.get(userAPI + req.path).then((resp) => {
        res.send(resp.data)
    })
})

// Get all users
router.get('/users', (req, res) => {
    axios.get(userAPI + req.path).then((resp) => {
        res.send(resp.data)
        console.log('[*] Showing all users:')
        console.log(resp.data)
    })
})

// Get user by ID
router.get('/users/:id', (req, res) => {
    axios.get(userAPI + req.path).then((resp) => {
        res.send(resp.data)
        console.log(`[*] Showing user: ${req.params.id}`)
        console.log(resp.data)
    })
})

// Create user
router.post('/users', (req, res) => {
    axios.post(userAPI + req.path, req.body).then((resp) => {
        res.send(resp.data)
        console.log('[*] Creating user:')
        console.log(resp.data)
    })
})

// Update user
router.patch('/users/:id', (req, res) => {
    axios.patch(userAPI + req.path, req.body).then((resp) => {
        res.send(resp.data)
        console.log(`[*] Updated user: ${req.params.id}`)
        console.log(resp.data)
    })
})

// Delete user
router.delete('/users/:id', (req, res) => {
    axios.delete(userAPI + req.path).then((resp) => {
        res.send(resp.data)
        console.log(`[*] Deleted user: ${req.params.id}`)
        console.log(resp.data)
    })
})

// Log in
router.post('/login', (req, res) => {
    axios.post(userAPI + req.path, req.body).then((resp) => {
        res.send(resp.data)
    })
})

// Sign up
router.post('/register', (req, res) => {
    axios.post(userAPI + req.path, req.body).then((resp) => {
        res.send(resp.data)
    })
})


module.exports = router