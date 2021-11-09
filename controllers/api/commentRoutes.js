const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../util/auth');

// This comment route creates a new comment after having first ensured a user is logged into a session
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment: req.body.comment,
            post_id: req.body.postId,
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;