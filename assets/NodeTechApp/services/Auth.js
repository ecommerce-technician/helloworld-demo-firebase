angular.module('NodeTechApp')
    .factory("Users", function ($http) {
        usersObj = {};
        usersObj.getUsers = function() {
            return $http.get('/api/v1/users')
        }
        return usersObj;
    })
    .factory("User", function ($http) {
        userObj = {};
        userObj.getLoggedIn = function() {
            return $http.get('/api/v1/user')
        }
        return userObj;
    })
