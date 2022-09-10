const express = require("express");
const router = express.Router();

const { createPost, getAllPosts, createComment } = require("../controllers/postController");
const { isLoggedInUser } = require("../middlewares/user");


router.route("/create/post").post(isLoggedInUser, createPost);
router.route("/posts/search").get(isLoggedInUser, getAllPosts);
router.route("/create/comment").put(isLoggedInUser, createComment);


module.exports = router;
