const User = require("../models/user");
const bigPromise = require("./bigPromise");
const jwt = require("jsonwebtoken");
//custom class for error message
const CustomError = require("../utils/customError");


exports.isLoggedInUser = bigPromise(async (req, res, next) => {
    const token =
        req.cookies.token || req.header("Authorization").replace("Bearer ", "");

    if (!token) {
        return next(new CustomError("Login first to access this page", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id)

    next();
});


// this will use for admin and other roles.......
// exports.customRole = (...roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return next(new CustomError("You are not allowed for this resource", 403));
//         }
//         next();
//     };
// };
