const router = require('express').Router();
const { User, Comment, Post } = require('../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [ User],
    });

    const posts = postData.map(post => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User }, { model: Comment }],
    });

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('post', {
        post,
        logged_in: req.session.logged_in,
      });
    } else {
      res.status(404).json({ message: 'No post by that id exists!' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;