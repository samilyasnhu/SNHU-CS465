const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('users');

const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email
  });
  user.setPassword(req.body.password);

  try {
    await user.save();
    return res.status(200).json({ token: user.generateJWT() });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    return res.status(400).json(err);
  }
};

const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    return res.status(200).json({ token: user.generateJWT() });
  })(req, res);
};

module.exports = { register, login };
