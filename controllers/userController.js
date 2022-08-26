const User = require("../models/user");
const cookieToken = require("../utils/cookieToken");
const cloudinary = require("cloudinary");

// for sign up
exports.signup = async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({
                success: false,
                message: "Photo is required for signup!",
            });
        }

        const { name, email, password, schoolName } = req.body;

        if (!email || !name || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter your Name, Email, Password, and School Name",
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(200).json({
                success: false,
                message: "You are already registered!"
            });
        }



        let file = req.files.photo;

        const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder: "users",
            width: 150,
            crop: "scale",
        });

        const user = await User.create({
            name,
            email,
            password,
            schoolName,
            photo: {
                id: result.public_id,
                secure_url: result.secure_url,
            },
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
