const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../util/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment: req.body.comment,
            user_id: req.body.user_id,
            post_id: req.body.post_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;