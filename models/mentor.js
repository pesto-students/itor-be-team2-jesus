const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mentorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter your name"],
    },
    email: {
        type: String,
        required: [true, "Enter your email"],
        validate: [validator.isEmail, "Please enter email in correct format"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Enter your password"],
        minlength: [6, "Password must be at least 8 characters"],
        select: false,
    },
    role: {
        type: String,
        default: "mentor",
    },
    photo: {
        id: {
            type: String,
            // required: true,
        },
        secure_url: {
            type: String,
            // required: true,
        },
    },
    companyName: {
        type: String,
        required: true
    },
    yearOfEx: {
        type: Number,
        required: true
    },
    expertise: {
        type: String,
        required: true
    },
    about: {
        type: String
    }
});

//encrypt password before save - HOOKS
mentorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// validate the password with passed on user password
mentorSchema.methods.isValidatedPassword = async function (userSendPassword) {
    return await bcrypt.compare(userSendPassword, this.password);
};

//create and return jwt token
mentorSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    });
};

module.exports = mongoose.model("Mentor", mentorSchema);
