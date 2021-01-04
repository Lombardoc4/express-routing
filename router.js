const path = require('path');
const createError = require('http-errors');
const express = require('express');
const https = require('https');
const http = require('http');
const logger = require('morgan');

const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// const catalogRouter = require('./routes/catalog');

const app = express();
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('./', indexRouter);


// const options = {
    // key: fs.readFileSync('pemKey'),
    // cert: fs.readFileSync('pemKey')
//   };



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
