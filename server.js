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
var photos = require('./routes/photos');

var app = express();

app.locals.analytics = process.env.ANALYTICS;

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

//number of search results per page
app.locals.perpage = 10;

app.locals.facetracking = true;

app.use('/', index);
app.use('/profile', profile);
app.use('/search', search);
app.use('/departments', departments);
app.use('/api', api);
app.use('/photos', photos);

app.use('/404(.html)?', express.Router().get('/', function(req, res, next) {
  var image_handler = require('./routes/image-handler')
  var img_url = image_handler(req, '/images/404-graphic.png', 702, 468)
  res.render('error', {img_url: img_url})
}))

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
  var image_handler = require('./routes/image-handler')
  var img_url = image_handler(req, '/images/404-graphic.png', 702, 468)
  // render the error page
  res.status(err.status || 500);
  res.render('error', {img_url: img_url});
});

module.exports = app;
