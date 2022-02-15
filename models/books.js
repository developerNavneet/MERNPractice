const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({

    "name": { type: String, text: true },
    "language": { type: String },
    "author": { type: String },
    "price": { type: Number },
    "available": { type: Boolean }

})
module.exports = mongoose.model('book', bookSchema)