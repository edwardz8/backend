const router = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.post('/auth/signup', async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({
            success: false,
            message: 'Please create an account'
        })
    } else {
        try {
            let newUser = new User()
            newUser.name = req.body.name
            newUser.email = req.body.email
            newUser.password = req.body.password
            await newUser.save()
            let token = jwt.sign(newUser.toJSON(), process.env.SECRET, {
                expiresIn: 604800 // 1 week
            })

            res.json({
                success: true,
                token: token,
                message: 'Created a new user successfully!'
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
})

/* profile route */

/* update profile route */

/* login route */

module.exports = router