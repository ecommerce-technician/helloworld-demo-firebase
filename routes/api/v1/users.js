var router = express.Router();

router
    .get('/users', function(req, res) {
        var token = req.cookies.tk;
        if (token){
            log.info({admins: adminList});
            firebase.auth().verifyIdToken(token).then(function(decodedToken) {
                if(adminList.indexOf(decodedToken.user_id != -1) ){
                    res.json(userList);
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