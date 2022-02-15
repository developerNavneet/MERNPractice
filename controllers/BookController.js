const httpStatus = require('http-status-codes')
const responseManagement = require('../lib/responseManagement')
const messages = require('../helpers/message.json')
const Book = require('../models/books')

module.exports.insertBook = async(req, res) => {

    try {

        let book = await Book.findOne({ name: req.body.name })
        if (book) {

            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, messages.already_exsists)
        } else {

            await Book.create(req.body)

        }
        responseManagement.sendResponse(res, httpStatus.OK, messages.insert_success_book)

    } catch (error) {

        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, messages.internal_server_error)
    }


}

module.exports.removeBook = async(req, res) => {

    try {
        let book = await Book.findOne(req.query)
        if (!book) {
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, messages.delete_fail)
        } else {
            await Book.deleteOne(req.query)
        }
        responseManagement.sendResponse(res, httpStatus.OK, messages.delete_success)

    } catch (error) {

        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, messages.internal_server_error)
    }
}

module.exports.deleteBook = async(req, res) => {

    try {
        console.log(req.body)
        let book = await Book.findOne({ _id: req.body._id })
        if (!book) {
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, messages.delete_fail)
        } else {
            await Book.deleteOne(req.query)
        }
        responseManagement.sendResponse(res, httpStatus.OK, messages.delete_success)

    } catch (error) {

        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, messages.internal_server_error)
    }
}

module.exports.viewAll = async(req, res) => {
    try {
        let book = await Book.find({}, { __v: 0 })
        if (book.length == 0) {


            responseManagement.sendResponse(res, httpStatus.NOT_FOUND, messages.book_fail, null)

        } else {

            responseManagement.sendResponse(res, httpStatus.OK, messages.book_success, book)
        }

    } catch (error) {
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, messages.internal_server_error)

    }



}

module.exports.searchBook = async(req, res) => {

    try {
        //console.log(req.query)
        let book = await Book.findOne(req.query);
        if (!book) {

            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, messages.messages.search_not_found)
        } else {
            console.log(book)
            responseManagement.sendResponse(res, httpStatus.OK, messages.search_success, book)
        }


    } catch (error) {
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, messages.internal_server_error)
    }

}