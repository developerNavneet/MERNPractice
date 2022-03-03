const jwt = require("jsonwebtoken");
const config = require("../config/confg.json");
const User = require("../models/users");
const { use } = require("../routes/usersRoutes");

const auth = async(req, res, next) => {
    try {
        if (req.header("Authorization")) {
            const token = req.header("Authorization").replace("Bearer ", "");
            const data = jwt.verify(token, config.secretkey);
            const user = await User.findOne({ _id: data._id });
            console.log(user);
        }
    } catch {}
};

module.exports = auth;