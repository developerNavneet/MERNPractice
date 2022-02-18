const express = require('express')
const router = express.Router()
const usersController = require('../controllers/UsersController')

const usersValidators = require('../validators/usersValidators')



module.exports = router