const router = require('express').Router();
const { User, Comment, Post } = require('../models');
const withAuth = require('../util/auth');

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

router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      // where: {
      //   id: req.params.id,
      // },
      attributes: ['id', 'title', 'content', 'date_created'],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment', 'date_created', 'user_id', 'post_id'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });
      console.log(post.comments);

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