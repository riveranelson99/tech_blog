const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../util/auth');

// This post route allows for a user to create a new post after having first checked if the user is logged into a session
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });

        res.json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// This post route allows a user to edit any previously created posts after having first checked if the user is logged into a session
router.put('/:id', withAuth, async (req, res) => {
    try {
        console.log(req.body)
        const updatePost = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!updatePost) {
            res.status(404).json({ message: 'No post by that id exists!' });
            return;
        }

        res.status(200).json(updatePost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// This post route allows a user to delete a post they have previously created after having checked if the user is logged into a session
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletePost = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!deletePost) {
            res.status(404).json({ message: 'No post by that id exists!' });
            return;
        }

        res.status(200).json(deletePost);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;