const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../util/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment: req.body.comment,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;