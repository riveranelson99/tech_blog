const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../util/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            attributes: ['id', 'title', 'content', 'date_created'],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map(post => post.get({ plain: true }));
        const username = posts[0].user.username;
        console.log(username)

        res.render('dashboard', {
            posts,
            username,
            logged_in: req.session.logged_in,
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
        const postData = await Post.findByPk(req.params.id);

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