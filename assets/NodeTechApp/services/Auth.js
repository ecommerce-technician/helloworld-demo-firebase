angular.module('NodeTechApp')
    .factory("User", function ($http, $cookies) {
        usersObj = {};
        usersObj.getUsers = function() {
            var token = $cookies.get('tk');
            return $http.get('/api/v1/alchemy/search/' + token)
        }
        return usersObj;
    })
