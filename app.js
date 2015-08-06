var flash = require('connect-flash'),
  express = require('express'),
  passport = require('passport'),
  util = require('util'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  session = require('express-session'),
  expressLayouts = require('express-ejs-layouts'),
  uuid = require('uuid'),
  logger = require('morgan'),
  utils = require('./lib/utils');

var routes = require('./routes/index');
var socialRoutes = require('./routes/social');
var app = express();

require('./lib/passportConfig')();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(methodOverride());
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use('/', routes);
app.use('/auth', socialRoutes);

app.listen(process.env.PORT || 3000);