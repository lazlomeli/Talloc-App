/**
 * API Gateway - Tasks
 */
const express = require('express')
const axios = require('axios')
const router = express.Router()
const auth = require('../controller/auth')
const taskAPI = 'http://127.0.0.1:8000'


router.get('/tasks', auth.authenticateToken, (req, res) => {
    axios.get(taskAPI + req.path).then((resp) => {
        res.send(resp.data)
        console.log('[*] Showing all tasks:')
        console.log(resp.data)
    })
})

router.get('/tasks/:username', auth.authenticateToken, (req, res) => {
    axios.get(taskAPI + req.path).then((resp) => {
        res.send(resp.data)
        console.log(`[*] Showing ${req.params.username} tasks:`)
        console.log(resp.data)
    })
})

router.get('/tasks/:id', auth.authenticateToken, (req, res) => {
    axios.get(taskAPI + req.path).then((resp) => {
        res.send(resp.data)
        console.log(`[*] Showing task: ${req.params.id}`)
        console.log(resp.data)
    })
})

router.post('/tasks', auth.authenticateToken, (req, res) => {
    axios.post(taskAPI + req.path, req.body).then((resp) => {
        res.send(resp.data)
        console.log('[*] Creating task:')
        console.log(resp.data)
    })
})

router.put('/tasks/:id', auth.authenticateToken, (req, res) => {
    axios.put(taskAPI + req.path, req.body).then((resp) => {
        res.send(resp.data)
        console.log(`[*] Updated task: ${req.params.id}`)
        console.log(resp.data)
    })
})

router.delete('/tasks/:id', auth.authenticateToken, (req, res) => {
    axios.delete(taskAPI + req.path).then((resp) => {
        res.send(resp.data)
        console.log(`[*] Deleted task: ${req.params.id}`)
        console.log(resp.data)
    })
})


module.exports = router