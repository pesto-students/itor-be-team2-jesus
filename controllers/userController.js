const User = require("../models/user");
const cookieToken = require("../utils/cookieToken");

// for sign up
exports.signup = async (req, res) => {
    try {
        const { name, email, password, schoolName } = req.body;

        if (!email || !name || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter your Name, Email, Password!",
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(200).json({
                success: false,
                message: "You are already registered!",
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            schoolName,
        });

        cookieToken(user, res);
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error,
        });
    }
};

//user dashboard
exports.getLoggedInUserDetails = async (req, res) => {
    try {
        //req.user will be added by middleware
        // find user by id
        const user = await User.findById(req.user.id);

        //send response and user data
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error,
        });
    }
};
