const httpStatus = require('http-status-codes')
const responseManagement = require('../lib/responseManagement')
const messages = require('../helpers/message.json')
const User = require('../models/users')


module.exports.registerUser = async(req, res) => {

    try {

        let user = await User.findOne({ email: req.body.email })
        if (user) {

            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, messages.user_already_exsists)
        } else {

            await User.create(req.body)

        }
        responseManagement.sendResponse(res, httpStatus.OK, messages.user_created)

    } catch (error) {
        // console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, messages.internal_server_error)
    }


}