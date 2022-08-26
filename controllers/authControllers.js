const User = require("../models/user");
const Mentor = require("../models/mentor");
const cookieToken = require("../utils/cookieToken");

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check for presence of email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter your email and password!",
            });
        }

        // get user from DB
        const user =
            (await User.findOne({ email }).select("+password")) ||
            (await Mentor.findOne({ email }).select("+password"));

        // if user not found in DB
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email or Password does not exists or matches!",
            });
        }

        // match the password
        const isPasswordCorrect = await user.isValidatedPassword(password);

        //if password do not match
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Email or Password does not exists or matches!",
            });
        }

        // if all goes good and we send the token
        cookieToken(user, res);
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error,
        });
    }
};

exports.logout = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        //send JSON response for success
        res.status(200).json({
            success: true,
            message: "Logout success!",
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error,
        });
    }
};
//clear the cookie
