const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../util/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [User],
        });

        const posts = postData.map(post => post.get({ plain: true }));

        res.render('dashboard', {
            posts
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/new', withAuth, (req, res) => {
    res.render('newPost')
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk({
            where: {
                id: req.params.id,
            },
        });

        if (postData) {
            const post = postData.get({ plain: true });

            res.render('editPost', {
                post,
            });
        } else {
            res.status(404).json({ message: 'No post by that id exists!' });
        }
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;