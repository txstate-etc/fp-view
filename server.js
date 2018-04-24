var express = require('express');
var path = require('path');
var favicon = require('express-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var exphbs = require('express-handlebars');
var httpAgent = require('http-pooling-agent');
global.apiagent = new httpAgent.Agent({ freeSocketsTimeout: 10000 })

var index = require('./routes/index');
var profile = require('./routes/profile');
var search = require('./routes/search');
var departments = require('./routes/departments');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
var hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'layout',
  helpers: require('./helpers/handlebars-helpers'),
  partialsDir: __dirname + '/views/partials/'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'shared')));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/popper'));
app.use(express.static(__dirname + '/node_modules/handlebars/dist'));
app.use(express.static(__dirname + '/helpers/'));
app.use(express.static(__dirname + '/node_modules/font-awesome'));

app.use('/', index);
app.use('/profile', profile);
app.use('/search', search);
app.use('/departments', departments);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
