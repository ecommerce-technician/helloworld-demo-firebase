var express = require('express'),
    router = express.Router(),
    compression = require('compression'),
    path = require('path'),
    bunyan = require('bunyan'),
    log = bunyan.createLogger({name: "nodetech-dev"});


// middleware that is specific to this router
router
    .use(compression())

    //auth
    .use(function timeLog(req, res, next) {
        log.info("Proudly serving some helloworld on Port 3100");
        next();
    })

    //home
    .get('*', function(req, res) {
        res.sendFile('index.html', { root: path.join('public') });
    })

module.exports = router;