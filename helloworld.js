var compression = require('compression'),
    express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express(),
    bunyan = require('bunyan'),
    // firebase = require("firebase"),
    cookieParser = require('cookie-parser'),
    log = bunyan.createLogger({name: "nodetech-dev"}),
    users = require('./routes/users.js'),
    user = require('./routes/user.js');



// firebase.initializeApp({
//     serviceAccount: "config/helloworld-7856b4808c4b.json",
//     databaseURL: "https://helloworld-99886.firebaseio.com/"
// });

// get users and admins
// var db = firebase.database(),
//     ref = db.ref("users"),
//     users = [],
//     admins = [];

// ref.on("child_added", function(snapshot) {
//     users.push(snapshot.val());
//     if (snapshot.val().admin == true) admins.push(snapshot.key);
// });

app
    .use(compression())
    .use(cookieParser())
    .use(express.static(path.join(__dirname, 'public')))
    .use('/api/v1/user', user)
    .use('/api/v1/users', users)
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
