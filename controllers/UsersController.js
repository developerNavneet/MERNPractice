const httpStatus = require("http-status-codes");
const responseManagement = require("../lib/responseManagement");
const messages = require("../helpers/message.json");
const User = require("../models/users");

module.exports.registerUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      responseManagement.sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        messages.user_already_exsists
      );
    } else {
      var password = req.body.password;
      delete req.body.password;
      const users = await User(req.body).save();
      users.setPassword(password);
      await User.updateOne({ _id: users._id }, users);
      responseManagement.sendMail(
        req.body.email,
        req.body.first_name,

        "Registration",

        "Dear " + req.body.first_name + "Thank you for registration "
      );
    }
    responseManagement.sendResponse(res, httpStatus.OK, messages.user_created);
  } catch (error) {
    // console.log(error)
    responseManagement.sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      messages.internal_server_error
    );
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && user.hash && user.salt) {
      if (user.validatePassword(password)) {
        const token = await user.generateJWT();
        const user_data = {
          _id: user._id,
          name: user.first_name,
          email: user.email,
        };

        responseManagement.sendResponse(
          res,
          httpStatus.OK,
          messages.login_success,
          { token: token, user_data }
        );
      } else {
        responseManagement.sendResponse(
          res,
          httpStatus.UNAUTHORIZED,
          messages.user_login_fail
        );
      }
    } else {
      responseManagement.sendResponse(
        res,
        httpStatus.UNAUTHORIZED,
        messages.user_login_fail
      );
    }
  } catch {
    responseManagement.sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      messages.internal_server_error
    );
  }
};
