const User = require("../models/user");
const AllPromise = require("../middlewares/allPromise");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");
const cloudinary = require("cloudinary");


// for sign up
exports.signup = AllPromise(async (req, res, next) => {
    if (!req.files) {
        return next(new CustomError("Photo is required for signup", 400));
    }

    const { name, email, password, schoolName } = req.body;

    if (!email || !name || !password) {
        return next(new CustomError("Name, Email and Password are required", 400));
    }

    // const existingUser = await User.find({ email });
    // if (existingUser) {
    //     return res.status(401).send("User is already exist");
    // }

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
});



//for login 
exports.login = AllPromise(async (req, res, next) => {
    const { email, password } = req.body;

    // check for presence of email and password
    if (!email || !password) {
        return next(new CustomError("Please provide your email and password", 400));
    }

    // get user from DB
    const user = await User.findOne({ email }).select("+password");

    // if user not found in DB
    if (!user) {
        return next(
            new CustomError("Email or password does not match or exist", 400)
        );
    }

    // match the password
    const isPasswordCorrect = await user.isValidatedPassword(password);

    //if password do not match
    if (!isPasswordCorrect) {
        return next(
            new CustomError("Email or password does not match or exist", 400)
        );
    }

    // if all goes good and we send the token
    cookieToken(user, res);
});
