var
    express = require('express'),
    router = express.Router();

router
    .get('/api/v1/users', function(req, res) {
        return "users alive"
        // var token = req.cookies.tk;
        // if (token){
        //     console.log(admins);
        //     firebase.auth().verifyIdToken(token).then(function(decodedToken) {
        //         if(admins.indexOf(decodedToken.user_id != -1) ){
        //             res.json(users);
        //         }
        //     }).catch(function(error) {
        //         res.json({"error" : error});
        //         log.info(error);
        //     });
        // } else {
        //     res.json({"admin" : false});
        // }
    })

module.exports = router;