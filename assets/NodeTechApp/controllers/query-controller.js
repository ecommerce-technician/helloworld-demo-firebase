/**
 * Created by alex on 7/8/16.
 */
angular.module('NodeTechApp')
    .controller('QueryController', function($timeout, $scope, $sce, News, Twitter){
        $scope.bundle = {};
        $scope.query = '';
        $scope.bundle.search = 'select * from twitter where keyword contains disney';
        $scope.bundle.news = [];
        $scope.newsCapped = false;

        //Clears items handler
        $scope.clear = function(){
            $scope.bundle.news = [];
            $scope.bundle.tweetsPerHour = null;
        };

        //Submit button handler
        $scope.submit = function() {
            $scope.newsCapped = false;
            if ($scope.bundle.search) {
                //Check for SELECT
                if($scope.bundle.search.indexOf("select") > -1) {
                    select($scope.bundle.search);
                }
            }
        };

        //Select Statement
        var select = function(q){
            //Keyword
            if(q.indexOf("*") > -1) {
                from(q);
            }
        };

        //From Statement
        var from = function(q){
            //Keyword
            channelString = q.match("from(.*)where");
            channels = channelString[1].replace(/^\s*|\s*$/g,'').split(/\s*,\s*/);
            where(channels);
        };

        //Count per hour
        var countPerHour = function(timeStamps){
            var minTime = Math.min.apply(null, timeStamps) * 1000,
                maxTime = Math.max.apply(null, timeStamps) * 1000,
                tweetsPerHour = Object.keys($scope.bundle.news).length/((maxTime - minTime)/1000/60/60);
            return tweetsPerHour.toFixed(2);
        };

        var limit= function (limitString) {
            if(limitString) {
                limiter = limitString[1].trim();
                if ( limiter >= 100 ) {
                    return 100
                } else {
                    return limiter
                }
            } else {
                return 12
            }
        };

        //Where Statement
        function where(q){
            var limitString = $scope.bundle.search.match("limit to(.*)strings");
            var queryString = $scope.bundle.search.match("select(.*)contains");
            var searchTerm = $scope.bundle.search.replace(queryString[0], "").trim();
            if(limitString){
                searchTerm = searchTerm.replace(limitString[0], "").trim();
            }

            //News
            if (q.includes("news")) {
                News.getNews(searchTerm, limit(limitString)).success(function (data) {
                    var obj = {};
                    for (i = 0; i < data.result.docs.length; i++) {
                        obj = {
                            headline: data.result.docs[i].source.enriched.url.title,
                            description: "coming next",
                            date: data.result.docs[i].timestamp
                        };
                        $scope.bundle.news.push({
                            headline: $sce.trustAsHtml(obj.headline),
                            description: $sce.trustAsHtml(obj.description),
                            date: obj.date,
                            sourceIcon: 'img/newspaper.png',
                            done: false
                        });
                    }
                })
            }

            //Twitter
            if (q.includes("twitter")) {
                Twitter.getTweets(searchTerm, limit(limitString)).success(function (data) {
                    var obj = {};
                    var timeStamps = [];
                    for (i = 0; i < data.statuses.length; i++) {
                        obj = {
                            headline: data.statuses[i].text,
                            description: "coming next",
                            date: Date.parse(data.statuses[i].created_at)/1000,
                            profileUrl : data.statuses[i].user.url,
                            profileImg : data.statuses[i].user.profile_image_url,
                            profileName : data.statuses[i].user.name,
                            profileId : data.statuses[i].user.id,
                            tweetId : data.statuses[i].id_str
                        };
                        $scope.bundle.news.push({
                            headline: $sce.trustAsHtml(obj.headline),
                            description: $sce.trustAsHtml(obj.description),
                            sourceIcon: 'img/twitter.png',
                            profileUrl: obj.profileUrl,
                            profileImg: obj.profileImg,
                            profileName: obj.profileName,
                            profileId : obj.profileId,
                            tweetId : obj.tweetId,
                            date: obj.date,
                            twitter : true,
                            news : false,
                            done: false
                        });
                        timeStamps.push(Number(obj.date));

                        if( i == data.statuses.length - 1){
                            $scope.bundle.tweetsPerHour = countPerHour(timeStamps);
                        }
                    }
                })
            }

                //Reddit
                if (q.indexOf("FROM reddit") > -1) {

                    if (q.indexOf("WHERE") > -1) {
                        var searchTerm = q.replace("SELECT * where keyword contains  ", "");
                        Twitter.getTweets(searchTerm).success(function (data) {
                            var obj = {};
                            for (i = 0; i < data.statuses.length; i++) {
                                obj = {
                                    headline: data.statuses[i].text,
                                    description: "coming next",
                                    date: data.statuses[i].created_at
                                };
                                $scope.bundle.news.push({
                                    headline: $sce.trustAsHtml(obj.headline),
                                    description: $sce.trustAsHtml(obj.description),
                                    date: obj.date,
                                    done: false
                                });
                            }
                        })
                    }
                }
        }
    })
    .factory("News", function ($http) {
        newsObj = {};
        newsObj.getNews = function(term, limit) {
            return $http.get('http://bundleslang.node.tech/api/v1/alchemy/search/' + term)
        }
        return newsObj;
    })
    .factory("Twitter", function ($http) {
        tweetsObj = {};
        tweetsObj.getTweets = function(term, limit) {
            return $http.get('http://bundleslang.node.tech/api/v1/twitter/search/' + term  + "?limit=" + limit)
        }
        return tweetsObj;
    })
    .filter('numKeys', function() {
        return function(json) {
            var keys = Object.keys(json)
            return keys.length;
        }
    })