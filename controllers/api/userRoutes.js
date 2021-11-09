const router = require('express').Router();
const { User } = require('../../models');

// This user route is responsible for creating a new user with the app
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.logged_in = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(400).json(err)
  }
});

// This user route is responsible for allowing user to login into their accounts if they already have one
router.post('/login', async (req, res) => {
  try {
    const username = await User.findOne({ where: { username: req.body.username } });

    if (!username) {
      res.status(400).json({ message: 'Incorrect username' });
      return;
    }

    const validPassword = username.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = username.id;
      req.session.username = username.username,
      req.session.logged_in = true;
      
      res.json({ user: username, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// This user route is responsible for allowing a user to logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;