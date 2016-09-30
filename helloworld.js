var compression = require('compression'),
    express = require('express'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    app = express(),
    bunyan = require('bunyan'),
    log = bunyan.createLogger({name: "nodetech-dev"}),
    api = require('./routes/api/index.js'),
    index = require('./routes/index.js');

app
    .use(express.static(path.join(__dirname, 'public')))
    .use('/api', api)
    .use('/', index);

http
    .createServer( app ).listen( 3100 )
        .on( 'error', function( error ){
            log.info( "Error: \n" + error.message );
            log.info( error.stack );
        });

log.info("Proudly serving some helloworld on Port 3100");
