const express = require("express");
const router = express.Router();

const {
    signup,
    getAllMentor,
    getLoggedMentorDetails,
} = require("../controllers/mentorController");

//is Logged in middleware
const { isLoggedIn } = require("../middlewares/user");

router.route("/become-a-mentor").post(signup);
router.route("/find-a-mentor").get(getAllMentor);
router.route("/mentordashboard").get(isLoggedIn, getLoggedMentorDetails);

module.exports = router;
