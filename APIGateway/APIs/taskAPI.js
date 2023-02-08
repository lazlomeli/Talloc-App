const express = require('express')
const axios = require('axios')
const router = express.Router()
const auth = require('../controller/auth')
const taskAPI = 'http://127.0.0.1:8000'

// 🚀 API Gateway ~ Tasks

router.get('/tasks', auth.authenticateToken, (req, res) => {
    axios.get(taskAPI + req.path)
    .then((resp) => {
        res.send(resp.data)
        console.log('✅ Showing all tasks:')
        console.log(resp.data)
    })
    .catch(() => {
        console.log(`⛔ Couldn't get all tasks`)
    })
})

router.get('/tasks/:username', auth.authenticateToken, (req, res) => {
    axios.get(taskAPI + req.path)
    .then((resp) => {
        res.send(resp.data)
        console.log(`✅ Showing ${req.params.username} tasks:`)
        console.log(resp.data)
    })
    .catch(() => {
        console.log(`⛔ Couldn't get <${req.params.username}> tasks`)
    })
})

router.get('/tasks/:id', auth.authenticateToken, (req, res) => {
    axios.get(taskAPI + req.path)
    .then((resp) => {
        res.send(resp.data)
        console.log(`✅ Showing task: ${req.params.id}`)
        console.log(resp.data)
    })
    .catch(() => {
        console.log(`⛔ Couldn't get task by the ID: ${req.params.id}`)
    })
})

router.post('/tasks', auth.authenticateToken, (req, res) => {
    axios.post(taskAPI + req.path, req.body)
    .then((resp) => {
        res.send(resp.data)
        console.log('✅ Creating task:')
        console.log(resp.data)
    })
    .catch(() => {
        console.log(`⛔ Couldn't create task`)
    })
})

router.put('/tasks/:id', auth.authenticateToken, (req, res) => {
    axios.put(taskAPI + req.path, req.body)
    .then((resp) => {
        res.send(resp.data)
        console.log(`✅ Updated task: ${req.params.id}`)
        console.log(resp.data)
    })
    .catch(() => {
        console.log(`⛔ Couldn't update task`)
    })
})

router.delete('/tasks/:id', auth.authenticateToken, (req, res) => {
    axios.delete(taskAPI + req.path)
    .then((resp) => {
        res.send(resp.data)
        console.log(`✅ Deleted task: ${req.params.id}`)
        console.log(resp.data)
    })
    .catch(() => {
        console.log(`⛔ Couldn't delete task`)
    })
})


module.exports = router