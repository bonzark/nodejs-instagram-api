var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var commentsRouter = require('./routes/comments');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

app.use(cors(corsOptions))

app.use(session({
  secret: "asdfghjkl1029384756",
  credentials: true,
  name: 'sid',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.ENVRONMENT === 'production' ? 'true' : 'auto',
    httpOnly: true,
    expires: 1000 * 60 * 60 * 24 * 7 ,
    sameSite: process.env.ENVRONMENT === 'production' ? "none" : "lax",
  }
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/dpStatic', express.static('upload/dp'));
app.use('/postStatic', express.static('upload/images/post'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
