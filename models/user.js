const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name!"],
        },
        email: {
            type: String,
            required: [true, "Please enter your email!"],
            validate: [
                validator.isEmail,
                "Please enter your email in correct format!",
            ],
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
            default: "user",
        },
        photo: {
            id: {
                type: String,
            },
            secure_url: {
                type: String,
            },
        },
        schoolName: {
            type: String,
        },
    },
    { timestamps: true }
);

//encrypt password before save - HOOKS
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// validate the password with passed on user password
userSchema.methods.isValidatedPassword = async function (userSendPassword) {
    return await bcrypt.compare(userSendPassword, this.password);
};

//create and return jwt token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    });
};

module.exports = mongoose.model("User", userSchema);
