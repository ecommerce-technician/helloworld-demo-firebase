var express = require('express'),
    router = express.Router(),
    bunyan = require('bunyan'),
    path = require('path'),
    http = require('http'),
    log = bunyan.createLogger({name: "nodetech-dev"}),
    cookieParser = require('cookie-parser'),
    firebase = require("firebase");

firebase.initializeApp({
    serviceAccount: __dirname + "/config/helloworld-7856b4808c4b.json",
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

// middleware that is specific to this router
router
//auth
    .use(cookieParser())
    .use(function timeLog(req, res, next) {
        console.log('v1');
        next();
    })
    //home
    .get('/', function(req, res) {
        res.send("v1")
    })
    //home
    .get('/user', function(req, res) {
        var token = req.cookies.tk;
        if (token){
            firebase.auth().verifyIdToken(token).then(function(decodedToken) {
                if(admins.indexOf(decodedToken.user_id != -1 )){
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

    //home
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

module.exports = router;