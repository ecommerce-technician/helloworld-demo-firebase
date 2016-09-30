var
    express = require('express'),
    router = express.Router();

router
    .get('/api/v1/user', function(req, res) {
        return "user alive"
/*        var token = req.cookies.tk;
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
        }*/
    })

module.exports = router;