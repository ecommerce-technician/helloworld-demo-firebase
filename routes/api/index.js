var express = require('express'),
    router = express.Router(),
    path = require('path'),
    bunyan = require('bunyan'),
    log = bunyan.createLogger({name: "nodetech-dev"}),
    v1 = require('./v1/index.js');

// middleware that is specific to this router
router
    //api
    .get('/', function(req, res) {
        res.send('nodetech routing api version one. <a href="../">Go Back... Why are you here?</a>')
    })
    .use('/v1', v1);

module.exports = router;