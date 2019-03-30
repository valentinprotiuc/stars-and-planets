const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      // Gib zurück wenn Nutzer in DB nicht gefunden
      if (!user) {
        return done(null, false, {
          message: 'User nicht gefunden!'
        });
      }
      // Gib zurück wenn Passwort falsch
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Falsches Passwort!'
        });
      }
      // Wenn die Daten stimmen, gib zurück den User
      return done(null, user);
    });
  }
));
