const express = require("express");
const router = express.Router();

const { createBooking } = require("../controllers/bookingController");

//auth middleware
const { isLoggedInUser } = require("../middlewares/user");

router.route("/create/booking/:mentorId").post(isLoggedInUser, createBooking);

module.exports = router;
