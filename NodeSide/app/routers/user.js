require('dotenv').config()

const express = require('express');
const router = express.Router()
const User = require('../models/user')


async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        } else {
            res.json(user)
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }

    res.user = user
    next()
}


async function isValidUser(username) {
    let foundUser
    try {
        foundUser = await User.findOne({ username: username })
        if(foundUser === null) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}


async function isValidMail(mail) {
    let foundUser
    try {
        foundUser = await User.findOne({ email: mail })
        if(foundUser === null) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}


router.get('/users/:username', async (req, res) => {
    let user;
    try {
        user = await User.findOne({ username: req.params.username })
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})


router.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}) 


router.get('/users/:id', getUser, (req, res) => {
    res.json(res.user)
})   


router.post('/users', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    try {
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


router.patch('/users/:id', getUser, async (req, res) => {
    if (req.body.username != null) {
        res.user.username = req.body.username
    }
    if (req.body.email != null) {
        res.user.email = req.body.email
    }
    if (req.body.password != null) {
        res.user.password = req.body.password
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


router.delete('/users/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: `Deleted user ${req.params.id}` })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.post('/login', async (req, res) => {
    const user = { username: req.body.username, password: req.body.password }

    if(await User.findOne({ username: user.username, password: user.password })) {
        res.sendStatus(200)
        console.log(`Logged as ${user.username}`)
    } else {
        res.sendStatus(404)
        console.log(`Credentials are not correct`)
    }
})


router.post('/register', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    if(( await isValidUser(user.username) && await isValidMail(user.email) ) === true) {
        console.log(`[*] User '${user.username}' is valid. Saving it in DB`)
        await user.save()
        res.sendStatus(200)
    } else {
        console.log("[*] Username or e-mail already exists")
        res.sendStatus(403)
    }
})


module.exports = router