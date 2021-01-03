const path = require('path');
const express = require('express');
const logger = require('morgan');
const app = express();
app.use(logger('dev'));
const port = 8080;


app.use(express.static(path.join(__dirname, './')));

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname + '/index.js'))
    res.sendFile(path.join(__dirname + '/index.html'))

})

app.get('/test666*', (req, res) => {
    // res.sendFile(path.join(__dirname + '/index.js'))
    res.sendFile(path.join(__dirname + '/test666.html'))

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})