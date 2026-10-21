const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() })
    .then((user) => {
      if (!user || !user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }

      return done(null, user);
    })
    .catch((err) => done(err));
}));
