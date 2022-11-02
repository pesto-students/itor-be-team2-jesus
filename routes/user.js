const express = require("express");
const router = express.Router();

const {
    signup,
    getLoggedInUserDetails,
} = require("../controllers/userController");

//auth middleware
const { isLoggedInUser } = require("../middlewares/user");


router.route("/signup").post(signup);
router.route("/user/dashboard").get(isLoggedInUser, getLoggedInUserDetails);

module.exports = router;
