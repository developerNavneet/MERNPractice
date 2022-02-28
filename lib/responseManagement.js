const nodemailer = require("nodemailer");
const smtp = require("../config/smtp.js");
module.exports.sendResponse = async (res, statusCode, msg, data) => {
  res.status(statusCode);
  return res.send({
    statusCode: statusCode,
    message: msg,
    data,
  });
};

module.exports.sendMail = async (email, username, subject, message) => {
  var transporter = nodemailer.createTransport(smtp);

  let info = await transporter.sendMail({
    // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: message, // plain text body
    // html body
  });
  if (
    info.response == null ||
    info.response == undefined ||
    info.response == false
  ) {
    return false;
  } else {
    return true;
  }
};
