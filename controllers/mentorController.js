const Mentor = require("../models/mentor");
const AllPromise = require("../middlewares/allPromise");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");
const cloudinary = require("cloudinary");

// for mentor sign up
exports.signup = AllPromise(async (req, res, next) => {
    if (!req.files) {
        return next(new CustomError("Photo is required for signup", 400));
    }

    const { name, email, password, companyName, yearOfEx, expertise } = req.body;

    if (!email || !name || !password) {
        return next(
            new CustomError(
                "Name, Email, Password, and Professional Details are required",
                400
            )
        );
    }

    let file = req.files.photo;

    const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: "mentors",
        width: 150,
        crop: "scale",
    });

    const mentor = await Mentor.create({
        name,
        email,
        password,
        companyName,
        yearOfEx,
        expertise,
        photo: {
            id: result.public_id,
            secure_url: result.secure_url,
        },
    });

    cookieToken(mentor, res);
});

//find a mentor

exports.getAllMentor = AllPromise(async (req, res, next) => {
    const mentor = await Mentor.find();
    //testing
    // let a = [mentor];
    // console.log(a.length);

    res.status(200).json({
        success: true,
        mentor,
    });
});

//get one mentor
exports.getOneMentor = AllPromise(async (req, res, next) => {
    const mentor = await Mentor.findById(req.params.id);

    if (!mentor) {
        return next(new CustomError("No mentor found with this id", 401));
    }
    res.status(200).json({
        success: true,
        mentor,
    });
});


//dashboard for mentor
exports.getLoggedMentorDetails = AllPromise(async (req, res, next) => {
    //req.user will be added by middleware
    // find user by id
    const user = await Mentor.findById(req.user.id);

    //send response and user data
    res.status(200).json({
        success: true,
        user,
    });
});