var compression = require('compression'),
    express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express(),
    bunyan = require('bunyan'),
    firebase = require("firebase"),
    cookieParser = require('cookie-parser'),
    log = bunyan.createLogger({name: "nodetech-dev"}),
    router = express.Router();

firebase.initializeApp({
    serviceAccount: "config/helloworld-7856b4808c4b.json",
    databaseURL: "https://helloworld-99886.firebaseio.com/"
});

// get users and admins
var db = firebase.database(),
    ref = db.ref("users"),
    users = [],
    admins = [];

ref.on("child_added", function(snapshot) {
    users.push(snapshot.val());
    if (snapshot.val().admin == true) admins.push(snapshot.key);
});

app
    .use(compression())
    .use(cookieParser())
    .get('/api/v1/users', function(req, res) {
        var token = req.cookies.tk;
        if (token){
            console.log(admins);
            firebase.auth().verifyIdToken(token).then(function(decodedToken) {
                if(admins.indexOf(decodedToken.user_id != -1) ){
                    res.json(users);
                }
            }).catch(function(error) {
                res.json({"error" : error});
                log.info(error);
            });
        } else {
            res.json({"admin" : false});
        }
    })
    .get('/api/v1/user', function(req, res) {
        var token = req.cookies.tk;
        if (token){
            firebase.auth().verifyIdToken(token).then(function(decodedToken) {
                if(admins.indexOf(decodedToken.user_id) > -1){
                    res.json({
                        uid : decodedToken.user_id,
                        email: decodedToken.email,
                        admin : true
                    });
                } else {
                    res.json({
                        uid : decodedToken.user_id,
                        email: decodedToken.email,
                        admin : false
                    });
                }
            }).catch(function(error) {
                res.json(error);
                log.info(error);
            });
        } else {
            res.json({"admin" : false});
        }
    })
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
    .createServer( app ).listen( 7777 )
        .on( 'error', function( error ){
            log.info( "Error: \n" + error.message );
            log.info( error.stack );
        });

log.info("Proudly serving some nodetech on Port 7777");
