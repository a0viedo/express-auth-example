var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res) {
  res.render('index', {
    user: req.user
  });
});

router.get('/account', ensureAuthenticated, function(req, res) {
  res.render('account', {
    user: req.user
  });
});

router.get('/login', function(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('login', {
    user: req.user,
    message: req.flash('error')
  });
});

router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }),
  function(req, res) {
    res.redirect('/');
  });


router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}