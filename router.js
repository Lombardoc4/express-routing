const path = require('path');
const createError = require('http-errors');
const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');

const logger = require('morgan');

const app = express();
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './')));

// const port = 8080;
const options = {
    // key: fs.readFileSync('pemKey'),
    // cert: fs.readFileSync('pemKey')
  };


app.get('/test666', (req, res) => {
    res.sendFile(path.join(`${__dirname}/test666.html`));
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/index.html`));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });


  http.createServer(app).listen(8080)
//   https.createServer(options, app).listen(443)
