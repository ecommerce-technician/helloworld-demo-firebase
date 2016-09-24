var compression = require('compression'),
    http = require('http'),
    express = require('express'),
    app = express(),
    fs = require('fs'),
    url  = require('url'),
    session = require('express-session'),
    bunyan = require('bunyan'),
    log = bunyan.createLogger({name: "nodetech-dev"}),
    bodyParser = require('body-parser'),
    router = express.Router()
    Twitter = require('twitter'),
    env = require('./env.json'),
    request = require('request');;

app.use(compression());
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

var alchemy = '2c9e50d1b9089bd7ef8de081216c28f4e06ff5d7';
var twitterClient = new Twitter({
    consumer_key: env.TWITTER_CONSUMER_KEY,
    consumer_secret: env.TWITTER_CONSUMER_SECRET,
    access_token_key: env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: env.TWITTER_ACCESS_TOKEN_SECRET
});


app
    .use(bodyParser.json()) // support json encoded bodies
    .use(express.static('public'))
    .use(bodyParser.urlencoded({ extended: true }))
    .post('/api/v1/create', function ( req, res ) {
        var url_parts = url.parse(req.url);
        var body = {};

        body = req.body.bundle;
        filePath = __dirname + '/public/db/' + req.body.bundle + '.json';
        fs.appendFile(filePath, body, function() {});
            res
            .status( 200 )
            .set( { 'content-type': 'application/json; charset=utf-8' } )
            .send({
                iam: url_parts.path,
                iSent: body
            })

    })
    .post('/api/v1/select', function ( req, res ) {
        var url_parts = url.parse(req.url);
        var body = {};

        body = req.body.bundle;
        filePath = __dirname + '/public/db/' + req.body.bundle + '.json';
        fs.appendFile(filePath, body, function() {});
        res
            .status( 200 )
            .set( { 'content-type': 'application/json; charset=utf-8' } )
            .send({
                iam: url_parts.path,
                iSent: body
            })

    })

    //markit data by ticker
    .get('/api/v1/markit/search/:ticker', function(req, res){

        var url = 'http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=' + req.params.ticker;
        request(url).pipe(res);

    })

    //markit ohlc data
    .get('/api/v1/markit/search/interactive/:ticker', function(req, res){

        var url = 'http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A365%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22' + req.params.ticker + '%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22ohlc%22%5D%7D%5D%7D';
        request(url).pipe(res);

    })

    //markit data search quote by ticker
    .get('/api/v1/markit/search/quote/:ticker', function(req, res){

        var url = 'http://dev.markitondemand.com/Api/v2/Quote/json?symbol=' + req.params.ticker;
        request(url).pipe(res);

    })

    //google news connector
    .get('/api/v1/google-news/search/:ticker', function(req, res){

        var url='http://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=' + req.params.ticker +'&userip=' + request.connection.remoteAddress;
        request(url).pipe(res);

    })

    //oh my posh connector for my gf
    .post('/api/v1/poshmark', function(req, res){

        //var url=req.params.page;
        var url=req.body.url;
        res.send(url);
    })

    //alchemy news search
    .get('/api/v1/alchemy/search/:term', function(req, res){
        //var firebase = new Firebase('https://bundleslang.firebaseio.com/api/v1/alchemy/search/' + req.params.term);
        var url = 'https://access.alchemyapi.com/calls/data/GetNews?apikey=2c9e50d1b9089bd7ef8de081216c28f4e06ff5d7&return=enriched.url.title&start=now-7d&end=now&count=12&outputMode=json&q.enriched.url.enrichedTitle.entities.entity.text=' + req.params.term;
        request(url).pipe(res);
    })

    //twitter search
    .get('/api/v1/twitter/search/:ticker', function(req, res){

        var limit = function(){
            if (typeof req.query.limit == 'undefined'){
                return 12;
            } else {
                return req.query.limit;
            }
        }


        if (typeof req.query.geocode == 'undefined'){
            twitterClient.get('search/tweets', {q:req.params.ticker,result_type:'mixed',count: limit(),lang:'en', include_entities: 'false'}, function(error, tweets, res){
                shipIt(tweets);
                since = tweets.statuses.id;
            });
        } else {
            twitterClient.get('search/tweets', {q:req.params.ticker,result_type:'mixed',count: limit(),lang:'en', include_entities: 'false', geocode: req.query.geocode}, function(error, tweets, res){
                shipIt(tweets);
                since = tweets.statuses.id;
            });
        }

        function shipIt(tweets) {
            res.send(tweets);
        }
    })
    
    //reddit search
    .get('/api/v1/reddit/search/:search', function(req, res){

        var url = 'https://www.reddit.com/search.json?q=' + req.params.search  + '&limit=8';
        request(url).pipe(res);

    })

    //twitter custom search
    .get('/api/v1/twitter/searchCustom/:ticker', function(req, res){

        var limit = function(){
            if (typeof req.query.limit == 'undefined'){
                return 12;
            } else {
                return req.query.limit;
            }
        }


        if (typeof req.query.geocode == 'undefined'){
            twitterClient.get('search/tweets', {q:req.params.ticker,result_type:'mixed',count: limit(),lang:'en', include_entities: 'false'}, function(error, tweets, res){
                shipIt(tweets);
                since = tweets.statuses.id;
            });
        } else {
            twitterClient.get('search/tweets', {q:req.params.ticker,result_type:'mixed',count: limit(),lang:'en', include_entities: 'false', geocode: req.query.geocode}, function(error, tweets, res){
                shipIt(tweets);
                since = tweets.statuses.id;
            });
        }


        function shipIt(tweets) {
            res.send(tweets);
        }
    })


    //Pagespeed
    .get('/api/v1/pagespeed/search/:search', function(req, res){
        var url='https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=http://'+ req.params.search +'&key=AIzaSyDVqAOfmeJJsgDQqERAmodrAbnp1XVnv88' ;
        request(url).pipe(res);
    })

    //Scrape HTTP
    .get('/api/v1/scrape/http/:search', function(req, res){
        var url='http://'+ req.params.search;
        request(url).pipe(res);
    })

    //Scrape HTTPS
    .get('/api/v1/scrape/https/:search', function(req, res){
        var url='https://'+ req.params.search;
        request(url).pipe(res);
    })

    .get('/*', function ( req, res ) {
        log.info('All');
        res
            .status( 200 )
            .set( { 'content-type': 'text/html; charset=utf-8' } )
            .sendfile('public/index.html' );
    })
    .on( 'error', function( error ){
        log.info( "Error: \n" + error.message );
        log.info( error.stack );
    });

http
    .createServer( app ).listen( 7777 )
    .on( 'error', function( error ){
        console.log( "Error: \n" + error.message );
        console.log( error.stack );
    });

console.log('Serving app on port 7777');
log.info("Proudly serving some nodetech on Port 7777");
