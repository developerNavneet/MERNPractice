const mongoose = require('mongoose')
const crypto = require('crypto')
const usersSchema = new mongoose.Schema({

    "first_name": { type: String, text: true },
    "last_name": { type: String },
    "email": { type: String },
    "password": { type: String },
    "salt": { type: String },
    "hash": { type: String }


})

usersSchema.methods.setPassword = function(password) {

    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 50, 32, 'sha512').toString('hex')
}

usersSchema.methods.validatePassword = function(password) {

    var hash = crypto.pbkdf2Sync(password, this.salt, 50, 32, 'sha512').toString('hex')
    return hash === this.hash

}
module.exports = mongoose.model('users', usersSchema)