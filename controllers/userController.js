const User = require("../models/user");
const bigPromise = require("../middlewares/bigPromise");
const cookieToken = require("../utils/cookieToken");
const cloudinary = require("cloudinary");
//custom class for error message
const CustomError = require("../utils/customError");
// const userValidationSchema = require("../utils/userValidationSchema");


// for sign up
exports.signup = bigPromise(async (req, res, next) => {
    if (!req.files) {
        return next(new CustomError("Photo is required for signup", 400));
    }

    const { name, email, password, schoolName } = req.body;

    if (!email || !name || !password) {
        return next(new CustomError("Name, Email and Password are required", 400));
    }


    // const userJoi = await userValidationSchema.validate(req.body);
    // console.log(userJoi)
    // const existingUser = await User.find({ email });
    // if (existingUser) {
    //     return res.status(401).send("User is already exist");
    // }
    //  let file = userJoi.photo();
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
        }
    });

    cookieToken(user, res);
});



//user dashboard
exports.getLoggedInUserDetails = bigPromise(async (req, res, next) => {
    //req.user will be added by middleware
    // find user by id
    const user = await User.findById(req.user.id);

    //send response and user data
    res.status(200).json({
        success: true,
        user,
    });
});

