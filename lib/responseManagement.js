module.exports.sendResponse = async(res, statusCode, msg, data) => {
    res.status(statusCode)
    return res.send({
        "statusCode": statusCode,
        "message": msg,
        data


    });

}