const express = require('express');
const path = require('path');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    console.log('indexPARTY PANTS');
    res.sendFile(path.join(`${__dirname}/home.html`));
    // res.redirect('/catalog');
});

module.exports = router;