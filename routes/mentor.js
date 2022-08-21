const express = require("express");
const router = express.Router();

const { signup, testmentor } = require("../controllers/mentorController");


router.route("/become-a-mentor").post(signup);




module.exports = router;
