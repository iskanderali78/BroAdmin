var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');

var morgan = require('morgan');
//var logger = require('morgan');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/client');
var users = require('./routes/users');

var app = express();

//set logger
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), {flags: 'a'});

// view engine setup
app.set('views', path.join(__dirname, 'views/client'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'broadmin.png')));
app.use(favicon(path.join(__dirname, 'public', 'bro.png')));

//app.use(logger('dev'));
app.use(morgan('combined', {stream: accessLogStream}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use('/', index);
app.use('/users', users);

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
