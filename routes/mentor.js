const express = require("express");
const router = express.Router();

const {
    signup,
    getAllMentors,
    getLoggedMentorDetails,
    getOneMentor
} = require("../controllers/mentorController");

//is Logged in middleware
const { isLoggedInMentor } = require("../middlewares/mentor");

router.route("/mentor/create").post(signup);
router.route("/mentor/search").get(getAllMentors);
router.route("/mentor/dashboard").get(isLoggedInMentor, getLoggedMentorDetails);
router.route("/mentor/:id").get(isLoggedInMentor, getOneMentor);


module.exports = router;
