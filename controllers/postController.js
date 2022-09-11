const Post = require("../models/post");

exports.createPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        if (!title || !body) {
            return res.status(422).json({
                success: false,
                message: "Please write something to share!",
            });
        }

        const post = await Post.create({
            title,
            body,
            postedBy: req.user,
        });

        res.status(200).json({
            success: true,
            post,
            message: "Posted Successfully!",
        });
    } catch (error) {
        console.log(error);
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("postedBy", "_id name");
        res.status(200).json({
            success: true,
            posts,
        });
    } catch (error) {
        console.log(error);
    }
};


exports.createComment = (req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }
    Post.findByIdAndUpdate(req.params.id, {
        $push: { comments: comment }
    }, {
        new: true
    })
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        })

}