require('dotenv').config()

const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/user')


async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: '⛔ Cannot find user' })
        } else {
            res.json(user)
        }
    } catch (error) {
        return res.status(404).json({ message: '⛔ Error caught getting the user' })
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
        return res.status(404).json({ message: '⛔ User provided is invalid' })
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
        return res.status(404).json({ message: '⛔ User e-mail is not valid' })
    }
}


router.get('/users/:username', async (req, res) => {
    let user;
    try {
        user = await User.findOne({ username: req.params.username })
        res.status(200).json(user, { message: `✅ Showing user: ${req.params.id}`})
    } catch (error) {
        res.status(404).json({ message: '⛔ Error getting the user' })
    }
})


router.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users, { message: `✅ Showing users`})
    } catch (error) {
        res.status(500).json({ message: '⛔ Error getting all users' })
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
        res.status(201).json(user, { message: `✅ Created user`})
    } catch (error) {
        res.status(400).json({ message: '⛔ Error creating the user' })
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
        res.json(updatedUser, { message: `✅ Updated user ${req.params.id}`})
    } catch (error) {
        res.status(400).json({ message: '⛔ Error updating the user' })
    }
})


router.delete('/users/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: `✅ Deleted user ${req.params.id}` })
    } catch (error) {
        res.status(500).json({ message: '⛔ Error deleting the user' })
    }
})


router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if(user == null) return res.status(400).send('⛔ Cannot find user')

        if(await bcrypt.compare(req.body.password, user.password)) {
            res.status(200).send(`✅ Logged as ${req.body.username}`)
        } else {
            res.status(404).send('⛔ Passwords dont match')
        }
    } catch (error) {
        
    }
})


router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        if(( await isValidUser(user.username) && await isValidMail(user.email) ) === true) {
            console.log(`✅ User '${user.username}' is valid. Saving it in DB`)
            await user.save()
            res.sendStatus(200)
        } else {
            console.log("⛔ Username or e-mail already exists")
            res.sendStatus(403)
        }
    } catch (error) {
        console.log("⛔ Something went wrong creating the new user")
        res.sendStatus(500)
    }
})


module.exports = router