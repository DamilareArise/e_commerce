
const express = require('express')
const { registerUser, loginUser, verifyAuth } = require('../controllers/user.controller')
const route = express.Router()


route.post('/register', registerUser)
route.post('/login', loginUser)
route.get('/verify-auth', verifyAuth)

module.exports = route