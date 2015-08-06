var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GitHubStrategy = require('passport-github').Strategy
var utils = require('./utils');
module.exports = function() {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    utils.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      process.nextTick(function() {
        console.log('log', username, password);
        utils.findByUsername(username, function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, {
              message: 'Unknown user ' + username
            });
          }
          if (user.password != password) {
            return done(null, false, {
              message: 'Invalid password'
            });
          }
          return done(null, user);
        })
      });
    }
  ));

  passport.use(new GitHubStrategy({
      clientID: 'your client id',
      clientSecret: 'your client secret',
      callbackURL: "http://127.0.0.1:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      utils.findOrCreate({
        githubId: profile.id,
        githubProfile: profile
      }, function(err, user) {
        return done(err, user);
      });
    }
  ));
}