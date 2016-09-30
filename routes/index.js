var router = express.Router();

// middleware that is specific to this router
router
    .use(compression())

    //auth
    .use(function timeLog(req, res, next) {
        log.info({port: "3100"});
        next();
    })

    //home
    .get('*', function(req, res) {
        res.sendFile('index.html', { root: path.join('public') });
    })

module.exports = router;