const User = require("../models/user");
const Mentor = require("../models/mentor");
const AllPromise = require("../middlewares/allPromise");
const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = AllPromise(async (req, res, next) => {
    const token =
        req.cookies.token || req.header("Authorization").replace("Bearer ", "");

    if (!token) {
        return next(new CustomError("Login first to access this page", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id) || await Mentor.findById(decoded.id);

    next();
});


// this will use for admin and other roles.......
exports.customRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new CustomError("You are not allowed for this resource", 403));
        }
        next();
    };
};
