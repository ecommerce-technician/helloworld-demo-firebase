var compression = require('compression'),
    http = require('http'),
    express = require('express'),
    app = express(),
    fs = require('fs'),
    url  = require('url'),
    session = require('express-session'),
    bunyan = require('bunyan'),
    log = bunyan.createLogger({name: "nodetech-dev"}),
    bodyParser = require('body-parser'),
    router = express.Router()
    request = require('request');;

app.use(compression());
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

app
    .use(bodyParser.json()) // support json encoded bodies
    .use(express.static('public'))
    .use(bodyParser.urlencoded({ extended: true }))
    .get('/*', function ( req, res ) {
        log.info('All');
        res
            .status( 200 )
            .set( { 'content-type': 'text/html; charset=utf-8' } )
            .sendfile('public/index.html' );
    })
    .on( 'error', function( error ){
        log.info( "Error: \n" + error.message );
        log.info( error.stack );
    });

http
    .createServer( app ).listen( 7777 )
    .on( 'error', function( error ){
        log.info( "Error: \n" + error.message );
        log.info( error.stack );
    });

log.info("Proudly serving some javascript on Port 7777");
