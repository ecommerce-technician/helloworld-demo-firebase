compression = require('compression');
express = require('express');
app = express();

cookieParser = require('cookie-parser')
http = require('http');
path = require('path');
fs = require('fs');
bunyan = require('bunyan');
log = bunyan.createLogger({name: "nodetech-dev"});
firebase = require("firebase");
firebase.initializeApp({
    serviceAccount: "config/helloworld-7856b4808c4b.json",
    databaseURL: "https://helloworld-99886.firebaseio.com/"
});

var api = require('./routes/api/index.js'),
    index = require('./routes/index.js');

app
    .use(cookieParser())
    .use('/api', api)
    .use('/', index)
    .use(express.static(path.join(__dirname, 'public')))
    .use(function(req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, 'public') });
    })
    .use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

http
    .createServer( app ).listen( 3100 )
        .on( 'error', function( error ){
            log.info( "Error: \n" + error.message );
            log.info( error.stack );
        });

log.info("Proudly serving some helloworld on Port 3100");
