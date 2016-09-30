router = express.Router();

// middleware that is specific to this router
router
    .use(compression())
    .use(function timeLog(req, res, next) {
        log.info({
            name: "helloworld Port 3100",
            streams: [{
                path: 'logs/routes.log'
            }]
        });
        next();
    })

module.exports = router;