var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const session = require("express-session")
const redisStore = require("connect-redis")(session)
const fs = require("fs")

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require("./routes/blog");
const userRouter = require("./routes/user");

var app = express();

const redisClient = require("./db/redis")
const sessionStore = new redisStore({
  client:redisClient
})

//解析session
app.use(session({
  secret:"wetgafW_saldgj",
  cookie:{
    maxAge:24*60*60*1000
  },
  resave: false,
  saveUninitialized: false,
  store:sessionStore
}))

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

//log
const ENV = process.env.NODE_ENV;
if(ENV !=="production"){
  //test env
  app.use(logger('dev'));
}else{
  const logFileName = path.resolve(__dirname,"logs","access.log")
  const writeStreamLog = fs.createWriteStream(logFileName,{
    flags:"a"
  }) 
  app.use(logger('combined',{
    stream:writeStreamLog
  }));
}
app.use(express.json());  //解析body
app.use(express.urlencoded({ extended: false })); //post 兼容各种数据结构
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)); 
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
