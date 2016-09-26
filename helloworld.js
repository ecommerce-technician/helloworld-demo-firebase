var compression = require('compression'),
    express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express(),
    bunyan = require('bunyan'),
    firebase = require("firebase"),
    log = bunyan.createLogger({name: "nodetech-dev"}),
    router = express.Router();

firebase.initializeApp({
    serviceAccount: "helloworld-7856b4808c4b.json",
    databaseURL: "https://helloworld-99886.firebaseio.com/"
});

// get users and admins
var db = firebase.database(),
    ref = db.ref("users"),
    users = [],
    admins = [];

ref.on("child_added", function(snapshot) {
    users.push(snapshot.key);
    if (snapshot.val().admin == true) admins.push(snapshot.key);
});

app
    .use(compression())
    .post('/api/v1/users/:token', function(req, res) {
        var token = req.params.token;
        if(token){
            ref.on("value", function (snapshot) {
                res.send(snapshot.val());
            })
        }
    })
    .use(express.static(path.join(__dirname, 'public')))
    .use(function(req, res) {
        res.sendfile(__dirname + '/public/index.html');
    })
    .use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

http
    .createServer( app ).listen( 7777 )
        .on( 'error', function( error ){
            log.info( "Error: \n" + error.message );
            log.info( error.stack );
        });

log.info("Proudly serving some nodetech on Port 7777");
