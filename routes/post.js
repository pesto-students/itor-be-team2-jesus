const express = require("express");
const router = express.Router();

const { createPost, getAllPosts } = require("../controllers/postController");
const { isLoggedInUser } = require("../middlewares/user");


router.route("/create/post").post(isLoggedInUser, createPost);
router.route("/posts/search").get(isLoggedInUser, getAllPosts);

module.exports = router;
