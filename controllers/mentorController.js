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
        return next(new CustomError("Name, Email, Password, and Professional Details are required", 400));
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

exports.findAllMentor = AllPromise(async (req, res, next) => {

})