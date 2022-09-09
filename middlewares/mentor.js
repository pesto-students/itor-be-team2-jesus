const Mentor = require("../models/mentor");
const jwt = require("jsonwebtoken");

exports.isLoggedInMentor = async (req, res, next) => {
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

        req.mentor = await Mentor.findById(decoded._id);

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Authentication failed!",
        });
    }
};
