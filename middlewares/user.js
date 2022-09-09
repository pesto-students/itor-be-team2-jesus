const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.isLoggedInUser = async (req, res, next) => {
    try {
        const token =
            req.cookies.token || req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "You must be Logged In!",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded._id);

        req.user = await User.findById(decoded._id);
        // console.log(req.user._id)

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Authentication failed!",
        });
    }
};
