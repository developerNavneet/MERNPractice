const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({

    "first_name": { type: String, text: true },
    "last_name": { type: String },
    "email": { type: String },
    "password": { type: String }


})
module.exports = mongoose.model('users', usersSchema)