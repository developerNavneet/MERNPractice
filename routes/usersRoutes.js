const express = require('express')
const router = express.Router()
const usersController = require('../controllers/UsersController')

const usersValidators = require('../validators/usersValidators')


router.post('/createUser', usersValidators.createUser, usersController.registerUser);
module.exports = router