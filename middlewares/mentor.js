const Mentor = require("../models/mentor");
const bigPromise = require("./bigPromise");
const jwt = require("jsonwebtoken");
//custom class for error message
const CustomError = require("../utils/customError");


exports.isLoggedInMentor = bigPromise(async (req, res, next) => {
    const token =
        req.cookies.token || req.header("Authorization").replace("Bearer ", "");

    if (!token) {
        return next(new CustomError("Login first to access this page", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Mentor.findById(decoded.id)

    next();
});



