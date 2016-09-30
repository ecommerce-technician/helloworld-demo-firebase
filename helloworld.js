express = require('express');
compression = require('compression');
http = require('http');
path = require('path');
fs = require('fs');
app = express();
bunyan = require('bunyan');

log = bunyan.createLogger({name: "nodetech-dev"});

redirectUnmatched = function(req, res) {
    res.redirect("/");
};

var api = require('./routes/api/index.js'),
    index = require('./routes/index.js');

app
    .use(compression())
    .use(express.static(path.join(__dirname, 'public')))
    .use('/api', api)
    .use('/', index)
    .use(redirectUnmatched);

http
    .createServer( app ).listen( 3100 )
        .on( 'error', function( error ){
            log.info( "Error: \n" + error.message );
            log.info( error.stack );
        });

log.info("Proudly serving some helloworld on Port 3100");
