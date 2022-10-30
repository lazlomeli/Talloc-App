const express = require('express');
const router = express.Router()
const User = require('../models/user')


/** Get User by ID from DB 
 * @param {Response} status(404) Error: Not found
 */
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

/** 
 * Get all users from DB
 * @param {Response} status(500) Error: Internal server error
 */
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}) 

/** 
 * Get user from DB by ID
 *  @param {function} getUser() asynchronously retrieves a user from the DB
 */
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})   

/** 
 * Create User
 * @param {Response} status(201) Succesfully created something
 * @param {Response} status(400) Error: The data sent was not correct
 */
router.post('/', async (req, res) => {
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

/**
 *  Update User
 */
router.patch('/:id', getUser, async (req, res) => {
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

/**
 * Delete User
 */
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: `Deleted user ${req.params.id}` })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router