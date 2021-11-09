const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../util/auth');

// This dashboard route seeks out all post data related to the user that is currently logged into the app and populates it for them on their dashboard
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

        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// This dashboard route simply takes a user to a new page in order for them to create a new post
router.get('/new', withAuth, (req, res) => {
    res.render('newPost')
});

// This dashboard route is responsible for finding the post the user has clicked on in their dashboard and loading the edit page
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