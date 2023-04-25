var createError = require('http-errors');
var express = require('express');
var path = require('path');``
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function(username, password, done) {
  Account.findOne({ username: username }, function (err, user) {
  if (err) { return done(err); }
  if (!user) {
  return done(null, false, { message: 'Incorrect username.' });
  }
  if (!user.validPassword(password)) {
  return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
  });
}
));

var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

require('dotenv').config();
const connectionString =process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
{useNewUrlParser: true,
useUnifiedTopology: true});

var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});

// var squirrel = require("./models/squirrel");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var squirrelRouter = require('./routes/squirrel');
var boardRouter = require('./routes/board');
var selectorRouter = require('./routes/selector');
var app = express();
var squirrel = require("./models/squirrel");
var resourceRouter = require('./routes/resource');

async function recreateDB(){
  // Delete everything
  await squirrel.deleteMany();
  let instance1 = new
  squirrel({squirrel_color:"brown",squirrel_breed:"Eastern Gray Squirrel",squirrel_price:1000});
  instance1.save().then(doc=>{
    console.log("First object saved")}
    ).catch(err=>{
    console.error(err)})

  let instance2 = new
  squirrel({squirrel_color:"red",squirrel_breed:"Western Gray Squirrel",squirrel_price:1800});
  instance2.save().then(doc=>{
    console.log("Second object saved")}
    ).catch(err=>{
    console.error(err)})

  let instance3 = new
  squirrel({squirrel_color:"brown",squirrel_breed:"Arizona Gray Squirrel",squirrel_price:2500});
  instance3.save().then(doc=>{
      console.log("Third object saved")}
      ).catch(err=>{
      console.error(err)})
  
 }
 let reseed = true;
 if (reseed) { recreateDB();}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
   resave: false, 
    saveUninitialized: false
 }));
 app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/squirrel', squirrelRouter);
app.use('/board', boardRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);


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
