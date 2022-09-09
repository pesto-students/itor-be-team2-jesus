const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mentorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        validate: [validator.isEmail, "Please enter your email in correct format!"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"],
        minlength: [6, "Password must be at least 8 characters long!"],
        select: false,
    },
    role: {
        type: String,
        default: "mentor",
    },
    photo: {
        id: {
            type: String,
        },
        secure_url: {
            type: String,
        },
    },
    companyName: {
        type: String,
    },
    YOE: {
        type: Number,
    },
    expertise: {
        type: String,
    },
    about: {
        type: String
    }
}, { timestamps: true });

//encrypt password before save - HOOKS
mentorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// validate the password with passed on user password
mentorSchema.methods.isValidatedPassword = async function (mentorSendPassword) {
    return await bcrypt.compare(mentorSendPassword, this.password);
};

//create and return jwt token
mentorSchema.methods.getJwtToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    });
};

module.exports = mongoose.model("Mentor", mentorSchema);
