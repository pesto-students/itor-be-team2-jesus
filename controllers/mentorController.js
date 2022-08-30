const Mentor = require("../models/mentor");
const cookieToken = require("../utils/cookieToken");
const cloudinary = require("cloudinary");

// for mentor sign up
exports.signup = async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({
                success: false,
                message: "Photo is required for signup!",
            });
        }

        const { name, email, password, companyName, yearOfEx, expertise } =
            req.body;

        if (!email || !name || !password) {
            res.status(400).json({
                success: false,
                message: "Please enter your Email, Name, and Password!",
            });
        }

        const mentorExists = await Mentor.findOne({ email });
        if (mentorExists) {
            return res.status(200).json({
                success: false,
                message: "You are already registered!",
            });
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
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error,
        });
    }
};

//find a mentor

exports.getAllMentors = async (req, res) => {
    try {
        const mentor = await Mentor.find();
        res.status(200).json({
            success: true,
            mentor,
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error,
        });
    }
};

//get one mentor
exports.getOneMentor = async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.id);

        if (!mentor) {
            return res.status(400).json({
                success: false,
                message: "No mentor found!",
            });
        }
        res.status(200).json({
            success: true,
            mentor,
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error,
        });
    }
};

//dashboard for mentor
exports.getLoggedMentorDetails = async (req, res) => {
    try {
        //req.mentor will be added by middleware
        // find user by id
        const mentor = await Mentor.findById(req.mentor.id);

        //send response and user data
        res.status(200).json({
            success: true,
            mentor,
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error,
        });
    }
};
