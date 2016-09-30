var router = express.Router(),
    cookieParser = require('cookie-parser'),
    user = require(__dirname + "/user.js"),
    users = require(__dirname + "/users.js");

firebase = require("firebase");
firebase.initializeApp({
    serviceAccount: __dirname + "/config/helloworld-7856b4808c4b.json",
    databaseURL: "https://helloworld-99886.firebaseio.com/"
});

// get usersList and adminList
db = firebase.database();
ref = db.ref("users");
usersList = [];
adminList = [];

ref.on("child_added", function(snapshot) {
    usersList.push(snapshot.val());
    if (snapshot.val().admin == true) adminList.push(snapshot.key);
});

// middleware that is specific to this router
router
//auth
    .use(cookieParser())
    .use(function timeLog(req, res, next) {
        next();
    })
    .get('/', function(req, res) {
        res.send('nodetech routing api version one. <a href="/">Go Back... like why are you even here?</a>\n<img src="http://data.whicdn.com/images/99121670/large.jpg">')
    })
    .use('/user', user)
    .use('/users', users)
    .use(redirectUnmatched);
    

module.exports = router;