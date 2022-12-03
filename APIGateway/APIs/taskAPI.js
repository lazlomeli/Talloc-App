/**
 * API Gateway - Tasks
 */
const express = require('express')
const axios = require('axios')
const router = express.Router()
const auth = require('../controller/auth')
const taskAPI = 'http://127.0.0.1:8000'


// Get all tasks
router.get('/tasks', (req, res) => {
    axios.get(taskAPI + req.path).then((resp) => {
        res.send(resp.data)
        console.log('[*] Showing all tasks:')
        console.log(resp.data)
    })
})

// Get task by ID
router.get('/tasks/:id', (req, res) => {
    axios.get(taskAPI + req.path).then((resp) => {
        res.send(resp.data)
        console.log(`[*] Showing task: ${req.params.id}`)
        console.log(resp.data)
    })
})

// Create task
router.post('/tasks', (req, res) => {
    axios.post(taskAPI + req.path, req.body).then((resp) => {
        res.send(resp.data)
        console.log('[*] Creating task:')
        console.log(resp.data)
    })
})

// Update task
router.put('/tasks/:id', (req, res) => {
    axios.put(taskAPI + req.path, req.body).then((resp) => {
        res.send(resp.data)
        console.log(`[*] Updated task: ${req.params.id}`)
        console.log(resp.data)
    })
})

// Delete task
router.delete('/tasks/:id', (req, res) => {
    axios.delete(taskAPI + req.path).then((resp) => {
        res.send(resp.data)
        console.log(`[*] Deleted task: ${req.params.id}`)
        console.log(resp.data)
    })
})


module.exports = router