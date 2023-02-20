const express = require("express");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug'); 

require('./models/User');
require('./models/Room')
require('./config/passport'); 
const passport = require('passport');

const cors = require('cors');
const csurf = require('csurf');
const { isProduction } = require('./config/keys');
const usersRouter = require('./routes/api/users');
const csrfRouter = require('./routes/api/csrf');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());

if (!isProduction) {
  app.use(cors());
}

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

app.use('/api/users', usersRouter);
app.use('/api/csrf', csrfRouter);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.statusCode = 404;
  next(err);
});

const serverErrorLogger = debug('backend:error');

app.use((err, req, res, next) => {
  serverErrorLogger(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    statusCode,
    errors: err.errors
  })
});

module.exports = app;