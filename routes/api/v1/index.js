db = firebase.database();
ref = db.ref("users");
userList = [];
adminList = [];

ref.on("child_added", function(snapshot) {
    userList.push(snapshot.val());
    if (snapshot.val().admin == true) adminList.push(snapshot.key);
});

var router = express.Router(),
    user = require( __dirname + '/user.js'),
    users = require( __dirname + '/users.js');

// middleware that is specific to this router
router
    .use('/user', user)
    .use('/users', users)
    .get('/', function(req, res) {
        res.send('nodetech routing api version one. <a href="/">Go Back... Why are you here?</a>')
    });

module.exports = router;